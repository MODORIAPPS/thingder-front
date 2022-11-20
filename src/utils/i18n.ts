import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import kr from "../locales/kr";
import en from "../locales/en";

const resources = {
    en: {
        translation: en
    },
    kr: {
        translation: kr
    }
};

i18n
    // .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        interpolation: { escapeValue: false },
        detection: { order: ['path', 'navigator'] }
    });


export default i18n;