import { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { GoogleLogo, Lightning } from "@phosphor-icons/react";
import { auth, useConfig, useIsGuest } from "../lib/api";
import { GUEST_TRIP_LIMIT } from "../../shared/data";
import { useT } from "../lib/i18n";
import { Button, Field } from "../components/ui";

export function Login() {
  const t = useT();
  const [params] = useSearchParams();
  const next = params.get("next") || "/";
  const session = auth.useSession();
  const config = useConfig();
  // invitado: crea su cuenta (o entra a una existente) y todo lo suyo pasa a esa cuenta
  const isGuest = useIsGuest();
  const [mode, setMode] = useState<"in" | "up" | "forgot">(isGuest ? "up" : "in");
  const [notice, setNotice] = useState(params.get("reset") === "ok" ? t.passwordChanged : "");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // después de todos los hooks: si no, al iniciar sesión se renderizan menos hooks y React rompe (#300)
  if (session.data && !isGuest) return <Navigate to={next} replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);
    const res =
      mode === "forgot"
        ? await auth.requestPasswordReset({ email: form.email, redirectTo: "/app/reset" })
        : mode === "in"
          ? await auth.signIn.email({ email: form.email, password: form.password })
          : await auth.signUp.email({ email: form.email, password: form.password, name: form.name || (isGuest ? session.data!.user.name : form.email.split("@")[0]) });
    setLoading(false);
    if (res.error) setError(res.error.status === 429 ? t.tooManyAttempts : t.authError);
    // mismo mensaje exista o no la cuenta, para no revelar qué emails están registrados
    else if (mode === "forgot") setNotice(t.resetSent);
  };

  const google = () => auth.signIn.social({ provider: "google", callbackURL: `/app${next}` });
  // sin cuenta: entra como invitado (límite de viajes propios) y va directo a armar el viaje
  const guest = async () => {
    setError("");
    setLoading(true);
    const res = await auth.signIn.anonymous();
    if (res.error) {
      setLoading(false);
      return setError(res.error.status === 429 ? t.tooManyAttempts : t.genericError);
    }
    // esperar la sesión nueva: si no, RequireAuth todavía no la ve y rebota al login
    await session.refetch();
    setLoading(false);
    nav(next === "/" ? "/new" : next, { replace: true });
  };

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col px-5 pb-10 pt-[max(3rem,env(safe-area-inset-top))]">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        <img src="/favicon.svg" alt="" width="64" height="64" className="size-16 rounded-[22px] shadow-[0_12px_32px_-12px_rgba(47,91,255,0.8)]" />
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">{isGuest ? t.saveAccessTitle : t.appName}</h1>
        <p className="mt-2 text-lg text-muted">{isGuest ? (params.get("reason") === "limit" ? t.guestLimitBody.replace("{n}", String(GUEST_TRIP_LIMIT)) : t.saveAccessBody) : t.tagline}</p>
      </motion.div>

      <motion.div
        className="mt-10 flex flex-col gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        {config.data?.google && (
          <>
            <Button variant="ghost" onClick={google} className="bg-surface">
              <GoogleLogo size={20} weight="bold" /> {t.signInGoogle}
            </Button>
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="h-px flex-1 bg-line" /> {t.or} <span className="h-px flex-1 bg-line" />
            </div>
          </>
        )}
        <form onSubmit={submit} className="flex flex-col gap-4">
          {mode === "up" && <Field label={t.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />}
          <Field label={t.email} type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
          {mode !== "forgot" && (
            <Field
              label={t.password}
              type="password"
              required
              minLength={8}
              help={mode === "up" ? t.passwordHint : undefined}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete={mode === "in" ? "current-password" : "new-password"}
            />
          )}
          {mode === "in" && (
            <button type="button" className="-mt-2 self-end text-sm font-medium text-accent-ink" onClick={() => (setMode("forgot"), setError(""))}>
              {t.forgotPassword}
            </button>
          )}
          {notice && (
            <p role="status" className="rounded-2xl bg-accent-soft p-3 text-sm text-accent-ink">
              {notice}
            </p>
          )}
          {error && (
            <p role="alert" className="text-sm text-neg">
              {error}
            </p>
          )}
          <Button type="submit" loading={loading}>
            {mode === "forgot" ? t.sendResetLink : mode === "in" ? t.signIn : t.signUp}
          </Button>
        </form>
        <button type="button" className="py-2 text-sm font-medium text-accent-ink" onClick={() => (setMode(mode === "in" ? "up" : "in"), setError(""), setNotice(""))}>
          {mode === "in" ? t.noAccount : t.haveAccount}
        </button>
        {!session.data && (
          <div className="mt-2 flex flex-col items-center gap-2 border-t border-line pt-6">
            <Button variant="ghost" className="w-full bg-surface" loading={loading} onClick={guest}>
              <Lightning size={20} weight="duotone" /> {t.guestStart}
            </Button>
            <p className="text-center text-xs text-muted">{t.guestStartHelp}</p>
          </div>
        )}
      </motion.div>
    </main>
  );
}
