import { createCookie } from 'remix'

export let i18nCookie = createCookie('i18n', {
  sameSite: 'lax',
  path: '/',
})
