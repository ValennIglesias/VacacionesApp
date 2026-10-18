import { Hono, type Context } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { drizzle } from "drizzle-orm/d1";
import { and, asc, eq, inArray, isNotNull, isNull, ne } from "drizzle-orm";
import type { BatchItem } from "drizzle-orm/batch";
import { z } from "zod";
import { getAuth } from "./auth";
import * as s from "./db/schema";
import { CATEGORIES, COUNTRY_CURRENCY, CURRENCIES, MEMBER_COLORS } from "../shared/data";
import { computeBalances, convertCents, minTransfers, splitEqual } from "../shared/settle";
import { BRAND } from "../shared/brand";

type AppEnv = { Bindings: Env; Variables: { userId: string; userName: string } };
const app = new Hono<AppEnv>();
const db = (c: Context<AppEnv>) => drizzle(c.env.DB, { schema: s });
const now = () => Date.now();
const uid = () => crypto.randomUUID();
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const newCode = () => [...crypto.getRandomValues(new Uint8Array(6))].map((b) => CODE_CHARS[b % CODE_CHARS.length]).join("");
const chunk = <T,>(a: T[], n: number) => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));

class HttpError extends Error {
  constructor(public status: 400 | 403 | 404 | 409, msg: string) {
    super(msg);
  }
}
app.onError((err, c) => {
  if (err instanceof HttpError) return c.json({ error: err.message }, err.status);
  if (err instanceof z.ZodError) return c.json({ error: "invalid_input", issues: err.issues }, 400);
  console.error(err);
  return c.json({ error: "server_error" }, 500);
});

app.use("/api/*", secureHeaders());

// --- auth ---
app.on(["GET", "POST"], "/api/auth/*", (c) => getAuth(c.env).handler(c.req.raw));
// country: país del visitante según Cloudflare, para sugerir su moneda
app.get("/api/config", (c) => c.json({ google: !!c.env.GOOGLE_CLIENT_ID, country: (c.req.raw.cf?.country as string | undefined) ?? null }));

// Todo lo demás bajo /api requiere sesión
app.use("/api/*", async (c, next) => {
  const session = await getAuth(c.env).api.getSession({ headers: c.req.raw.headers });
  if (!session) return c.json({ error: "unauthorized" }, 401);
  c.set("userId", session.user.id);
  c.set("userName", session.user.name);
  await next();
});

// límites por usuario: unirse con código (contra adivinar códigos) y cualquier escritura (contra spam)
app.use("/api/*", async (c, next) => {
  const limiter = c.req.path.startsWith("/api/join/") ? c.env.JOIN_LIMITER : c.req.method !== "GET" ? c.env.WRITE_LIMITER : null;
  if (limiter && !(await limiter.limit({ key: c.get("userId") })).success) return c.json({ error: "too_many_requests" }, 429);
  await next();
});

const MAX_MEMBERS = 50;

async function requireMember(c: Context<AppEnv>, tripId: string) {
  const m = await db(c).query.members.findFirst({ where: and(eq(s.members.tripId, tripId), eq(s.members.userId, c.get("userId"))) });
  if (!m) throw new HttpError(404, "trip_not_found");
  const trip = await db(c).query.trips.findFirst({ where: eq(s.trips.id, tripId) });
  if (!trip) throw new HttpError(404, "trip_not_found");
  return { me: m, trip };
}

/** Agrega la foto/avatar de la cuenta vinculada a cada integrante. */
async function withImages<T extends { userId: string | null }>(c: Context<AppEnv>, list: T[]) {
  const ids = [...new Set(list.map((m) => m.userId).filter((x): x is string => !!x))];
  const users = ids.length ? await db(c).select({ id: s.user.id, image: s.user.image }).from(s.user).where(inArray(s.user.id, ids)) : [];
  return list.map((m) => ({ ...m, image: users.find((u) => u.id === m.userId)?.image ?? null }));
}

