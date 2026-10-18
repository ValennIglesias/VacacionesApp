import { BRAND } from "../shared/brand";

/** Envía un email con Resend. Sin RESEND_API_KEY (desarrollo) lo imprime en la consola del Worker. */
export async function sendEmail(env: Env, to: string, subject: string, html: string) {
  if (!env.RESEND_API_KEY) {
    console.log(`[email a ${to}] ${subject}\n${html}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({ from: env.EMAIL_FROM || `${BRAND} <onboarding@resend.dev>`, to, subject, html }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Email de recuperar contraseña, en el idioma del navegador que lo pidió. */
export function resetPasswordEmail(name: string, url: string, lang: "es" | "en") {
  const t =
    lang === "es"
      ? { subject: `Restablecé tu contraseña de ${BRAND}`, hi: `Hola ${name},`, body: "Recibimos un pedido para cambiar tu contraseña. El link vence en 1 hora.", cta: "Elegir nueva contraseña", ignore: "Si no fuiste vos, ignorá este email: tu contraseña no cambia." }
      : { subject: `Reset your ${BRAND} password`, hi: `Hi ${name},`, body: "We got a request to change your password. The link expires in 1 hour.", cta: "Choose a new password", ignore: "If this wasn't you, ignore this email: your password stays the same." };
  const html = `<div style="font-family:system-ui,sans-serif;max-width:480px;margin:auto;padding:24px;color:#14161b">
  <p style="font-size:20px;font-weight:600;margin:0 0 16px">${BRAND}</p>
  <p>${esc(t.hi)}</p><p>${t.body}</p>
  <p style="margin:28px 0"><a href="${esc(url)}" style="background:#2f5bff;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600">${t.cta}</a></p>
  <p style="color:#5b6270;font-size:13px">${t.ignore}</p></div>`;
  return { subject: t.subject, html };
}
