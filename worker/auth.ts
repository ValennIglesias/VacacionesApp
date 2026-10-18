import { betterAuth } from "better-auth";
import { isSafeAvatar } from "../shared/avatars";

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
    emailAndPassword: { enabled: true, minPasswordLength: 8, password: { hash, verify } },
    databaseHooks: {
      user: { update: { before: async (u) => (u.image != null && !isSafeAvatar(u.image) ? false : undefined) } },
    },
    socialProviders: env.GOOGLE_CLIENT_ID
      ? { google: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET, prompt: "select_account" } }
      : {},
  });
