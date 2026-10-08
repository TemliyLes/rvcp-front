import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";

const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[character],
  );

export default defineConfig(({ command, mode }) => {
  const isDevelopment = command === "serve";
  const env = loadEnv(mode, fileURLToPath(new URL(".", import.meta.url)), "VITE_");
  const locale = env.VITE_LOCALE || "sk";

  if (!["sk", "cz"].includes(locale)) {
    throw new Error(`Unsupported VITE_LOCALE: ${locale}. Use sk or cz.`);
  }

  const { seo } = JSON.parse(
    readFileSync(new URL(`./src/locales/${locale}.json`, import.meta.url), "utf8"),
  );
  const htmlTranslations = {
    SEO_TITLE: seo.title,
    SEO_DESCRIPTION: seo.description,
    SEO_LANG: seo.lang,
    SEO_OG_LOCALE: seo.ogLocale,
  };

  return {
    plugins: [
      {
        name: "vite-plugin-localized-html",
        transformIndexHtml: {
          order: "pre",
          handler: (html) =>
            html.replace(
              /%SEO_(TITLE|DESCRIPTION|LANG|OG_LOCALE)%/g,
              (placeholder) =>
                escapeHtml(htmlTranslations[placeholder.slice(1, -1)]),
            ),
        },
      },
      vue(),
      tailwindcss(),
      isDevelopment && vueDevTools(),
    ].filter(Boolean),

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    /*
     * Для размещения в корне домена:
     * https://domain.cz/
     */
    base: "/",

    build: {
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,
    },
    // Apply build-time feature flags to vue-i18n during SSG as well.
    ssr: {
      noExternal: ["vue-i18n"],
    },
    define: {
      __VUE_PROD_DEVTOOLS__: false,
    },
  };
});
