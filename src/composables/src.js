export const getImageUrl = (path) => {
  console.log(path);
  if (!path) {
    return "";
  }

  // Внешние ссылки и специальные URL оставляем без изменений.
  if (
    /^(https?:)?\/\//i.test(path) ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.replace(/^\.?\//, "");

  return `${normalizedBase}${normalizedPath}`;
};