/** El usuario puede actuar por un integrante si es él mismo o si nadie lo reclamó. */
const canActFor = (member: { userId: string | null }, userId: string) => member.userId === null || member.userId === userId;

// --- viajes ---
app.get("/api/trips", async (c) => {
  const mine = await db(c).query.members.findMany({ where: eq(s.members.userId, c.get("userId")) });
  if (!mine.length) return c.json([]);
  const trips = await db(c).query.trips.findMany({ where: inArray(s.trips.id, mine.map((m) => m.tripId)) });
  return c.json(trips.sort((a, b) => b.createdAt - a.createdAt));
});

const tripInput = z.object({
  name: z.string().trim().min(1).max(60),
  countryCode: z.string().length(2).refine((cc) => cc in COUNTRY_CURRENCY),
  city: z.string().trim().max(60).optional(),
  currency: z.string().refine((x) => CURRENCIES.includes(x)),
  settleCurrency: z.string().refine((x) => CURRENCIES.includes(x)),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  members: z.array(z.string().trim().min(1).max(30)).min(1).max(30), // members[0] = yo
});

app.post("/api/trips", async (c) => {
  const body = tripInput.parse(await c.req.json());
  const tripId = uid();
  const inviteCode = newCode();
  const t = now();
  const d = db(c);
  await d.batch([
    d.insert(s.trips).values({ id: tripId, ...body, city: body.city || null, inviteCode, createdBy: c.get("userId"), createdAt: t }),
    d.insert(s.members).values(
      body.members.map((name, i) => ({
        id: uid(),
        tripId,
        name,
        userId: i === 0 ? c.get("userId") : null,
        color: i % MEMBER_COLORS,
        createdAt: t + i,
      })),
    ),
  ]);
  return c.json({ id: tripId, inviteCode }, 201);
});

app.get("/api/trips/:id", async (c) => {
  const { me, trip } = await requireMember(c, c.req.param("id"));
  const d = db(c);
  const [members, expenses, settlements] = await Promise.all([
    d.query.members.findMany({ where: eq(s.members.tripId, trip.id), orderBy: asc(s.members.createdAt) }),
    d.query.expenses.findMany({ where: eq(s.expenses.tripId, trip.id), orderBy: [asc(s.expenses.date), asc(s.expenses.createdAt)] }),
    d.query.settlements.findMany({ where: eq(s.settlements.tripId, trip.id), orderBy: asc(s.settlements.createdAt) }),
  ]);
  const shares = expenses.length
    ? (await Promise.all(chunk(expenses.map((e) => e.id), 90).map((ids) => d.select().from(s.expenseShares).where(inArray(s.expenseShares.expenseId, ids))))).flat()
    : [];
  const transfers = settlements.length
    ? await d.select().from(s.transfers).where(inArray(s.transfers.settlementId, settlements.map((x) => x.id)))
    : [];
  return c.json({
    trip,
    meId: me.id,
    members: await withImages(c, members),
    expenses: expenses.map((e) => ({ ...e, shares: shares.filter((x) => x.expenseId === e.id) })),
    settlements: settlements.map((x) => ({ ...x, transfers: transfers.filter((t) => t.settlementId === x.id) })),
  });
});

app.patch("/api/trips/:id", async (c) => {
  const { trip } = await requireMember(c, c.req.param("id"));
  const body = tripInput.pick({ name: true, city: true, settleCurrency: true }).partial().parse(await c.req.json());
  await db(c).update(s.trips).set(body).where(eq(s.trips.id, trip.id));
  return c.json({ ok: true });
});

