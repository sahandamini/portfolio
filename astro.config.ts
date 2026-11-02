import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'https://sahandamini.com',
	output: 'static',
	trailingSlash: 'never',
	// The adapter provisions KV and Images bindings by default. The site uses
	// neither, because images compile at build time and nothing uses sessions.
	adapter: cloudflare({ imageService: 'compile' }),
	session: false,
	devToolbar: { enabled: true, placement: 'bottom-right' },
	integrations: [sitemap()],
	server: {
		host: '127.0.0.1',
		port: Number(process.env.APP_PORT ?? 3000),
		// Caddy and the Pitchfork proxy serve the app on *.lab.sahandamini.dev.
		allowedHosts: ['.lab.sahandamini.dev'],
	},
	vite: {
		plugins: [tailwindcss()],
		server: { strictPort: true },
	},
})
