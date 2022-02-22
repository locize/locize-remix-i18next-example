import { hydrate } from 'react-dom'
import { RemixBrowser } from 'remix'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { RemixI18NextProvider } from 'remix-i18next'
import i18nextOptions from './i18nextOptions'

// initialize i18next using initReactI18next and configuring it
if (!i18next.isInitialized) // prevent i18next to be initialized multiple times
  i18next
    .use(initReactI18next)
    .init(i18nextOptions)
    .then(() => {
      // remix-i18next does not use the backend capability of i18next,
      // it uses a custom backend. So here we simulate a backendConnector is used,
      // this to check for ready flag in useTranslation, etc...
      // This will be important when navigating on client side: the translations will be lazy loaded.
      i18next.services.backendConnector.backend = { read: (language, namespace, callback) => callback(null, {}) }
      // then hydrate your app wrapped in the RemixI18NextProvider
      return hydrate(
        <RemixI18NextProvider i18n={i18next}>
          <RemixBrowser />
        </RemixI18NextProvider>,
        document
      )
    })