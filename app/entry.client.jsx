import { hydrate } from 'react-dom'
import { RemixBrowser } from 'remix'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import Backend from 'i18next-locize-backend'
import LastUsed from 'locize-lastused'
import { locizePlugin } from 'locize'
import i18nextOptions from './i18nextOptions'

const isProduction = process.env.NODE_ENV === 'production'

const locizeOptions = {
  projectId: 'f6d74b76-9677-4a0d-b400-86e1507397ab',
  apiKey: !isProduction ? '1c2bbc21-027d-4f41-995a-e8beb451cdef' : undefined, // YOU should not expose your apps API key to production!!!
  version: isProduction ? 'production' : 'latest'
}

if (!isProduction) {
  // locize-lastused
  // sets a timestamp of last access on every translation segment on locize
  // -> safely remove the ones not being touched for weeks/months
  // https://github.com/locize/locize-lastused
  i18next.use(LastUsed)
}

// initialize i18next using initReactI18next and configuring it
if (!i18next.isInitialized) { // prevent i18next to be initialized multiple times
  i18next
    // locize-editor
    // InContext Editor of locize
    .use(locizePlugin)
    // i18next-locize-backend
    // loads translations from your project, saves new keys to it (saveMissing: true)
    // https://github.com/locize/i18next-locize-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      ...i18nextOptions,
      detection: {
        caches: ['cookie'],
        lookupCookie: 'i18next'
      },
      backend: locizeOptions,
      locizeLastUsed: locizeOptions,
      saveMissing: !isProduction // you should not use saveMissing in production
    })
    .then(() => {
      // then hydrate your app
      return hydrate(
        <I18nextProvider i18n={i18next}>
          <RemixBrowser />
        </I18nextProvider>,
        document
      )
    })
}