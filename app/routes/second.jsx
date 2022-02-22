import { json, Link } from 'remix'
import remixI18n from '../i18n.server'
import { useTranslation } from 'react-i18next'
import Loading from '../components/Loading'

export const loader = async ({ request }) => {
  return json({
    i18n: await remixI18n.getTranslations(request, ['second'])
  })
}

export default function Index() {
  const { t, ready } = useTranslation('second')
  if (!ready) return <Loading /> // i18next may not be ready when changing route with <Link>

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