/** Sentencias para borrar un viaje entero, hijos primero (las FKs a integrantes no tienen cascade). */
function deleteTripStatements(c: Context<AppEnv>, tripId: string) {
  const d = db(c);
  const settlementIds = d.select({ id: s.settlements.id }).from(s.settlements).where(eq(s.settlements.tripId, tripId));
  const expenseIds = d.select({ id: s.expenses.id }).from(s.expenses).where(eq(s.expenses.tripId, tripId));
  return [
    d.delete(s.transfers).where(inArray(s.transfers.settlementId, settlementIds)),
    d.delete(s.expenseShares).where(inArray(s.expenseShares.expenseId, expenseIds)),
    d.delete(s.expenses).where(eq(s.expenses.tripId, tripId)),
    d.delete(s.settlements).where(eq(s.settlements.tripId, tripId)),
    d.delete(s.members).where(eq(s.members.tripId, tripId)),
    d.delete(s.trips).where(eq(s.trips.id, tripId)),
  ] as const;
}

// borrar viaje: solo quien lo creó (se borra para todos)
app.delete("/api/trips/:id", async (c) => {
  const { trip } = await requireMember(c, c.req.param("id"));
  if (trip.createdBy !== c.get("userId")) throw new HttpError(403, "only_owner");
  await db(c).batch(deleteTripStatements(c, trip.id));
  return c.json({ ok: true });
});

// salir del viaje: el nombre queda (con sus gastos), desvinculado de la cuenta
app.post("/api/trips/:id/leave", async (c) => {
  const { trip, me } = await requireMember(c, c.req.param("id"));
  if (trip.createdBy === c.get("userId")) throw new HttpError(409, "owner_cannot_leave");
  await db(c).update(s.members).set({ userId: null, alias: null }).where(eq(s.members.id, me.id));
  return c.json({ ok: true });
});

// --- integrantes ---
app.post("/api/trips/:id/members", async (c) => {
  const { trip } = await requireMember(c, c.req.param("id"));
  const { name } = z.object({ name: z.string().trim().min(1).max(30) }).parse(await c.req.json());
  const count = (await db(c).query.members.findMany({ where: eq(s.members.tripId, trip.id) })).length;
  if (count >= MAX_MEMBERS) throw new HttpError(409, "trip_full");
  await db(c).insert(s.members).values({ id: uid(), tripId: trip.id, name, color: count % MEMBER_COLORS, createdAt: now() });
  return c.json({ ok: true }, 201);
});

app.patch("/api/trips/:id/members/:mid", async (c) => {
  const { trip } = await requireMember(c, c.req.param("id"));
  const body = z
    .object({ name: z.string().trim().min(1).max(30).optional(), alias: z.string().trim().max(80).nullable().optional() })
    .parse(await c.req.json());
  const m = await db(c).query.members.findFirst({ where: and(eq(s.members.id, c.req.param("mid")), eq(s.members.tripId, trip.id)) });
  if (!m) throw new HttpError(404, "member_not_found");
  if (!canActFor(m, c.get("userId"))) throw new HttpError(403, "not_your_member");
  // el alias de cobro lo carga solo su dueño, para evitar errores al transferir
  if (body.alias !== undefined && m.userId !== c.get("userId")) throw new HttpError(403, "only_owner_alias");
  await db(c).update(s.members).set(body).where(eq(s.members.id, m.id));
  return c.json({ ok: true });
});

// quitar integrante: solo si no tiene gastos ni pagos; a alguien vinculado solo lo quita quien creó el viaje
app.delete("/api/trips/:id/members/:mid", async (c) => {
  const { trip, me } = await requireMember(c, c.req.param("id"));
  const d = db(c);
  const m = await d.query.members.findFirst({ where: and(eq(s.members.id, c.req.param("mid")), eq(s.members.tripId, trip.id)) });
  if (!m) throw new HttpError(404, "member_not_found");
  if (m.id === me.id) throw new HttpError(409, "use_leave");
  if (m.userId && trip.createdBy !== c.get("userId")) throw new HttpError(403, "only_owner");
  const [paid, share, sent, received] = await Promise.all([
    d.query.expenses.findFirst({ where: eq(s.expenses.paidBy, m.id) }),
    d.query.expenseShares.findFirst({ where: eq(s.expenseShares.memberId, m.id) }),
    d.query.transfers.findFirst({ where: eq(s.transfers.fromMember, m.id) }),
    d.query.transfers.findFirst({ where: eq(s.transfers.toMember, m.id) }),
  ]);
  if (paid || share || sent || received) throw new HttpError(409, "member_has_movements");
  await d.delete(s.members).where(eq(s.members.id, m.id));
  return c.json({ ok: true });
});

