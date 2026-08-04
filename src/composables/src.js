export const getImageUrl = (path) => {
  if (!path) {
    return "";
  }

  // Уже готовый URL от Vite / import.meta.url
  if (
    path.startsWith("/assets/") ||
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  // Убираем public из путей
  if (path.startsWith("/public/")) {
    return path.replace("/public", "");
  }

  // Если путь пришёл как обычный ассет
  const base = import.meta.env.BASE_URL || "/";

  const normalizedBase = base.endsWith("/") ? base : `${base}/`;

  const normalizedPath = path
    .replace(/^\.?\//, "")
    .replace(/^assets\//, "assets/");

  return `${normalizedBase}${normalizedPath}`;
};
