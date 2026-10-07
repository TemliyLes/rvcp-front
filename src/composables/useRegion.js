export const getLocale = () => {
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