// --- unirse con código ---
const findByCode = async (c: Context<AppEnv>) => {
  const trip = await db(c).query.trips.findFirst({ where: eq(s.trips.inviteCode, c.req.param("code")!.toUpperCase()) });
  if (!trip) throw new HttpError(404, "invalid_code");
  return trip;
};

app.get("/api/join/:code", async (c) => {
  const trip = await findByCode(c);
  const members = await db(c).query.members.findMany({ where: eq(s.members.tripId, trip.id), orderBy: asc(s.members.createdAt) });
  return c.json({
    trip: { id: trip.id, name: trip.name, countryCode: trip.countryCode, city: trip.city, status: trip.status },
    members: (await withImages(c, members)).map((m) => ({ id: m.id, name: m.name, color: m.color, image: m.image, claimed: m.userId !== null })),
    alreadyMember: members.some((m) => m.userId === c.get("userId")),
  });
});

app.post("/api/join/:code", async (c) => {
  const trip = await findByCode(c);
  const body = z.object({ memberId: z.string().optional(), name: z.string().trim().min(1).max(30).optional() }).parse(await c.req.json());
  const d = db(c);
  const members = await d.query.members.findMany({ where: eq(s.members.tripId, trip.id) });
  if (members.some((m) => m.userId === c.get("userId"))) return c.json({ id: trip.id });
  if (body.memberId) {
    const res = await d
      .update(s.members)
      .set({ userId: c.get("userId") })
      .where(and(eq(s.members.id, body.memberId), eq(s.members.tripId, trip.id), isNull(s.members.userId)));
    if (!res.meta.changes) throw new HttpError(409, "member_taken");
  } else {
    if (members.length >= MAX_MEMBERS) throw new HttpError(409, "trip_full");
    await d.insert(s.members).values({
      id: uid(),
      tripId: trip.id,
      name: body.name ?? c.get("userName"),
      userId: c.get("userId"),
      color: members.length % MEMBER_COLORS,
      createdAt: now(),
    });
  }
  return c.json({ id: trip.id });
});

// --- gastos ---
const expenseInput = z.object({
  paidBy: z.string(),
  description: z.string().trim().min(1).max(80),
  category: z.enum(CATEGORIES),
  date: z.iso.date(),
  amountCents: z.number().int().positive().max(1e12),
  currency: z.string().refine((x) => CURRENCIES.includes(x)),
  rate: z.number().positive().max(1e7),
  participants: z.array(z.string()).min(1),
});

async function buildExpense(c: Context<AppEnv>, tripId: string, currency: string, raw: unknown) {
  const body = expenseInput.parse(raw);
  const members = await db(c).query.members.findMany({ where: eq(s.members.tripId, tripId), orderBy: asc(s.members.createdAt) });
  const ids = new Set(members.map((m) => m.id));
  if (!ids.has(body.paidBy) || !body.participants.every((p) => ids.has(p))) throw new HttpError(400, "invalid_member");
  const rate = body.currency === currency ? 1 : body.rate;
  const amountTripCents = Math.round(body.amountCents * rate);
  if (amountTripCents <= 0) throw new HttpError(400, "invalid_amount");
  const ordered = members.map((m) => m.id).filter((id) => body.participants.includes(id));
  const shares = [...splitEqual(amountTripCents, ordered)].map(([memberId, shareCents]) => ({ memberId, shareCents }));
  const { participants: _, ...fields } = body;
  return { fields: { ...fields, rate, amountTripCents }, shares };
}

