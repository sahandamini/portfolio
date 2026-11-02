# Sahand Amini

My portfolio site. Built with Astro, Tailwind CSS 4, and Vite+, and hosted on
Cloudflare Workers.

Production: https://sahandamini.com

## Local development

Install [mise](https://mise.jdx.dev/getting-started.html), then run:

```sh
mise trust
mise run bootstrap
```

[Pitchfork](https://pitchfork.jdx.dev) starts the dev server when you enter the
project directory. Without Pitchfork, run `vp run dev`. This command fails if
the Pitchfork daemon already holds the port.

To send real email from the dev server, put `RESEND_API_KEY=<key>` in
`.dev.vars`. Git ignores this file.

| Command                             | Purpose                                 |
| ----------------------------------- | --------------------------------------- |
| `vp run check`                      | Run format, lint, and type checks       |
| `vp run test:unit`                  | Run unit tests                          |
| `vp run build`                      | Build the site into `dist/`             |
| `vp run preview`                    | Serve the build, on :8787               |
| `BASE_URL=<url> vp run e2e`         | Run smoke tests against a running site  |
| `BASE_URL=<url> vp run test:visual` | Compare a running site with screenshots |

## Hosting

Merging to `main` deploys the site. Each pull request gets its own Preview link.
Smoke tests run on each Preview and on the live site after a merge.

To deploy from your machine, run `pnpm exec varlock run -- vp run deploy`. This
needs the Cloudflare token in `.env.local`.

These commands are set in the Cloudflare dashboard, under the Worker's build
settings:

| Setting                   | Command                      |
| ------------------------- | ---------------------------- |
| Build                     | `pnpm run build`             |
| Deploy                    | `pnpm exec wrangler deploy`  |
| Non-production deployment | `pnpm exec wrangler preview` |

The site is prerendered. The Worker runs only for `/_actions/*`, which sends the
contact form, and `/ingest/*`, which proxies PostHog.

## Secrets

The Worker needs `RESEND_API_KEY`. Production and Previews store the key
separately:

```sh
pnpm exec wrangler secret put RESEND_API_KEY
pnpm exec wrangler preview base-config secret put RESEND_API_KEY
```

A new Preview copies the base value when Cloudflare creates it.

## Domain, DNS, and email

See [docs/email.md](docs/email.md).

## Environment variables

[Varlock](https://varlock.dev) manages environment variables, and `.env.schema`
documents each one. Local secrets live in `.env.local`, encrypted with
`varlock encrypt`. The build needs no secrets.

## Visual baselines

`vp run test:visual` compares `/` and `/contact` with the screenshots in
`e2e/__screenshots__`. Screenshots depend on the OS and fonts, so record them
only on the `ubuntu-24.04` CI runner. Never commit local screenshots.

If a screenshot changes, the `test-visual` job fails and uploads two artifacts:

- `visual-test-report` shows each image diff.
- `visual-baselines` holds a full set of new screenshots.

If the change is intentional, extract `visual-baselines` into
`e2e/__screenshots__` and commit the result.
