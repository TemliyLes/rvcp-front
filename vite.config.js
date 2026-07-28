import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => {
  const isDevelopment = command === "serve";

  return {
    plugins: [vue(), tailwindcss(), isDevelopment && vueDevTools()].filter(
      Boolean,
    ),

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
  };
});