app.post("/api/trips/:id/expenses", async (c) => {
  const { trip } = await requireMember(c, c.req.param("id"));
  if (trip.status !== "active") throw new HttpError(409, "trip_closed");
  const { fields, shares } = await buildExpense(c, trip.id, trip.currency, await c.req.json());
  const id = uid();
  const d = db(c);
  await d.batch([
    d.insert(s.expenses).values({ id, tripId: trip.id, ...fields, createdBy: c.get("userId"), createdAt: now(), updatedAt: now() }),
    d.insert(s.expenseShares).values(shares.map((x) => ({ ...x, expenseId: id }))),
  ]);
  return c.json({ id }, 201);
});

async function editableExpense(c: Context<AppEnv>, tripId: string) {
  const e = await db(c).query.expenses.findFirst({ where: and(eq(s.expenses.id, c.req.param("eid")!), eq(s.expenses.tripId, tripId)) });
  if (!e) throw new HttpError(404, "expense_not_found");
  if (e.settlementId) throw new HttpError(409, "expense_settled");
  return e;
}

app.put("/api/trips/:id/expenses/:eid", async (c) => {
  const { trip } = await requireMember(c, c.req.param("id"));
  const e = await editableExpense(c, trip.id);
  const { fields, shares } = await buildExpense(c, trip.id, trip.currency, await c.req.json());
  const d = db(c);
  await d.batch([
    d.update(s.expenses).set({ ...fields, updatedBy: c.get("userId"), updatedAt: now() }).where(and(eq(s.expenses.id, e.id), isNull(s.expenses.settlementId))),
    d.delete(s.expenseShares).where(eq(s.expenseShares.expenseId, e.id)),
    d.insert(s.expenseShares).values(shares.map((x) => ({ ...x, expenseId: e.id }))),
  ]);
  return c.json({ ok: true });
});

app.delete("/api/trips/:id/expenses/:eid", async (c) => {
  const { trip } = await requireMember(c, c.req.param("id"));
  const e = await editableExpense(c, trip.id);
  const d = db(c);
  await d.batch([d.delete(s.expenseShares).where(eq(s.expenseShares.expenseId, e.id)), d.delete(s.expenses).where(eq(s.expenses.id, e.id))]);
  return c.json({ ok: true });
});

// --- repartidas ---
app.post("/api/trips/:id/settle", async (c) => {
  const { trip } = await requireMember(c, c.req.param("id"));
  if (trip.status !== "active") throw new HttpError(409, "trip_closed");
  const body = z
    .object({ kind: z.enum(["partial", "final"]), currency: z.string().refine((x) => CURRENCIES.includes(x)), rate: z.number().positive().max(1e7) })
    .parse(await c.req.json());
  const rate = body.currency === trip.currency ? 1 : body.rate;
  const d = db(c);
  const pending = await d.query.expenses.findMany({ where: and(eq(s.expenses.tripId, trip.id), isNull(s.expenses.settlementId)) });
  if (!pending.length && body.kind === "partial") throw new HttpError(400, "nothing_to_settle");

  const members = await d.query.members.findMany({ where: eq(s.members.tripId, trip.id) });
  const ids = pending.map((e) => e.id);
  const shares = ids.length ? (await Promise.all(chunk(ids, 90).map((g) => d.select().from(s.expenseShares).where(inArray(s.expenseShares.expenseId, g))))).flat() : [];
  const balances = computeBalances(
    members.map((m) => m.id),
    pending.map((e) => ({ paidBy: e.paidBy, amountTripCents: e.amountTripCents, shares: shares.filter((x) => x.expenseId === e.id) })),
  );
  const transfers = minTransfers(balances)
    .map((t) => ({ ...t, amount: convertCents(t.cents, rate, body.currency) }))
    .filter((t) => t.amount > 0);

  const settlementId = uid();
  const stmts = [
    d.insert(s.settlements).values({ id: settlementId, tripId: trip.id, kind: body.kind, currency: body.currency, rate, createdBy: c.get("userId"), createdAt: now() }),
    ...chunk(ids, 90).map((g) =>
      d.update(s.expenses).set({ settlementId }).where(and(inArray(s.expenses.id, g), isNull(s.expenses.settlementId))),
    ),
  ];
  if (transfers.length)
    stmts.push(
      d.insert(s.transfers).values(
        transfers.map((t) => ({ id: uid(), settlementId, fromMember: t.from, toMember: t.to, amountCents: t.amount, localCents: t.cents })),
      ) as never,
    );
  if (body.kind === "final") stmts.push(d.update(s.trips).set({ status: "closed" }).where(eq(s.trips.id, trip.id)) as never);
  await d.batch(stmts as [ (typeof stmts)[number], ...(typeof stmts)[number][] ]);
  return c.json({ id: settlementId }, 201);
});

