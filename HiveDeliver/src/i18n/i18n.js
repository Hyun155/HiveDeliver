import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import ms from './locales/ms.json'
import zh from './locales/zh.json'
import ta from './locales/ta.json'

export const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ms', label: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
]

// Try to get saved language from localStorage, default to 'en'
const savedLanguage = typeof window !== 'undefined'
  ? localStorage.getItem('hiveDeliver_lang') || 'en'
  : 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ms: { translation: ms },
      zh: { translation: zh },
      ta: { translation: ta },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
  })

// Save language preference when it changes
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('hiveDeliver_lang', lng)
  }
})

export default i18n
