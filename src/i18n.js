import { createI18n } from "vue-i18n";

import sk from "./locales/sk.json";
import cz from "./locales/cz.json";

const locale = import.meta.env.VITE_LOCALE || "sk";

export const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: "sk",

  messages: {
    sk,
    cz,
  },
});