async function loadTransfer(c: Context<AppEnv>, tripId: string) {
  const d = db(c);
  const t = await d.query.transfers.findFirst({ where: eq(s.transfers.id, c.req.param("tid")!) });
  const st = t && (await d.query.settlements.findFirst({ where: eq(s.settlements.id, t.settlementId) }));
  if (!t || !st || st.tripId !== tripId) throw new HttpError(404, "transfer_not_found");
  const [from, to] = await Promise.all([
    d.query.members.findFirst({ where: eq(s.members.id, t.fromMember) }),
    d.query.members.findFirst({ where: eq(s.members.id, t.toMember) }),
  ]);
  return { t, from: from!, to: to! };
}

app.post("/api/trips/:id/transfers/:tid/paid", async (c) => {
  const { trip } = await requireMember(c, c.req.param("id"));
  const { t, from } = await loadTransfer(c, trip.id);
  // cada uno marca solo sus propios pagos (nadie actúa por otro, aunque no tenga cuenta)
  if (from.userId !== c.get("userId")) throw new HttpError(403, "only_debtor");
  if (t.status === "pending") await db(c).update(s.transfers).set({ status: "paid", paidAt: now() }).where(eq(s.transfers.id, t.id));
  return c.json({ ok: true });
});

app.post("/api/trips/:id/transfers/:tid/confirm", async (c) => {
  const { trip } = await requireMember(c, c.req.param("id"));
  const { t, from, to } = await loadTransfer(c, trip.id);
  // solo quien recibe confirma la recepción
  if (to.userId !== c.get("userId")) throw new HttpError(403, "only_creditor");
  if (t.status !== "confirmed")
    await db(c).update(s.transfers).set({ status: "confirmed", paidAt: t.paidAt ?? now(), confirmedAt: now() }).where(eq(s.transfers.id, t.id));
  return c.json({ ok: true });
});

// --- borrar cuenta ---
// Se anonimiza el usuario en vez de borrar la fila: los gastos que cargó siguen apuntando a él y el resto del grupo no pierde historia.
app.delete("/api/account", async (c) => {
  const userId = c.get("userId");
  const d = db(c);
  const owned = await d.query.trips.findMany({ where: eq(s.trips.createdBy, userId) });
  const stmts: BatchItem<"sqlite">[] = [];
  for (const trip of owned) {
    const heir = await d.query.members.findFirst({ where: and(eq(s.members.tripId, trip.id), isNotNull(s.members.userId), ne(s.members.userId, userId)) });
    // el viaje pasa a otro integrante con cuenta; si no queda nadie, se borra
    if (heir) stmts.push(d.update(s.trips).set({ createdBy: heir.userId! }).where(eq(s.trips.id, trip.id)));
    else stmts.push(...deleteTripStatements(c, trip.id));
  }
  stmts.push(
    d.update(s.members).set({ userId: null, alias: null }).where(eq(s.members.userId, userId)),
    d.delete(s.session).where(eq(s.session.userId, userId)),
    d.delete(s.account).where(eq(s.account.userId, userId)),
    d
      .update(s.user)
      .set({ name: "—", email: `deleted-${userId}@deleted.invalid`, image: null, emailVerified: 0, updatedAt: new Date().toISOString() })
      .where(eq(s.user.id, userId)),
  );
  await d.batch(stmts as [BatchItem<"sqlite">, ...BatchItem<"sqlite">[]]);
  return c.json({ ok: true });
});

