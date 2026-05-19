import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { json } from '@remix-run/node'
import { useChangeLanguage } from 'remix-i18next/react'
import { useTranslation } from 'react-i18next'
import remixI18n from './i18n.server.js'
import { i18nCookie } from './cookie.js'
import styles from './styles/index.css?url'

export const loader = async ({ request }) => {
  const locale = await remixI18n.getLocale(request)
  const t = await remixI18n.getFixedT(request, 'common')
  const title = t('headTitle')
  return json(
    { locale, title },
    { headers: { 'Set-Cookie': await i18nCookie.serialize(locale) } },
  )
}

// Tell remix-i18next which i18next namespaces this route needs.
export const handle = { i18n: ['common'] }

// Remix v2 meta returns an array of meta descriptors (was an object in v1).
export const meta = ({ data }) => [{ title: data?.title }]

export const links = () => [{ rel: 'stylesheet', href: styles }]

export default function App() {
  const { i18n } = useTranslation()
  const { locale } = useLoaderData()

  // Sync the i18next instance with the locale the server decided.
  useChangeLanguage(locale)

  return (
    <html lang={i18n.resolvedLanguage}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
