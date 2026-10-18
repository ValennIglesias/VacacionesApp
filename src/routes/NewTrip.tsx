import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Plus, X, Confetti } from "@phosphor-icons/react";
import { api, auth, useConfig } from "../lib/api";
import { useLocale, useT } from "../lib/i18n";
import { countryName, currencyName, guessHomeCurrency } from "../lib/format";
import { COUNTRY_CURRENCY } from "../../shared/data";
import { Avatar, Button, Field, Flag } from "../components/ui";
import { CountryPicker, CurrencySelect, ShareCode } from "../components/bits";
import { DateRangeField } from "../components/DatePicker";

export function NewTrip() {
  const t = useT();
  const locale = useLocale();
  const nav = useNavigate();
  const qc = useQueryClient();
  const session = auth.useSession();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState({
    name: "",
    countryCode: "",
    city: "",
    startDate: "",
    endDate: "",
    settleCurrency: "", // vacío = sugerida según el país detectado
    members: [session.data?.user.name ?? ""],
  });
  const [draft, setDraft] = useState("");
  const currency = COUNTRY_CURRENCY[form.countryCode];
  const config = useConfig();
  const settleCurrency = form.settleCurrency || guessHomeCurrency(config.data?.country);
  const name = form.name.trim() || (form.countryCode ? `${t.tripTo} ${countryName(form.countryCode, locale)}` : "");

  const create = useMutation({
    mutationFn: () =>
      api<{ id: string; inviteCode: string }>("/trips", {
        body: {
          name,
          countryCode: form.countryCode,
          city: form.city || undefined,
          currency,
          settleCurrency,
          startDate: form.startDate || undefined,
          endDate: form.endDate || undefined,
          members: [...form.members, draft].map((m) => m.trim()).filter(Boolean),
        },
      }),
    onSuccess: ({ id, inviteCode }) => {
      qc.invalidateQueries({ queryKey: ["trips"] });
      setCreated({ id, code: inviteCode });
    },
  });
  const [created, setCreated] = useState<{ id: string; code: string } | null>(null);

  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };
  const addMember = () => {
    const n = draft.trim();
    if (!n) return;
    setForm({ ...form, members: [...form.members, n] });
    setDraft("");
  };

  const canNext = [form.countryCode, true, form.members[0]?.trim()][step];
  const titles = [t.stepDestination, t.stepDates, t.stepMembers];

  if (created)
    return (
      <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col items-center justify-center gap-6 px-5 text-center">
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="inline-flex size-20 items-center justify-center rounded-[28px] bg-accent text-white"
        >
          <Confetti size={42} weight="duotone" />
        </motion.span>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{t.tripReady}</h1>
          <p className="mt-2 text-muted">{t.shareCodeBody}</p>
        </div>
        <ShareCode code={created.code} tripName={name} />
        <Button variant="soft" className="mt-4 w-full" onClick={() => nav(`/t/${created.id}`, { replace: true })}>
          {t.goToTrip}
        </Button>
      </main>
    );

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
      <header className="flex items-center gap-3">
        {step === 0 ? (
          <Link to="/" className="inline-flex size-11 items-center justify-center rounded-full bg-surface" aria-label={t.back}>
            <ArrowLeft size={20} />
          </Link>
        ) : (
          <button onClick={() => go(step - 1)} className="inline-flex size-11 items-center justify-center rounded-full bg-surface" aria-label={t.back}>
            <ArrowLeft size={20} />
          </button>
        )}
        <div className="flex flex-1 gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
              <motion.span className="block h-full rounded-full bg-accent" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} />
            </span>
          ))}
        </div>
      </header>

      <div className="relative mt-8 flex-1">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.section
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <h1 className="text-3xl font-semibold tracking-tight">{titles[step]}</h1>

            {step === 0 && (
              <>
                <CountryPicker value={form.countryCode} onChange={(cc) => setForm({ ...form, countryCode: cc })} />
                {currency && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-2xl bg-accent-soft px-4 py-3 text-accent-ink">
                    <Flag cc={form.countryCode} />
                    <span className="text-sm">
                      {t.localCurrency}: <b>{currency}</b> · {currencyName(currency, locale)}
                    </span>
                  </motion.div>
                )}
                <Field label={t.city} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} maxLength={60} />
                <Field label={t.tripName} placeholder={name || t.tripNamePh} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={60} />
              </>
            )}

            {step === 1 && (
              <>
                <DateRangeField start={form.startDate} end={form.endDate} onChange={(startDate, endDate) => setForm({ ...form, startDate, endDate })} />
                <div className="flex flex-col gap-2">
                  <label htmlFor="settle-cur" className="text-sm font-medium text-muted">
                    {t.settleCurrency}
                  </label>
                  <CurrencySelect id="settle-cur" value={settleCurrency} onChange={(v) => setForm({ ...form, settleCurrency: v })} />
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs text-muted">{t.settleCurrencyHelp}</p>
                    {currency && currency !== settleCurrency && (
                      <button type="button" onClick={() => setForm({ ...form, settleCurrency: currency })} className="shrink-0 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-ink">
                        {t.useLocal} ({currency})
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <ul className="flex flex-col gap-2">
                  <AnimatePresence initial={false}>
                    {form.members.map((m, i) => (
                      <motion.li
                        key={i}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center gap-3 rounded-2xl bg-surface p-2 pr-3"
                      >
                        <Avatar name={m || "?"} color={i} />
                        {i === 0 ? (
                          <input
                            value={m}
                            onChange={(e) => setForm({ ...form, members: [e.target.value, ...form.members.slice(1)] })}
                            className="h-10 flex-1 bg-transparent font-medium outline-none"
                            aria-label={t.name}
                            maxLength={30}
                          />
                        ) : (
                          <span className="flex-1 font-medium">{m}</span>
                        )}
                        {i === 0 ? (
                          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-ink">{t.you}</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setForm({ ...form, members: form.members.filter((_, j) => j !== i) })}
                            className="inline-flex size-9 items-center justify-center rounded-full text-muted"
                            aria-label={`${t.delete} ${m}`}
                          >
                            <X size={18} />
                          </button>
                        )}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addMember();
                  }}
                  className="flex gap-2"
                >
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={t.memberNamePh}
                    aria-label={t.addMember}
                    maxLength={30}
                    className="h-12 flex-1 rounded-2xl border border-line bg-surface px-4 outline-none placeholder:text-muted/70 focus:border-accent"
                  />
                  <Button type="submit" variant="soft" className="px-4" aria-label={t.addMember} disabled={!draft.trim()}>
                    <Plus size={20} weight="bold" />
                  </Button>
                </form>
              </>
            )}
          </motion.section>
        </AnimatePresence>
      </div>

      {create.isError && <p className="mb-3 text-center text-sm text-neg">{t.genericError}</p>}
      <Button className="mt-6 w-full" disabled={!canNext} loading={create.isPending} onClick={() => (step < 2 ? go(step + 1) : create.mutate())}>
        {step < 2 ? t.next : t.create}
      </Button>
    </main>
  );
}
