import { execFile } from 'node:child_process'
import { access, readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

import type { AstroIntegration } from 'astro'

const run = promisify(execFile)

// Git ignores public/resume.pdf, so the dev server builds it on request.
// Production builds it in `vp run build`.
export function resumeDevServer(): AstroIntegration {
	let root = ''
	let pending: Promise<Buffer> | undefined
	let lastBuildStart: number | undefined

	const pdfPath = () => join(root, 'public/resume.pdf')

	async function newestSourceTime() {
		const sourceDir = join(root, 'resume')
		const names = await readdir(sourceDir)

		const times = await Promise.all(
			names.map(async (name) => (await stat(join(sourceDir, name))).mtimeMs),
		)

		return Math.max(...times)
	}

	async function pdfExists() {
		try {
			await access(pdfPath())

			return true
		} catch {
			return false
		}
	}

	async function buildIfStale() {
		const [source, exists] = await Promise.all([
			newestSourceTime(),
			pdfExists(),
		])

		// A source saved during a build can be older than the PDF that omits it,
		// so compare with the build start. The first request of each dev session
		// has no recorded start, so it always builds.
		const stale = lastBuildStart === undefined || source >= lastBuildStart

		if (stale || !exists) {
			const start = Date.now()
			await run('sh', [join(root, 'scripts/build-resume.sh')], {
				cwd: root,
				maxBuffer: 16 * 1024 * 1024,
			})
			lastBuildStart = start
		}

		return readFile(pdfPath())
	}

	return {
		name: 'resume-dev-server',
		hooks: {
			'astro:config:done': ({ config }) => {
				root = fileURLToPath(config.root)
			},
			'astro:server:setup': ({ server, logger }) => {
				// Vite lists public files at startup and from its watcher, so it can
				// return 404 for a PDF that a build just created.
				server.middlewares.use('/resume.pdf', (_req, res) => {
					// Concurrent requests share one build, because pdflatex writes to a fixed path.
					pending ??= buildIfStale().finally(() => {
						pending = undefined
					})
					pending.then(
						(pdf) => {
							res.setHeader('Content-Type', 'application/pdf')
							res.setHeader('Cache-Control', 'no-store')
							res.end(pdf)
						},
						(error: { stderr?: string; message: string }) => {
							const detail = error.stderr ?? error.message
							logger.error(`Resume build failed\n${detail}`)
							res.statusCode = 500
							res.setHeader('Content-Type', 'text/plain; charset=utf-8')
							res.end(`Resume build failed\n\n${detail}`)
						},
					)
				})
			},
		},
	}
}
