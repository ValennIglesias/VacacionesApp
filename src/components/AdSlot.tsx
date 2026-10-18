import { useEffect, useRef } from "react";

const CLIENT = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined; // ca-pub-...
const SLOTS: Record<string, string | undefined> = {
  summary: import.meta.env.VITE_ADSENSE_SLOT_SUMMARY,
  trip: import.meta.env.VITE_ADSENSE_SLOT_TRIP,
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/** Bloque de AdSense; no renderiza nada si no está configurado. Nunca ubicarlo junto a formularios o botones de pago. */
export function AdSlot({ slot }: { slot: keyof typeof SLOTS }) {
  const ref = useRef<HTMLModElement>(null);
  const id = SLOTS[slot];
  useEffect(() => {
    if (!CLIENT || !id || ref.current?.dataset.adStatus) return;
    if (!document.querySelector("script[data-adsense]")) {
      const s = document.createElement("script");
      s.async = true;
      s.dataset.adsense = "1";
      s.crossOrigin = "anonymous";
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`;
      document.head.appendChild(s);
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [id]);
  if (!CLIENT || !id) return null;
  return (
    <div className="my-2 min-h-[100px] overflow-hidden rounded-3xl">
      <ins ref={ref} className="adsbygoogle block" data-ad-client={CLIENT} data-ad-slot={id} data-ad-format="auto" data-full-width-responsive="true" />
    </div>
  );
}
