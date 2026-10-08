export const getLocale = () => {
if (typeof window === "undefined") {
return "sk";
}

const hostname = window.location.hostname.toLowerCase();
console.log(hostname)


if (hostname.endsWith(".cz")) {
return "cz";
}

if (hostname.endsWith(".sk")) {
return "sk";
}

return "sk";
};