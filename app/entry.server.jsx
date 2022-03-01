import { renderToString } from 'react-dom/server'
import { RemixServer } from 'remix'

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  // Then you can render your app wrapped in the RemixI18NextProvider as in the
  // entry.client file
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  })
}