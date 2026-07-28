/*
 * Минимальная браузерная заглушка для SSG-сборки.
 *
 * В обычном браузере этот код ничего не меняет.
 */
if (typeof window === "undefined") {
  const siteOrigin = (
    import.meta.env.VITE_SITE_URL || "http://localhost"
  ).replace(/\/+$/, "");

  /*
   * window будет ссылаться на глобальный объект Node.js.
   * Поэтому доступны setTimeout, clearTimeout и другие
   * стандартные глобальные функции.
   */
  globalThis.window = globalThis;

  globalThis.location = {
    origin: siteOrigin,
    href: `${siteOrigin}/`,
    protocol: new URL(siteOrigin).protocol,
    host: new URL(siteOrigin).host,
    hostname: new URL(siteOrigin).hostname,
    pathname: "/",
    search: "",
    hash: "",
  };

  globalThis.window.location = globalThis.location;

  /*
   * Простые заглушки на случай обращений
   * к браузерным событиям во время SSG.
   */
  globalThis.window.addEventListener = () => {};
  globalThis.window.removeEventListener = () => {};

  globalThis.window.requestAnimationFrame = (callback) => {
    return setTimeout(() => {
      callback(Date.now());
    }, 16);
  };

  globalThis.window.cancelAnimationFrame = (id) => {
    clearTimeout(id);
  };

  globalThis.window.innerWidth = 1920;
  globalThis.window.innerHeight = 1080;
}
