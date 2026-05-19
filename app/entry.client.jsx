import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { RemixBrowser } from '@remix-run/react'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { getInitialNamespaces } from 'remix-i18next/client'
import Backend from 'i18next-locize-backend'
import LastUsed from 'locize-lastused'
import { locizePlugin } from 'locize'
import i18nextOptions from './i18nextOptions.js'

const isProduction = process.env.NODE_ENV === 'production'

const locizeOptions = {
  projectId: 'f6d74b76-9677-4a0d-b400-86e1507397ab',
  // Dev-only — used by saveMissing to push new keys to Locize. Never bundle a
  // write-enabled key in production. See README for the env-file pattern if
  // you swap in your own project.
  apiKey: !isProduction ? '1c2bbc21-027d-4f41-995a-e8beb451cdef' : undefined,
  version: isProduction ? 'production' : 'latest',
  cdnType: 'pro'
}

if (!isProduction) {
  // locize-lastused sets a timestamp on every translation segment so unused
  // keys can later be cleaned up. Dev-only — https://github.com/locize/locize-lastused
  i18next.use(LastUsed)
}

async function hydrate() {
  // Prevent re-init when HMR re-runs this file in dev.
  if (!i18next.isInitialized) {
    await i18next
      // locize in-context editor — opens with ?locize=true
      .use(locizePlugin)
      // i18next-locize-backend — loads from the Locize CDN and pushes new
      // keys via saveMissing (only in dev, with apiKey set above).
      .use(Backend)
      // detect user language client-side
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        ...i18nextOptions,
        // getInitialNamespaces() reads the namespaces declared by the routes
        // that rendered server-side so we load matching translations.
        ns: getInitialNamespaces(),
        detection: {
          // Only htmlTag — remix-i18next decided the locale server-side and
          // emitted it via <html lang>. Nothing to detect on the client.
          order: ['htmlTag'],
          caches: [],
        },
        backend: locizeOptions,
        locizeLastUsed: locizeOptions,
        saveMissing: !isProduction,
      })
  }

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      </I18nextProvider>,
    )
  })
}

if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(hydrate)
} else {
  // Safari fallback — schedule on the next macrotask.
  setTimeout(hydrate, 1)
}
