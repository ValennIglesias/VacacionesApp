import { sqliteTable, text, integer, real, primaryKey, uniqueIndex, index } from "drizzle-orm/sqlite-core";

// --- better-auth (nombres de columna por defecto de better-auth) ---
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified").notNull().default(0),
  image: text("image"),
  createdAt: text("createdAt").notNull(),
  updatedAt: text("updatedAt").notNull(),
  // cuenta invitada (se unió con código sin registrarse); plugin anonymous de better-auth
  isAnonymous: integer("isAnonymous").default(0),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: text("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: text("createdAt").notNull(),
  updatedAt: text("updatedAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: text("accessTokenExpiresAt"),
  refreshTokenExpiresAt: text("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: text("createdAt").notNull(),
  updatedAt: text("updatedAt").notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: text("expiresAt").notNull(),
  createdAt: text("createdAt"),
  updatedAt: text("updatedAt"),
});

// límite de intentos de better-auth (storage: "database")
export const rateLimit = sqliteTable("rateLimit", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  count: integer("count").notNull(),
  lastRequest: integer("lastRequest").notNull(),
});

// --- app ---
export const trips = sqliteTable("trips", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  countryCode: text("country_code").notNull(),
  city: text("city"),
  currency: text("currency").notNull(),
  settleCurrency: text("settle_currency").notNull(),
  inviteCode: text("invite_code").notNull().unique(),
  startDate: text("start_date"),
  endDate: text("end_date"),
  status: text("status", { enum: ["active", "closed"] }).notNull().default("active"),
  createdBy: text("created_by").notNull().references(() => user.id),
  createdAt: integer("created_at").notNull(),
});

export const members = sqliteTable(
  "members",
  {
    id: text("id").primaryKey(),
    tripId: text("trip_id").notNull().references(() => trips.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    userId: text("user_id").references(() => user.id),
    alias: text("alias"),
    color: integer("color").notNull().default(0),
    createdAt: integer("created_at").notNull(),
  },
  (t) => [uniqueIndex("members_trip_user").on(t.tripId, t.userId), index("members_user").on(t.userId)],
);

export const expenses = sqliteTable(
  "expenses",
  {
    id: text("id").primaryKey(),
    tripId: text("trip_id").notNull().references(() => trips.id, { onDelete: "cascade" }),
    paidBy: text("paid_by").notNull().references(() => members.id),
    description: text("description").notNull(),
    category: text("category").notNull(),
    date: text("date").notNull(), // YYYY-MM-DD
    amountCents: integer("amount_cents").notNull(), // en `currency`, siempre x100
    currency: text("currency").notNull(),
    rate: real("rate").notNull(), // currency -> moneda del viaje, congelada al cargar
    amountTripCents: integer("amount_trip_cents").notNull(),
    settlementId: text("settlement_id").references(() => settlements.id),
    createdBy: text("created_by").notNull().references(() => user.id),
    updatedBy: text("updated_by").references(() => user.id),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
  },
  (t) => [index("expenses_trip").on(t.tripId)],
);

export const expenseShares = sqliteTable(
  "expense_shares",
  {
    expenseId: text("expense_id").notNull().references(() => expenses.id, { onDelete: "cascade" }),
    memberId: text("member_id").notNull().references(() => members.id),
    shareCents: integer("share_cents").notNull(),
  },
  (t) => [primaryKey({ columns: [t.expenseId, t.memberId] })],
);

export const settlements = sqliteTable(
  "settlements",
  {
    id: text("id").primaryKey(),
    tripId: text("trip_id").notNull().references(() => trips.id, { onDelete: "cascade" }),
    kind: text("kind", { enum: ["partial", "final"] }).notNull(),
    currency: text("currency").notNull(),
    rate: real("rate").notNull(), // moneda del viaje -> currency
    createdBy: text("created_by").notNull().references(() => user.id),
    createdAt: integer("created_at").notNull(),
  },
  (t) => [index("settlements_trip").on(t.tripId)],
);

export const transfers = sqliteTable(
  "transfers",
  {
    id: text("id").primaryKey(),
    settlementId: text("settlement_id").notNull().references(() => settlements.id, { onDelete: "cascade" }),
    fromMember: text("from_member").notNull().references(() => members.id),
    toMember: text("to_member").notNull().references(() => members.id),
    amountCents: integer("amount_cents").notNull(), // en la moneda del settlement
    localCents: integer("local_cents").notNull(), // equivalente en moneda del viaje
    status: text("status", { enum: ["pending", "paid", "confirmed"] }).notNull().default("pending"),
    paidAt: integer("paid_at"),
    confirmedAt: integer("confirmed_at"),
  },
  (t) => [index("transfers_settlement").on(t.settlementId)],
);

// cache diario de cotizaciones (base -> json de rates)
export const rates = sqliteTable("rates", {
  base: text("base").primaryKey(),
  day: text("day").notNull(),
  json: text("json").notNull(),
});

// pedidos para unirse con un nombre que no está en la lista: los aprueba quien creó el viaje
export const joinRequests = sqliteTable(
  "join_requests",
  {
    id: text("id").primaryKey(),
    tripId: text("trip_id").notNull().references(() => trips.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    status: text("status", { enum: ["pending", "approved", "rejected"] }).notNull().default("pending"),
    createdAt: integer("created_at").notNull(),
  },
  (t) => [index("join_requests_trip").on(t.tripId), index("join_requests_user").on(t.userId)],
);
