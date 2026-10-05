# Contact form email

The contact form sends each message to `sahandportfolio@gmail.com` through
[Resend](https://resend.com). This document describes the DNS and Resend setup
that the form needs.

## How a message travels

1. A visitor submits the form on `sahandamini.com` or `sahandamini.dev`. Both
   domains serve the same Vercel project, so both run the same code.
2. The `sendEmail` server action in `src/app/actions.ts` calls Resend. It sends
   from `hello@sahandamini.dev`, to `sahandportfolio@gmail.com`, with a bcc to
   `sahandaamini@gmail.com`. The reply-to address is the visitor's address.
3. Gmail checks that the message comes from `sahandamini.dev`. It reads the
   DKIM, SPF, and DMARC records of `sahandamini.dev`.

The sending address controls the DNS records that email needs. The website
domain does not. The form on `sahandamini.com` works because
`sahandamini.dev` is verified in Resend.

## Why `sahandamini.com` is not in Resend

`sahandamini.com` does not send email, so it needs no Resend records. Resend
gives each domain its own DKIM key. The free plan allows one domain.

Visitors never see the sending address, because only you receive these
messages. Keep `sahandamini.dev` as the sending domain.

To send from `hello@sahandamini.com` instead:

1. Add `sahandamini.com` in Resend. On the free plan, remove `sahandamini.dev`
   first.
2. Add the DNS records that Resend shows. Do not copy the `sahandamini.dev`
   DKIM key, because the key is different for each domain.
3. Change `from` in `src/app/actions.ts`, then deploy.

## DNS

Porkbun is the registrar and the DNS host for both domains. The nameservers
are `curitiba`, `fortaleza`, `maceio`, and `salvador` `.ns.porkbun.com`. Vercel
only hosts the site.

### `sahandamini.dev`

| Name                | Type  | Value                                      | Purpose        |
| ------------------- | ----- | ------------------------------------------ | -------------- |
| `@`                 | A     | `216.198.79.1`                             | Vercel         |
| `www`               | CNAME | `a06817ab1a778393.vercel-dns-017.com`      | Vercel         |
| `@`                 | CAA   | `0 issue "letsencrypt.org"`                | Certificates   |
| `@`                 | CAA   | `0 issue "sectigo.com"`                    | Certificates   |
| `@`                 | CAA   | `0 issue "pki.goog"`                       | Certificates   |
| `send`              | MX    | `10 feedback-smtp.us-east-1.amazonses.com` | Resend bounces |
| `send`              | TXT   | `v=spf1 include:amazonses.com ~all`        | Resend SPF     |
| `resend._domainkey` | TXT   | `p=MIGfMA0...` (from Resend)               | Resend DKIM    |
| `_dmarc`            | TXT   | `v=DMARC1; p=none;`                        | DMARC          |

### `sahandamini.com`

| Name  | Type  | Value                                 | Purpose      |
| ----- | ----- | ------------------------------------- | ------------ |
| `@`   | A     | `216.198.79.1`                        | Vercel       |
| `www` | CNAME | `a06817ab1a778393.vercel-dns-017.com` | Vercel       |
| `@`   | CAA   | `0 issue "letsencrypt.org"`           | Certificates |
| `@`   | CAA   | `0 issue "sectigo.com"`               | Certificates |
| `@`   | CAA   | `0 issue "pki.goog"`                  | Certificates |

Neither domain receives email. Neither domain has an apex MX record.

### CAA records

CAA records list the certificate authorities that can issue certificates for
the domain. Vercel uses Let's Encrypt, with Sectigo and Google Trust Services
as backups. Caddy uses Let's Encrypt, with ZeroSSL (Sectigo) as a backup. If
you add a service that uses another authority, add a CAA record for that
authority. Otherwise, certificate issue and renewal fail for that service.

### New Vercel subdomains

Porkbun hosts the DNS, so Vercel cannot create records. To add a subdomain such
as `blog.sahandamini.dev`:

1. Add the domain to the Vercel project.
2. Copy the CNAME value that Vercel shows.
3. Add the CNAME record in Porkbun.

## Outage in 2026

Before October 2026, both domains used the Vercel nameservers. The Resend
records existed only in Porkbun, so the public DNS did not serve them. Resend
marked `sahandamini.dev` as failed and refused all messages. The DNS moved to
Porkbun on 2026-10-05, and Resend verified the domain.

The form showed success during the outage. `resend.emails.send()` returns an
`error` value and does not throw. `sendEmail` ignores that value, so the form
reports success when Resend refuses a message. Check the returned `error` to
show real failures.
