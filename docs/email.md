# Domains, DNS, and contact form email

The contact form sends each message to `sahandportfolio@gmail.com` through
[Resend](https://resend.com). This document describes the hosting, DNS, and
Resend setup that the form needs.

## How a message travels

1. A visitor submits the form on `sahandamini.com`. `www.sahandamini.com`,
   `sahandamini.dev`, and `www.sahandamini.dev` redirect to this hostname, so
   the form runs at one origin.
2. The browser posts to the `contact.send` Astro Action in
   `src/actions/index.ts`. The action runs on the Cloudflare Worker.
3. The `RateLimiter` Durable Object allows 3 attempts in 15 minutes for each
   IPv4 address or IPv6 /64 network. It allows 100 attempts in 1 hour for the
   site, and counts only the attempts that pass the address limit. It counts
   each attempt before it calls Resend, so a failed send also counts.
4. `sendContactEmail` in `src/lib/contact/email.ts` calls Resend. It sends from
   `hello@sahandamini.dev`, to `sahandportfolio@gmail.com`, with a bcc to
   `sahandaamini@gmail.com`. The reply-to address is the visitor's address.
5. Gmail checks that the message comes from `sahandamini.dev`. It reads the
   DKIM, SPF, and DMARC records of `sahandamini.dev`.

The sending address controls the DNS records that email needs. The website
domain does not. The site serves from `sahandamini.com`, and email sends from
`sahandamini.dev`, because `sahandamini.dev` is the domain verified in Resend.

The site is static, but this form is not. The Worker must have the
`RESEND_API_KEY` secret. Without the secret, every message fails. See "Secrets"
in `README.md`.

## When Resend refuses a message

`resend.emails.send()` returns an `error` value and does not throw.
`sendContactEmail` throws when this value is set, and the action returns a 502.
The form then shows an error and keeps the visitor's text. The Worker logs show
the Resend error as `Contact email failed`.

## Why `sahandamini.com` is not in Resend

`sahandamini.com` does not send email, so it needs no Resend records. Resend
gives each domain its own DKIM key.

Visitors never see the sending address, because only you receive these messages.
Keep `sahandamini.dev` as the sending domain.

To send from `hello@sahandamini.com` instead:

1. Add `sahandamini.com` in Resend. Keep `sahandamini.dev` verified, because the
   live form sends from it.
2. Add the DNS records that Resend shows. Do not copy the `sahandamini.dev` DKIM
   key, because the key is different for each domain.
3. Wait until Resend shows `sahandamini.com` as verified.
4. Change `FROM` in `src/lib/contact/email.ts`. Change the sender in
   `src/lib/contact/email.unit.test.ts` to the same address. Then deploy.
5. Run the delivery test. Remove `sahandamini.dev` from Resend only after this
   test passes.

## Hosts

Porkbun is the registrar for both domains, so renew them there. Each domain has
a different DNS host, so check this table before you change a record.

| Domain            | DNS host   | Purpose                                     |
| ----------------- | ---------- | ------------------------------------------- |
| `sahandamini.com` | Cloudflare | The website, on Cloudflare Workers          |
| `sahandamini.dev` | Porkbun    | Redirects, lab URLs, and the sending domain |

| Address                 | Destination                     |
| ----------------------- | ------------------------------- |
| `sahandamini.com`       | The website                     |
| `www.sahandamini.com`   | Redirects to `sahandamini.com`  |
| `sahandamini.dev`       | Redirects to `sahandamini.com`  |
| `www.sahandamini.dev`   | Redirects to `sahandamini.com`  |
| `*.lab.sahandamini.dev` | The devbox, on the tailnet only |

Each redirect returns a 301 and keeps the path and query. A Cloudflare Redirect
Rule handles `www.sahandamini.com`. Porkbun URL forwarding handles
`sahandamini.dev` and `www.sahandamini.dev`.

## DNS

### `sahandamini.com` (Cloudflare)

| Name  | Type          | Value                       | Proxy    | Purpose         |
| ----- | ------------- | --------------------------- | -------- | --------------- |
| `@`   | Worker domain | `portfolio` Worker          | Proxied  | Website         |
| `www` | AAAA          | `100::`                     | Proxied  | Redirect source |
| `@`   | CAA           | `0 issue "letsencrypt.org"` | DNS only | Certificates    |
| `@`   | CAA           | `0 issue "sectigo.com"`     | DNS only | Certificates    |
| `@`   | CAA           | `0 issue "pki.goog"`        | DNS only | Certificates    |

`100::` is the IPv6 discard prefix. Cloudflare answers the request at the edge,
so the address is never used.

The Redirect Rule `Redirect www to the apex` sends `www.sahandamini.com` to
`https://sahandamini.com` with the path and query. The zone setting Always Use
HTTPS is on, so each `http://` request redirects to `https://`.

### `sahandamini.dev` (Porkbun)

| Name                | Type | Value                                      | Purpose        |
| ------------------- | ---- | ------------------------------------------ | -------------- |
| `@`                 | URL  | `https://sahandamini.com`, with the path   | Redirect       |
| `www`               | URL  | `https://sahandamini.com`, with the path   | Redirect       |
| `*.lab`             | A    | `100.108.188.119`                          | Devbox Caddy   |
| `@`                 | CAA  | `0 issue "letsencrypt.org"`                | Certificates   |
| `@`                 | CAA  | `0 issue "sectigo.com"`                    | Certificates   |
| `@`                 | CAA  | `0 issue "pki.goog"`                       | Certificates   |
| `send`              | MX   | `10 feedback-smtp.us-east-1.amazonses.com` | Resend bounces |
| `send`              | TXT  | `v=spf1 include:amazonses.com ~all`        | Resend SPF     |
| `resend._domainkey` | TXT  | `p=MIGfMA0...` (from Resend)               | Resend DKIM    |
| `_dmarc`            | TXT  | `v=DMARC1; p=none;`                        | DMARC          |

Neither domain receives email. Neither domain has an apex MX record.

Do not turn on wildcard forwarding for `sahandamini.dev`. A wildcard forward can
capture the lab URLs. `.dev` requires HTTPS, so a forward must serve a valid
certificate.

For each forward, Porkbun adds an `ALIAS` record to `uixie.porkbun.com`. Porkbun
issues one Let's Encrypt certificate for `sahandamini.dev` and
`*.sahandamini.dev` in approximately 3 minutes. A wildcard covers one label
only, so this certificate does not cover `*.lab.sahandamini.dev`. The
certificate does not interfere with the Caddy certificate.

### CAA records

CAA records list the certificate authorities that can issue certificates for the
domain. A subdomain with no CAA record uses the records of its parent, so the
`sahandamini.dev` records also control `*.lab.sahandamini.dev`.

- Cloudflare issues the certificates for `sahandamini.com`. It uses Google Trust
  Services or Let's Encrypt. Cloudflare adds the CAA records that it needs to
  the zone, and the dashboard does not show them.
- Porkbun issues the certificate for its URL forwards with Let's Encrypt.
- Caddy uses Let's Encrypt, with ZeroSSL (Sectigo) as a backup.

If you add a service that uses another authority, add a CAA record for that
authority. Otherwise, certificate issue and renewal fail for that service.

### New Worker subdomains

Cloudflare hosts the `sahandamini.com` DNS, so a Worker custom domain creates
its own record. To add a subdomain such as `blog.sahandamini.com`:

1. Add the hostname to `routes` in `wrangler.jsonc`, with `custom_domain: true`.
2. Deploy. If the hostname already has a web DNS record, delete that record
   first.

## Lab URLs

Caddy on the devbox serves `https://<name>.lab.sahandamini.dev` with a wildcard
certificate. The `*.lab` record points to the devbox Tailscale address, so only
the tailnet can reach these URLs.

Let's Encrypt validates a wildcard certificate through DNS. For each renewal,
Caddy creates a temporary `_acme-challenge.lab` TXT record through the Porkbun
API. This works only while Porkbun hosts the `sahandamini.dev` DNS. If this
domain moves to another DNS host, Caddy needs a new DNS provider first.
Otherwise renewal fails with no visible error until the certificate expires. The
dotfiles repo holds Caddy's Porkbun key and Caddyfile.

Caddy renews 30 days before the certificate expires. To check the current
certificate:

```sh
echo | openssl s_client -connect 100.108.188.119:443 \
  -servername test.lab.sahandamini.dev 2>/dev/null |
  openssl x509 -noout -issuer -enddate
```

## Test delivery

Run this test after each change to DNS, Resend, or the action.

1. Submit the form with an address that you control.
2. Confirm that the form shows `Message sent successfully!`.
3. Confirm that the message arrives in `sahandportfolio@gmail.com`.
4. Open the message headers. Confirm `dkim=pass` for the domain in `FROM`.
5. In Resend, confirm that the domain in `FROM` shows as verified.

## Outage in 2026

Before October 2026, both domains used the Vercel nameservers. The Resend
records existed only in Porkbun, so the public DNS did not serve them. Resend
marked `sahandamini.dev` as failed and refused all messages. The DNS moved to
Porkbun on 2026-10-05, and Resend verified the domain.

The form showed success during the outage, because the code ignored the `error`
value from `resend.emails.send()`. The form now reports these failures.

Two lessons apply to each nameserver change:

- Confirm that the new nameservers serve every record before you change the
  delegation. Query them directly with `dig @<nameserver>`.
- Confirm that Resend still shows the domain as verified after the change.
