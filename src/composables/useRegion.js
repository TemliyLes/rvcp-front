// src/composables/useRegion.js

import { ref } from "vue";
import { useI18n } from "vue-i18n";

const region = ref(null);

export const useRegion = () => {
  const { locale } = useI18n();

  const detectRegion = () => {
    if (typeof window === "undefined") {
      return;
    }

    const hostname = window.location.hostname.toLowerCase();

    if (hostname.endsWith(".ch")) {
      region.value = "ch";
      locale.value = "de";
    } else if (hostname.endsWith(".sk")) {
      region.value = "sk";
      locale.value = "sk";
    } else {
      // localhost / локальная разработка
      region.value = "sk";
      locale.value = "sk";
    }
  };

  detectRegion();

  return {
    region,
  };
};
