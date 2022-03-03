import { RemixI18Next, FileSystemBackend } from 'remix-i18next'
import i18nextOptions from './i18nextOptions'

// In theory we could use the i18next-locize-backend, but this would probably
// lead to an elevated amount of downloads: https://github.com/locize/i18next-locize-backend#important-advice-for-serverless-environments---aws-lambda-google-cloud-functions-azure-functions-etc
// import LocizeBackend from 'i18next-locize-backend'
// class LocizeBackend {
//   constructor(options) {
//     this.locizeBackend = new LocizeBackend(options)
//   }
//   async getTranslations(namespace, locale) {
//     return new Promise((resolve, reject) => {
//       this.locizeBackend.read(locale, namespace, (err, ret) => {
//         if (err) return reject(err)
//         resolve(ret)
//       })
//     })
//   }
// }
// const backend = new LocizeBackend({
//   projectId: 'f6d74b76-9677-4a0d-b400-86e1507397ab'
// })

// That's why we prefer to download the translations via locize-cli and use the file system backend.
const backend = new FileSystemBackend('./public/locales')

export default new RemixI18Next(backend, {
  fallbackLng: i18nextOptions.fallbackLng, // here configure your default (fallback) language
  supportedLanguages: i18nextOptions.supportedLngs, // here configure your supported languages
  // cookie: {
  //   parse: async (cookieString) => {
  //     const cookie = Object.fromEntries(
  //       cookieString
  //         .split(';')
  //         .map((cookie) => cookie.trim().split('=')) ?? []
  //     );
  //     return cookie.i18next;
  //   }
  // }
})
