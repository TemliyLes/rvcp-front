import { createI18n } from "vue-i18n";

import sk from "./locales/sk.json";
import de from "./locales/de.json";

const getLocale = () => {
  if (typeof window === "undefined") {
    return "sk";
  }

  const hostname = window.location.hostname.toLowerCase();

  if (hostname.endsWith(".ch")) {
    return "de";
  }

  if (hostname.endsWith(".sk")) {
    return "sk";
  }

  return "sk";
};

export const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  fallbackLocale: "sk",

  messages: {
    sk,
    de,
  },
});
