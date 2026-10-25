// Script mínimo de las páginas estáticas: tema claro/oscuro y anuncio de AdSense (si está configurado).
document.getElementById("theme-toggle")?.addEventListener("click", () => {
  const root = document.documentElement;
  const dark = root.dataset.theme === "dark" || (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
  root.dataset.theme = dark ? "light" : "dark";
  try {
    localStorage.setItem("theme", root.dataset.theme);
  } catch {}
});

const client = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined;
const slot = import.meta.env.VITE_ADSENSE_SLOT_LANDING as string | undefined;
const host = document.getElementById("ad-landing");

if (client && slot && host) {
  const s = document.createElement("script");
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
  document.head.appendChild(s);
  host.innerHTML = `<p class="mb-1 text-center text-xs text-muted">${document.documentElement.lang === "en" ? "Advertisement" : "Publicidad"}</p><ins class="adsbygoogle" style="display:block" data-ad-client="${client}" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
  host.hidden = false;
  ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle ||= []).push({});
}
