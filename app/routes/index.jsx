import { json, Link, useLoaderData } from 'remix'
import remixI18n from '../i18n.server'
import { useTranslation, withTranslation, Trans } from 'react-i18next'
import { Component } from 'react'
import logo from '../logo.svg'
import styles from '../styles/app.css'
import Loading from '../components/Loading'

export const loader = async ({ request }) => {
  return json({
    i18n: await remixI18n.getTranslations(request, ['index']),
    locale: await remixI18n.getLocale(request),
    lngs: {
      en: { nativeName: 'English' },
      de: { nativeName: 'Deutsch' }
    }
  })
}

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

class LegacyWelcomeClass extends Component {
  render() {
    const { t } = this.props
    return <h2>{t('title')}</h2>
  }
}
const Welcome = withTranslation('index')(LegacyWelcomeClass)

// Component using the Trans component
function MyComponent({ t }) {
  return (
    <Trans t={t} i18nKey="description.part1">
      To get started, edit <code>src/App.js</code> and save to reload.
    </Trans>
  )
}

export default function Index() {
  const { lngs } = useLoaderData()
  const { t, ready, i18n } = useTranslation('index')
  if (!ready) return <Loading />

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome />
      </div>
      <div className="App-intro">
        <div>
          {Object.keys(lngs).map((lng) => (
            <button
              key={lng}
              style={{ marginRight: 5, fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
              onClick={() => i18n.changeLanguage(lng)}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <MyComponent t={t} />
      </div>
      <div>{t('description.part2')}</div>
      <div>{t('new.key', 'this will be added automatically')}</div>
      <hr />
      <div>
        <Link to="/second">{t('goto.second')}</Link>
      </div>
    </div>
  )
}
