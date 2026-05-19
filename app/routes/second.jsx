import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import Loading from '../components/Loading.jsx'

export const handle = { i18n: ['second'] }

export default function Second() {
  const { t, ready } = useTranslation('second')
  if (!ready) return <Loading />

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>{t('title')}</h1>
      <ul>
        <li>
          <Link to="/">index</Link>
        </li>
      </ul>
    </div>
  )
}
