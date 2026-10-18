import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, ShareNetwork, MagnifyingGlass } from "@phosphor-icons/react";
import { COUNTRY_CURRENCY, CURRENCIES } from "../../shared/data";
import { countryName, currencyName } from "../lib/format";
import { useLocale, useT } from "../lib/i18n";
import { Button, Flag } from "./ui";

export function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };
  return { copied, copy };
}

export function CopyButton({ text, label }: { text: string; label?: string }) {
  const t = useT();
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(text)}
      className="inline-flex h-10 items-center gap-1.5 rounded-full bg-accent-soft px-4 text-sm font-medium text-accent-ink transition-transform active:scale-95"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={String(copied)} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
          {copied ? <Check size={16} weight="bold" /> : <Copy size={16} weight="bold" />}
        </motion.span>
      </AnimatePresence>
      {copied ? t.copied : (label ?? t.copy)}
    </button>
  );
}

export function ShareCode({ code, tripName }: { code: string; tripName: string }) {
  const t = useT();
  const url = `${location.origin}/app/join/${code}`;
  const text = `${t.shareText} ${code}`;
  const { copied, copy } = useCopy();
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: tripName, text, url });
        return;
      } catch {
        return; // el usuario canceló
      }
    }
    copy(`${text}\n${url}`);
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-1.5" aria-label={code}>
        {code.split("").map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10, rotateX: -60 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.05 * i, type: "spring", stiffness: 300, damping: 22 }}
            className="inline-flex h-14 w-11 items-center justify-center rounded-2xl bg-surface-2 text-2xl font-semibold tabular"
          >
            {ch}
          </motion.span>
        ))}
      </div>
      <div className="flex gap-2">
        <Button onClick={share}>
          <ShareNetwork size={20} weight="bold" /> {copied ? t.copied : t.share}
        </Button>
        <CopyButton text={code} />
      </div>
    </div>
  );
}

export function CurrencySelect({ value, onChange, label, id }: { value: string; onChange: (v: string) => void; label?: string; id?: string }) {
  const locale = useLocale();
  return (
    <select
      id={id}
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 w-full rounded-2xl border border-line bg-surface px-4 text-ink outline-none focus:border-accent"
    >
      {CURRENCIES.map((c) => (
        <option key={c} value={c}>
          {c} · {currencyName(c, locale)}
        </option>
      ))}
    </select>
  );
}

export function CountryPicker({ value, onChange }: { value: string; onChange: (cc: string) => void }) {
  const t = useT();
  const locale = useLocale();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(!value);
  const all = useMemo(
    () => Object.keys(COUNTRY_CURRENCY).map((cc) => ({ cc, name: countryName(cc, locale) })).sort((a, b) => a.name.localeCompare(b.name, locale)),
    [locale],
  );
  const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const list = q ? all.filter((c) => norm(c.name).includes(norm(q))) : all;
  if (!open && value)
    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted">{t.country}</span>
        <div className="flex items-center gap-3 rounded-2xl border-2 border-accent bg-surface px-4 py-3">
          <Flag cc={value} size={36} />
          <span className="flex-1 text-lg font-semibold">{countryName(value, locale)}</span>
          <button type="button" onClick={() => setOpen(true)} className="rounded-full bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent-ink">
            {t.change}
          </button>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-muted">{t.country}</span>
      <div className="relative">
        <MagnifyingGlass size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.searchCountry}
          autoFocus
          aria-label={t.searchCountry}
          className="h-12 w-full rounded-2xl border border-line bg-surface pl-11 pr-4 outline-none placeholder:text-muted/70 focus:border-accent"
        />
      </div>
      <div className="no-scrollbar flex max-h-56 flex-col overflow-y-auto rounded-2xl border border-line bg-surface" role="listbox" aria-label={t.country}>
        {list.map((c) => (
          <button
            key={c.cc}
            type="button"
            role="option"
            aria-selected={value === c.cc}
            onClick={() => {
              onChange(c.cc);
              setOpen(false);
              setQ("");
            }}
            className={`flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${value === c.cc ? "bg-accent-soft text-accent-ink" : ""}`}
          >
            <Flag cc={c.cc} size={26} />
            <span className="flex-1">{c.name}</span>
            <span className="text-xs text-muted">{COUNTRY_CURRENCY[c.cc]}</span>
            {value === c.cc && <Check size={18} weight="bold" />}
          </button>
        ))}
      </div>
    </div>
  );
}
