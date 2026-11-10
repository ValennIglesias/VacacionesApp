import { betterAuth } from "better-auth";
import { anonymous } from "better-auth/plugins/anonymous";
import { isSafeAvatar } from "../shared/avatars";
import { resetPasswordEmail, sendEmail, verifyEmail } from "./email";

const langOf = (request?: Request) => (request?.headers.get("accept-language")?.startsWith("es") ? "es" : "en");

// PBKDF2 nativo (WebCrypto): el scrypt en JS por defecto supera el límite de CPU del plan free de Workers.
const ITER = 100_000;
const b64 = (b: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(b)));
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function derive(password: string, salt: Uint8Array<ArrayBuffer>, iter: number) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  return crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: iter }, key, 256);
}

async function hash(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2$${ITER}$${b64(salt)}$${b64(await derive(password, salt, ITER))}`;
}

async function verify({ hash, password }: { hash: string; password: string }) {
  const [, iter, salt, expected] = hash.split("$");
  const got = new Uint8Array(await derive(password, unb64(salt), Number(iter)));
  const exp = unb64(expected);
  if (got.length !== exp.length) return false;
  let diff = 0;
  for (let i = 0; i < got.length; i++) diff |= got[i] ^ exp[i];
  return diff === 0;
}

export const getAuth = (env: Env) =>
  betterAuth({
    database: env.DB,
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [env.BETTER_AUTH_URL],
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      password: { hash, verify },
      revokeSessionsOnPasswordReset: true,
      // sin confirmar el email no se entra: nadie usa ni recibe avisos en una dirección ajena
      requireEmailVerification: true,
      sendResetPassword: async ({ user, url }, request) => {
        const { subject, html } = resetPasswordEmail(user.name, url, langOf(request));
        await sendEmail(env, user.email, subject, html);
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      sendOnSignIn: true, // cuentas viejas sin confirmar: al intentar entrar les llega el link
      autoSignInAfterVerification: true, // con sesión de invitado en el mismo navegador, sus viajes pasan a la cuenta (onLinkAccount)
      sendVerificationEmail: async ({ user, url }, request) => {
        const { subject, html } = verifyEmail(user.name, url, langOf(request));
        await sendEmail(env, user.email, subject, html);
      },
    },
    // límite de intentos guardado en D1 (la memoria no se comparte entre instancias del Worker)
    rateLimit: {
      enabled: true,
      storage: "database",
      window: 60,
      max: 100,
      customRules: {
        "/sign-in/email": { window: 60, max: 5 },
        "/sign-up/email": { window: 300, max: 5 },
        "/request-password-reset": { window: 300, max: 3 },
        "/reset-password": { window: 300, max: 5 },
        // crear invitados por IP: evita esquivar los límites por usuario creando cuentas nuevas
        "/sign-in/anonymous": { window: 3600, max: 10 },
      },
    },
    advanced: { ipAddress: { ipAddressHeaders: ["cf-connecting-ip"] } },
    plugins: [
      anonymous({
        emailDomainName: "guest.invalid",
        generateName: () => "Invitado", // se reemplaza por el nombre que elige al unirse
        // el invitado guardó su acceso (registro o Google): todo lo suyo pasa a la cuenta nueva antes de borrar la invitada
        onLinkAccount: async ({ anonymousUser, newUser }) => {
          const from = anonymousUser.user.id;
          const to = newUser.user.id;
          const q = (sql: string) => env.DB.prepare(sql).bind(to, from);
          await env.DB.batch([
            // si la cuenta nueva ya estaba en ese viaje, el nombre del invitado queda sin vincular
            env.DB.prepare("UPDATE members SET user_id = ?1 WHERE user_id = ?2 AND trip_id NOT IN (SELECT trip_id FROM members WHERE user_id = ?1)").bind(to, from),
            env.DB.prepare("UPDATE members SET user_id = NULL WHERE user_id = ?").bind(from),
            q("UPDATE trips SET created_by = ? WHERE created_by = ?"),
            q("UPDATE expenses SET created_by = ? WHERE created_by = ?"),
            q("UPDATE expenses SET updated_by = ? WHERE updated_by = ?"),
            q("UPDATE settlements SET created_by = ? WHERE created_by = ?"),
            q("UPDATE join_requests SET user_id = ? WHERE user_id = ?"),
          ]);
        },
      }),
    ],
    databaseHooks: {
      user: { update: { before: async (u) => (u.image != null && !isSafeAvatar(u.image) ? false : undefined) } },
    },
    socialProviders: env.GOOGLE_CLIENT_ID
      ? { google: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET, prompt: "select_account" } }
      : {},
  });
