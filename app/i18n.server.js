import { RemixI18Next } from 'remix-i18next/server'
import Backend from 'i18next-fs-backend'
import { resolve } from 'node:path'
import i18nextOptions from './i18nextOptions.js'
import { i18nCookie } from './cookie.js'

export default new RemixI18Next({
  detection: {
    // Persist the language selection in a cookie.
    cookie: i18nCookie,
    supportedLanguages: i18nextOptions.supportedLngs,
    fallbackLanguage: i18nextOptions.fallbackLng,
  },
  // Configuration for the server-side i18next instance.
  i18next: {
    ...i18nextOptions,
    backend: {
      loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
    },
  },
  // The fs backend reads translations bundled at build time (via
  // `npm run downloadLocales`). See README for the build-time sync pattern.
  plugins: [Backend],
})
