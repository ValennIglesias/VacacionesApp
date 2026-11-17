// Script mínimo de las páginas estáticas: tema claro/oscuro y anuncio de AdSense (si está configurado).
document.getElementById("theme-toggle")?.addEventListener("click", () => {
  const root = document.documentElement;
  const dark = root.dataset.theme === "dark" || (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
  root.dataset.theme = dark ? "light" : "dark";
  try {
    localStorage.setItem("theme", root.dataset.theme);
  } catch {}
});

// la app arranca en el idioma de la página desde la que se entró, salvo que el usuario ya haya elegido uno
try {
  if (!localStorage.getItem("lang")) localStorage.setItem("lang", document.documentElement.lang === "en" ? "en" : "es");
} catch {}

const client = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined;
const slot = import.meta.env.VITE_ADSENSE_SLOT_LANDING as string | undefined;
const host = document.getElementById("ad-landing");

if (client && slot && host) {
  // el script de AdSense ya viene en el <head> (vite.config.ts)
  host.innerHTML = `<p class="mb-1 text-center text-xs text-muted">${document.documentElement.lang === "en" ? "Advertisement" : "Publicidad"}</p><ins class="adsbygoogle" style="display:block" data-ad-client="${client}" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
  host.hidden = false;
  ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle ||= []).push({});
}
