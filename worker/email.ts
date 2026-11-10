import { BRAND, CONTACT } from "../shared/brand";

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
  return linkEmail(t, url);
}

/** Email para confirmar la dirección al registrarse (o al entrar con una cuenta sin confirmar). */
export function verifyEmail(name: string, url: string, lang: "es" | "en") {
  const t =
    lang === "es"
      ? { subject: `Confirmá tu email en ${BRAND}`, hi: `Hola ${name},`, body: "Tocá el botón para confirmar tu email y entrar a tu cuenta.", cta: "Confirmar email", ignore: "Si no creaste una cuenta, ignorá este email: no vamos a usar esta dirección." }
      : { subject: `Confirm your email on ${BRAND}`, hi: `Hi ${name},`, body: "Tap the button to confirm your email and sign in.", cta: "Confirm email", ignore: "If you didn't create an account, ignore this email: we won't use this address." };
  return linkEmail(t, url);
}

function linkEmail(t: { subject: string; hi: string; body: string; cta: string; ignore: string }, url: string) {
  const html = `<div style="font-family:system-ui,sans-serif;max-width:480px;margin:auto;padding:24px;color:#14161b">
  <p style="font-size:20px;font-weight:600;margin:0 0 16px">${BRAND}</p>
  <p>${esc(t.hi)}</p><p>${t.body}</p>
  <p style="margin:28px 0"><a href="${esc(url)}" style="background:#2f5bff;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600">${t.cta}</a></p>
  <p style="color:#5b6270;font-size:13px">${t.ignore}</p></div>`;
  return { subject: t.subject, html };
}

/** Recordatorio / aviso de borrado de un viaje. Bilingüe: no guardamos el idioma de cada usuario. */
export function retentionEmail(kind: "remind" | "warn" | "warnClosed", tripName: string, deleteAt: number, url: string) {
  const fmt = (lang: string) => new Intl.DateTimeFormat(lang, { dateStyle: "long", timeZone: "UTC" }).format(deleteAt);
  const name = esc(tripName);
  const es = {
    remind: { subject: `¿Terminó "${tripName}"?`, body: `El viaje <b>${name}</b> no tiene movimientos hace un tiempo. Si ya terminó, finalizalo para repartir lo pendiente. Si sigue sin actividad, se borra el ${fmt("es")}.`, cta: "Abrir el viaje" },
    warn: { subject: `"${tripName}" se borra en 7 días`, body: `El viaje <b>${name}</b> sigue sin actividad y se borra el ${fmt("es")}. Si querés conservarlo, cargá un gasto o finalizalo antes de esa fecha.`, cta: "Abrir el viaje" },
    warnClosed: { subject: `"${tripName}" se borra en 7 días`, body: `El viaje finalizado <b>${name}</b> se borra el ${fmt("es")}, como todos los viajes después de un año. Si querés guardar algo, revisalo antes de esa fecha.`, cta: "Ver el resumen" },
  }[kind];
  const en = {
    remind: { body: `The trip <b>${name}</b> hasn't had any activity in a while. If it's over, finish it to split what's pending. If it stays inactive, it will be deleted on ${fmt("en")}.` },
    warn: { body: `The trip <b>${name}</b> is still inactive and will be deleted on ${fmt("en")}. To keep it, add an expense or finish it before then.` },
    warnClosed: { body: `The finished trip <b>${name}</b> will be deleted on ${fmt("en")}, like all trips after a year. If you want to keep anything, check it before then.` },
  }[kind];
  const html = `<div style="font-family:system-ui,sans-serif;max-width:480px;margin:auto;padding:24px;color:#14161b">
  <p style="font-size:20px;font-weight:600;margin:0 0 16px">${BRAND}</p>
  <p>${es.body}</p>
  <p style="margin:28px 0"><a href="${esc(url)}" style="background:#2f5bff;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600">${es.cta}</a></p>
  <hr style="border:none;border-top:1px solid #e1e4ea;margin:24px 0" />
  <p style="color:#5b6270;font-size:14px">${en.body}</p>
  <p style="color:#8a909c;font-size:12px;margin-top:24px">Te llega porque estás en este viaje en ${BRAND}. Es un aviso del servicio, no publicidad. Si no querés recibir más, borrá tu cuenta desde la app o escribinos a ${CONTACT}.<br />You're getting this because you're on this trip in ${BRAND}. It's a service notice, not marketing. To stop them, delete your account in the app or write to ${CONTACT}.</p></div>`;
  return { subject: es.subject, html };
}
