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
| `vp run resume`                     | Build `public/resume.pdf`               |
| `vp run build`                      | Build the resume and the site           |
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

## Analytics

PostHog runs only on `sahandamini.com`. Local runs and Previews send no events.
Playwright sets `navigator.webdriver`, so posthog-js drops its events.

To exclude your own visits, open `https://sahandamini.com/?internal` once on
each browser that you use. This sets the `$internal_or_test_user` person
property. The project test account filter drops events from that person. If you
clear the site data, open the URL again.

## Secrets

The Worker needs `RESEND_API_KEY`. Production and Previews store the key
separately:

```sh
pnpm exec wrangler secret put RESEND_API_KEY
pnpm exec wrangler preview base-config secret put RESEND_API_KEY
```

A new Preview copies the base value when Cloudflare creates it.

## Resume

`resume/resume.tex` is the source. Each build compiles it into
`public/resume.pdf` with pdfLaTeX, and Git ignores the PDF. To publish a new
resume, change the source and deploy.

`scripts/build-resume.sh` installs TeX Live 2025 from a frozen repository into
`node_modules/.cache`. The first build takes about one minute. If this
repository is down, the build fails and the live site stays on the last deploy.
The dev server serves `/resume.pdf` only after you run `vp run resume`.

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
