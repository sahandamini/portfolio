import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import { resumeDevServer } from './scripts/resume-dev-server'

// `||`, because an empty APP_PORT gives 0, which means a random port.
const port = Number(process.env.APP_PORT || 3000)

export default defineConfig({
	site: 'https://sahandamini.com',
	output: 'static',
	trailingSlash: 'never',
	// The adapter provisions KV and Images bindings by default. The site uses
	// neither, because images compile at build time and nothing uses sessions.
	adapter: cloudflare({ imageService: 'compile' }),
	session: false,
	devToolbar: { enabled: true, placement: 'bottom-right' },
	integrations: [sitemap(), resumeDevServer()],
	server: {
		host: '127.0.0.1',
		port,
		// Caddy and the Pitchfork proxy serve the app on *.lab.sahandamini.dev.
		allowedHosts: ['.lab.sahandamini.dev'],
	},
	vite: {
		plugins: [tailwindcss()],
		// A config change restarts the server. Astro then reads the port from the
		// old socket, and an overlapping restart reads none, so Vite falls back to
		// 5173 without this setting.
		server: { port, strictPort: true },
	},
})