// --- cotizaciones (base USD, cache diario en D1) ---
app.get("/api/rates", async (c) => {
  const day = new Date().toISOString().slice(0, 10);
  const d = db(c);
  const cached = await d.query.rates.findFirst({ where: eq(s.rates.base, "USD") });
  if (cached?.day === day) return c.json(JSON.parse(cached.json));
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  const data = (await res.json()) as { result: string; rates: Record<string, number> };
  if (data.result !== "success") {
    if (cached) return c.json(JSON.parse(cached.json)); // mejor una cotización de ayer que nada
    return c.json({ error: "rates_unavailable" }, 502);
  }
  const json = JSON.stringify(data.rates);
  await d.insert(s.rates).values({ base: "USD", day, json }).onConflictDoUpdate({ target: s.rates.base, set: { day, json } });
  return c.json(data.rates);
});

// --- dólares de Argentina (DolarAPI), cache por hora: ARS por USD, valor de venta ---
const ARS_TYPES = ["oficial", "bolsa", "blue", "tarjeta"] as const;
app.get("/api/rates/ars", async (c) => {
  const hour = new Date().toISOString().slice(0, 13);
  const d = db(c);
  const cached = await d.query.rates.findFirst({ where: eq(s.rates.base, "ARS_USD") });
  if (cached?.day === hour) return c.json(JSON.parse(cached.json));
  try {
    const list = (await (await fetch("https://dolarapi.com/v1/dolares")).json()) as { casa: string; venta: number; fechaActualizacion: string }[];
    const out = Object.fromEntries(
      ARS_TYPES.map((k) => list.find((x) => x.casa === k)).filter(Boolean).map((x) => [x!.casa, { venta: x!.venta, updated: x!.fechaActualizacion }]),
    );
    if (!Object.keys(out).length) throw new Error("empty");
    const json = JSON.stringify(out);
    await d.insert(s.rates).values({ base: "ARS_USD", day: hour, json }).onConflictDoUpdate({ target: s.rates.base, set: { day: hour, json } });
    return c.json(out);
  } catch {
    if (cached) return c.json(JSON.parse(cached.json));
    return c.json({ error: "rates_unavailable" }, 502);
  }
});

app.all("/api/*", (c) => c.json({ error: "not_found" }, 404));

// --- SPA: cualquier /app/* devuelve el shell de la app ---
app.get("/app/*", async (c) => {
  const shell = await c.env.ASSETS.fetch(new URL("/app/", c.req.url));
  // link de invitación: la vista previa al compartir muestra el nombre del viaje
  const code = c.req.path.match(/^\/app\/join\/([A-Za-z0-9]{6})$/)?.[1]?.toUpperCase();
  const trip = code && (await db(c).query.trips.findFirst({ where: eq(s.trips.inviteCode, code) }));
  if (!trip) return shell;
  const es = c.req.header("accept-language")?.startsWith("es") ?? true;
  const title = es ? `Sumate a "${trip.name}" en ${BRAND}` : `Join "${trip.name}" on ${BRAND}`;
  const desc = es ? "Te invitaron a repartir los gastos del viaje. Tocá para unirte." : "You've been invited to split the trip expenses. Tap to join.";
  const origin = new URL(c.req.url).origin;
  const set = (content: string) => ({ element: (e: Element) => void e.setAttribute("content", content) });
  return new HTMLRewriter()
    .on("title", { element: (e) => void e.setInnerContent(title) })
    .on('meta[property="og:title"]', set(title))
    .on('meta[property="og:description"]', set(desc))
    .on('meta[name="description"]', set(desc))
    .on('meta[property="og:image"]', set(`${origin}/og.png`))
    .transform(shell);
});
app.get("/app", (c) => c.env.ASSETS.fetch(new URL("/app/", c.req.url)));

export default app;
