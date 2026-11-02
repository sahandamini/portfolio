# Portfolio

This is an Astro site with Tailwind v4 and Vite+. Astro owns the dev server and
the build. Vite+ owns formatting, lint, and Vitest. Prettier and ESLint check
`.astro` files. The dev server runs as a pitchfork daemon (see `pitchfork.toml`)
that starts and stops when you enter or leave the directory. Run
`mise run bootstrap` after a fresh clone.

Cloudflare Workers hosts the site. Workers Builds deploys `main` and gives each
pull request a Preview URL. Varlock manages environment variables; `.env.schema`
documents each one. See `README.md` for hosting details and `docs/email.md` for
DNS and email.

## Commands

- `vp run dev` — start development (usually managed by pitchfork instead)
- `pitchfork list` / `pitchfork logs dev` / `pitchfork tui` — inspect the dev
  daemon
- `vp run check` — run `vp check`, Prettier, ESLint, and `astro check`.
  `vp check` alone skips the `.astro` steps.
- `vp run build` — build the site. `vp build` does not run Astro.
- `vp run preview` — serve the build with `wrangler dev`.
- `vp run test:unit` — run Vitest unit tests (`src/**/*.unit.test.ts`)
- `BASE_URL=<url> vp run e2e` — run Playwright smoke tests. Playwright starts no
  server.
- `BASE_URL=<url> vp run test:visual` — compare the site with the CI baselines
- `vp run dead-code` — find unused exports with fallow

Use `pnpm` through Vite+ (`vp i`, `vp run <script>`).

Record visual baselines only on the `ubuntu-24.04` CI runner. See "Visual
baselines" in `README.md`.

## Architecture decisions

Do not reverse these decisions without a request from Sahand.

- Pages ship no JavaScript by default. Use a small `<script>` from `src/scripts`
  when one can do the work. The site has no React dependency.
- `output: 'static'` prerenders each page. The Worker runs only for the paths in
  `assets.run_worker_first` in `wrangler.jsonc`. Add a path there for each new
  server route, because `not_found_handling` sends other paths to the 404 page.
- The contact form is an Astro Action. Worker state lives in the `RateLimiter`
  Durable Object, because isolate memory is not shared between requests.
- `src/worker.ts` handles `/ingest/*` before Astro. PostHog needs trailing
  slashes, and `trailingSlash: 'never'` removes them.
- Check the `error` value of every Resend call. `emails.send()` does not throw
  when Resend refuses a message.
- Never tell a visitor that a message was sent unless the action succeeded.

## Workers limits

- The Free plan allows 100,000 Worker requests a day and 10 ms of CPU for each
  request.
- Static asset requests do not count toward these limits.
- `run_worker_first` sends matching requests through the Worker, and those
  requests count. Match only the paths that need the Worker.

## Hosting notes

- A Cloudflare custom domain cannot replace a web DNS record. If the hostname
  has an `A`, `AAAA`, or `CNAME` record, `wrangler deploy` fails with error
  100117, even with `override_existing_dns_record`. Delete only that record
  first. Keep the `MX` and `TXT` records, because email depends on them.
- `sahandamini.com` is the canonical origin. `sahandamini.dev` only redirects to
  it, serves `*.lab.sahandamini.dev`, and sends email. See `docs/email.md`.
- Workers routing uses a 307 for a trailing slash. `public/_redirects` makes
  `/contact/` use a 301.
- `_headers` rules match only on the URL, so a 404 under `/_astro/` also gets
  the one-year cache header.
- Previews return a bare `Not found` for a missing page. Production serves
  `dist/client/404.html`.
- Previews do not inherit production secrets. See "Secrets" in `README.md`.
- Do not use `wrangler login`. It cannot create a zone or edit DNS.

## Style rules

### Always build `class` with `cn()`

Compose conditional or combined classes with `cn()` from `@/lib/utils/ui`, or
with Astro `class:list`. Never interpolate classes with template literals or
string concatenation — an ESLint `no-restricted-syntax` rule rejects template
literals in `class`.

### Add custom colors in two places

Add each custom color token to `src/styles/global.css` and to the list in
`src/lib/utils/ui.ts`. Without the list entry, `cn()` removes classes such as
`border` that the token appears to conflict with.
