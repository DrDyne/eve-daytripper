import i18n from 'i18next'
import moment from 'moment'
import XHR from 'i18next-xhr-backend'
// import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector'

//TODO add locales
//import locales from 'app-locales'

i18n
//.use(XHR)
// .use(Cache)
.use(LanguageDetector)
.init({
  fallbackLng: 'en-US',

  react: {
    // wait: true, // globally set to wait for loaded translations in translate hoc
    // exposeNamespace: true // exposes namespace on data-i18next-options to be used in eg. locize-editor
  },

  // have a common namespace used around the full app
  ns: ['common'],
  defaultNS: 'common',

  debug: false,//true,

  // cache: {
  //   enabled: true
  // },

  interpolation: {
    prefix: '__',
    suffix: '__',
    escapeValue: false, // not needed for react!!
    formatSeparator: ','
  },
  parseMissingKeyHandler: (key) => {
    return `MISSING_T:${key.toUpperCase()}`
  }

  //parseMissingKeyHandler: key => `<bold>T:</bold>${key.toUpperCase()}`,
})

//TODO add locales
//i18n.addResourceBundle('en-US', 'common', locales.en)
//i18n.addResourceBundle('fr-FR', 'common', locales.fr)

export default i18n;
