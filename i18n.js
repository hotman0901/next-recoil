// const { localeSubpath } = require('next/config').default().publicRuntimeConfig;
const NextI18Next = require('next-i18next').default;
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
const path = require('path');
// const config = require('next/config').default();
// const defaultLanguage = 'tw';
// const otherLanguages = ['en'];

// module.exports = new NextI18Next({
//     defaultLanguage,
//     otherLanguages,
// });

const NextI18NextInstance = new NextI18Next({
  localePath: path.resolve('./public/static/locales'),
  localeSubpaths,
  whitelist: ['tw', 'en'],
  defaultLanguage: 'tw',
  otherLanguages: ['en'],
  fallbackLng: 'tw',
  load: 'currentOnly',
  lowerCaseLng: true,
  browserLanguageDetection: true,
  // order and from where user language should be detected
  order: [
    'localStorage',
    'querystring',
    'cookie',
    'navigator',
    'htmlTag',
    'path',
    'subdomain'
  ],

  // keys or params to lookup language from
  detection: {
    lookupLocalStorage: 'i18nextLng'
  },
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  // cookieDomain: 'myDomain',
  preload: ['tw', 'en'],
  ns: ['common']
});

const languages = ['tw', 'en'];
NextI18NextInstance.i18n.languages = languages;

module.exports = NextI18NextInstance;
