# Remix v2 + [Locize](https://www.locize.com/?from=locize-remix-i18next-example) example

A minimal Remix v2 sample showing how to wire
[remix-i18next](https://github.com/sergiodxa/remix-i18next) with
[Locize](https://www.locize.com/?from=locize-remix-i18next-example) for
server-side language detection plus client-side translation loading.
Companion blog posts:
[Part 1 — getting started](https://www.locize.com/blog/remix-i18n?from=locize-remix-i18next-example)
·
[Part 2 — continuous localization](https://www.locize.com/blog/remix-i18next?from=locize-remix-i18next-example).

Stack: Remix v2.17 · `remix-i18next` 6.4 · i18next 23.16 · react-i18next
15.7 · `i18next-locize-backend` 10 · `i18next-fs-backend` 2 ·
`locize` 4.0.24 (with the SSR-iframe-detection fix from 4.0.23) ·
React 18.

> Looking for the React Router v7 framework-mode version of this
> example? See
> [`locize-react-router-example`](https://github.com/locize/locize-react-router-example)
> (blog walkthrough:
> [React Router v7 + remix-i18next](https://www.locize.com/blog/react-router-i18next?from=locize-remix-i18next-example))
> — Remix has been absorbed into React Router v7 and `remix-i18next`
> 7.x targets that new shape.

## Getting started

1. Create a free account and a project at <https://www.locize.com/?from=locize-remix-i18next-example>,
   then grab your project id (and an API key if you want
   `saveMissing` writes during local dev).
2. Either edit
   [`app/entry.client.jsx`](app/entry.client.jsx) and
   [`package.json`'s `downloadLocales`/`syncLocales` scripts](package.json),
   or keep the shipped demo-project credentials to try it out first.
3. Pre-bundle the translations: `npm run downloadLocales` — pulls the
   latest published JSON from Locize into `public/locales/`.
4. `npm install && npm run dev`, then open <http://localhost:3000>.

## How the Locize integration works

Remix runs the same React tree on the server and on the browser, so the
two sides of i18next are wired separately:

### Server side — `app/i18n.server.js` + `app/entry.server.jsx`

`RemixI18Next` from `remix-i18next/server` picks the locale from the
request (cookie → URL param → `Accept-Language` header) and exposes a
per-request `getFixedT(...)`. Translations are loaded from
`./public/locales/{{lng}}/{{ns}}.json` via `i18next-fs-backend` — i.e.
the JSON files that `locize download` placed there at build time.

**No runtime calls to the Locize CDN from the server.** This is
important on serverless platforms (Vercel/Netlify/Cloudflare Workers)
where each request would otherwise be a fresh cold-start re-download.
See
[`i18next-locize-backend` — important advice for serverless environments](https://github.com/locize/i18next-locize-backend#important-advice-for-serverless-environments---aws-lambda-google-cloud-functions-azure-functions-etc).

### Client side — `app/entry.client.jsx`

After the SSR-rendered HTML reaches the browser, i18next initialises
with `i18next-locize-backend` directly against the Locize CDN, plus the
[`locize` in-context editor plugin](https://github.com/locize/locize)
and (dev-only) [`locize-lastused`](https://github.com/locize/locize-lastused)
for unused-key tracking. `getInitialNamespaces()` from
`remix-i18next/client` reads the namespaces declared by the routes that
rendered server-side so we load matching translations.

`hydrateRoot` is wrapped in `startTransition` per Remix v2 guidance.

### Pushing missing keys back — `saveMissing`

Set in `app/entry.client.jsx` via `saveMissing: !isProduction`. When
i18next requests a key that the loaded JSON doesn't yet have, it pushes
the key to Locize so translators can fill it in — analogous to a
build-time extraction step, but live during dev.

## Production safety

The write-enabled `apiKey` is hardcoded in `app/entry.client.jsx` only
for the public demo project (see the comment there). For your own
project, source the dev apiKey from a git-ignored env file and never
ship it in production builds.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Remix dev server (default <http://localhost:3000>) |
| `npm run build` | Production build into `build/` + `public/build/` |
| `npm start` | Run the production build via `@remix-run/serve` |
| `npm run downloadLocales` | `locize download` — pull translations into `public/locales/` |
| `npm run syncLocales` | `locize sync` — two-way sync (dry-run by default) |

## Locize CDN endpoint

The example talks to the **Pro CDN** (`api.locize.app`) by default
because the shipped demo project lives there. If your project is on the
Standard CDN (`api.lite.locize.app`, the default for new projects), set
`cdnType: 'standard'` in the `locizeOptions` block of
[`app/entry.client.jsx`](app/entry.client.jsx). See
[CDN types: Standard vs. Pro](https://www.locize.com/docs/integration/cdn-types-standard-vs-pro?from=locize-remix-i18next-example)
for the full comparison.

## Related

- [Locize platform docs](https://www.locize.com/docs?from=locize-remix-i18next-example)
- [remix-i18next documentation](https://github.com/sergiodxa/remix-i18next)
- React Router v7 framework-mode alternative:
  [`locize-react-router-example`](https://github.com/locize/locize-react-router-example)
  ([blog walkthrough](https://www.locize.com/blog/react-router-i18next?from=locize-remix-i18next-example))
- Next.js + Locize alternative:
  [next-i18next-locize](https://github.com/locize/next-i18next-locize)
