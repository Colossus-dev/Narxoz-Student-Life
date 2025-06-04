import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ru from "./locales/ru/translation.json";
import kz from "./locales/kz/translation.json";
import en from "./locales/en/translation.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ru: { translation: ru },
            kz: { translation: kz },
            en: { translation: en }
        },
        fallbackLng: "kz",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
