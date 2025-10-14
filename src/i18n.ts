import i18n from 'i18next'
import { initReactI18next, Translation } from 'react-i18next'
import en from './locales/en/translation'
import tm from './locales/tm/translation'
import ru from './locales/ru/translation'

i18n
.use(initReactI18next)
.init({
    resources:{
        en:{translation:en},
        tm:{translation:tm},
        ru:{translation:ru}
    },
    lng:'tm',
    fallbackLng:'',
    interpolation:{
        escapeValue:false,
    }
})

export default i18n