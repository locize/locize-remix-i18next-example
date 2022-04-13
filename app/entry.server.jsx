import { renderToString } from 'react-dom/server'
import { RemixServer } from 'remix'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import Backend from 'i18next-fs-backend'
import { resolve } from 'node:path'
import i18nextOptions from './i18nextOptions'
import i18n from './i18n.server';

export default async function handleRequest(
  request,
  statusCode,
  headers,
  context
) {
  // Then we could detect locale from the request
  const lng = await i18n.getLocale(request)
  // And here we detect what namespaces the routes about to render want to use
  const ns = i18n.getRouteNamespaces(context)

  // Here you also need to initialize i18next using initReactI18next, you should
  // use the same configuration as in your client side.
  if (!i18next.isInitialized) // prevent i18next to be initialized multiple times
    await i18next
      .use(initReactI18next) // Tell our instance to use react-i18next
      .use(Backend) // Setup our backend.init({
      .init({
        ...i18nextOptions,
        lng, // The locale we detected above
        ns, // The namespaces the routes about to render want to use
        backend: {
          loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
        }
      })

  // Then you can render your app wrapped in the I18nextProvider as in the
  // entry.client file
  const markup = renderToString(
    <I18nextProvider i18n={i18next}>
      <RemixServer context={context} url={request.url} />
    </I18nextProvider>
  );

  headers.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: statusCode,
    headers: headers,
  })
}