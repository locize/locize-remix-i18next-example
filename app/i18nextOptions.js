export default {
  debug: process.env.NODE_ENV !== 'production',
  fallbackLng: 'en',
  supportedLngs: ['en', 'de'],
  defaultNS: 'common',
  ns: [],
  react: { useSuspense: false },
  resources: {} // prevents init warning
}