import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import Loading from '../components/Loading'

export const handle = {
  // In the handle export, we could add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  i18n: ['second']
}

export default function Index() {
  const { t, ready } = useTranslation('second')
  if (!ready) return <Loading />

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{t('title')}</h1>
      <ul>
        <li>
          <Link to="/">index</Link>
        </li>
      </ul>
    </div>
  )
}
