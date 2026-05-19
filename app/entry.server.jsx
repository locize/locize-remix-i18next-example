import { PassThrough } from 'node:stream'
import { resolve } from 'node:path'
import { createReadableStreamFromReadable } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { isbot } from 'isbot'
import { renderToPipeableStream } from 'react-dom/server'
import { createInstance } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import Backend from 'i18next-fs-backend'
import i18nextOptions from './i18nextOptions.js'
import i18n from './i18n.server.js'

const ABORT_DELAY = 5_000

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  // Fresh i18next instance per request — no shared state between users.
  const instance = createInstance()

  const lng = await i18n.getLocale(request)
  const ns = i18n.getRouteNamespaces(remixContext)

  await instance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18nextOptions,
      lng,
      ns,
      backend: {
        loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
      },
    })

  return new Promise((resolveResponse, reject) => {
    let shellRendered = false
    const userAgent = request.headers.get('user-agent')

    // Bots get the full document before bytes flow (waitUntilAllReady).
    // Real users get streaming (onShellReady) for faster TTFB.
    const readyCallback =
      userAgent && isbot(userAgent)
        ? 'onAllReady'
        : 'onShellReady'

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      </I18nextProvider>,
      {
        [readyCallback]() {
          shellRendered = true
          const body = new PassThrough()
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set('Content-Type', 'text/html')
          resolveResponse(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          )

          pipe(body)
        },
        onShellError(error) {
          reject(error)
        },
        onError(error) {
          responseStatusCode = 500
          if (shellRendered) console.error(error)
        },
      },
    )

    setTimeout(abort, ABORT_DELAY)
  })
}
