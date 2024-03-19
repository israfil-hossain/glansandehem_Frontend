import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//import resources from "./locales/lenguages.json";
import en from "./locales/en.json";
import se from "./locales/se.json";

const resources = {
  en: {
    translation: en,
  },
  se: {
    translation: se,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
