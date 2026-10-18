import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Key } from "@phosphor-icons/react";
import { auth } from "../lib/api";
import { useT } from "../lib/i18n";
import { Button, Field } from "../components/ui";

/** Destino del link del email: better-auth redirige acá con ?token= (o ?error=INVALID_TOKEN). */
export function ResetPassword() {
  const t = useT();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");
  const [pw, setPw] = useState({ a: "", b: "" });
  const [error, setError] = useState(token && !params.get("error") ? "" : t.resetInvalid);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.a !== pw.b) return setError(t.passwordsDontMatch);
    setLoading(true);
    const res = await auth.resetPassword({ newPassword: pw.a, token: token! });
    setLoading(false);
    if (res.error) return setError(res.error.status === 429 ? t.tooManyAttempts : t.resetInvalid);
    nav("/login?reset=ok", { replace: true });
  };

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col gap-6 px-5 pb-10 pt-[max(3rem,env(safe-area-inset-top))]">
      <span className="inline-flex size-16 items-center justify-center rounded-[22px] bg-accent-soft text-accent-ink">
        <Key size={32} weight="duotone" />
      </span>
      <h1 className="text-3xl font-semibold tracking-tight">{t.newPassword}</h1>
      {token && !params.get("error") ? (
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Field label={t.newPassword} type="password" required minLength={8} help={t.passwordHint} value={pw.a} onChange={(e) => setPw({ ...pw, a: e.target.value })} autoComplete="new-password" />
          <Field label={t.repeatPassword} type="password" required minLength={8} value={pw.b} onChange={(e) => setPw({ ...pw, b: e.target.value })} autoComplete="new-password" />
          {error && (
            <p role="alert" className="text-sm text-neg">
              {error}
            </p>
          )}
          <Button type="submit" loading={loading}>
            {t.savePassword}
          </Button>
        </form>
      ) : (
        <>
          <p role="alert" className="text-muted">
            {error}
          </p>
          <Link to="/login" className="font-medium text-accent-ink">
            {t.signIn}
          </Link>
        </>
      )}
    </main>
  );
}
