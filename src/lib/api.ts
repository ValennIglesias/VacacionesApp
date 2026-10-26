import { useQuery } from "@tanstack/react-query";
import { createAuthClient } from "better-auth/react";
import { anonymousClient } from "better-auth/client/plugins";
import type { Category } from "../../shared/data";

export const auth = createAuthClient({ baseURL: location.origin, plugins: [anonymousClient()] });

/** Sesión de invitado (entró con código sin registrarse). */
export const useIsGuest = () => !!(auth.useSession().data?.user as { isAnonymous?: boolean | null } | undefined)?.isAnonymous;

export type Trip = {
  id: string;
  name: string;
  countryCode: string;
  city: string | null;
  currency: string;
  settleCurrency: string;
  inviteCode: string;
  startDate: string | null;
  endDate: string | null;
  status: "active" | "closed";
  createdBy: string;
  createdAt: number;
  demo: boolean;
};
export type Member = { id: string; name: string; userId: string | null; alias: string | null; color: number; image: string | null };
export type Expense = {
  id: string;
  paidBy: string;
  description: string;
  category: Category;
  date: string;
  amountCents: number;
  currency: string;
  rate: number;
  amountTripCents: number;
  settlementId: string | null;
  shares: { memberId: string; shareCents: number }[];
};
export type TransferRow = {
  id: string;
  fromMember: string;
  toMember: string;
  amountCents: number;
  localCents: number;
  status: "pending" | "paid" | "confirmed";
};
export type Settlement = { id: string; kind: "partial" | "final"; currency: string; rate: number; createdAt: number; transfers: TransferRow[] };
export type JoinRequest = { id: string; name: string; createdAt: number };
export type TripData = { trip: Trip; meId: string; deleteAt: number | null; requests: JoinRequest[]; members: Member[]; expenses: Expense[]; settlements: Settlement[] };

export class ApiError extends Error {
  constructor(public status: number, public code: string) {
    super(code);
  }
}

export async function api<T = unknown>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: init?.method ?? (init?.body ? "POST" : "GET"),
    headers: init?.body ? { "content-type": "application/json" } : undefined,
    body: init?.body ? JSON.stringify(init.body) : undefined,
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, (data as { error?: string }).error ?? "error");
  return data as T;
}

export const useTrip = (id: string) =>
  useQuery({
    queryKey: ["trip", id],
    queryFn: () => api<TripData>(`/trips/${id}`),
    // shortcut: polling cada 10s en vez de tiempo real; pasar a Durable Objects/WebSocket si hace falta
    refetchInterval: 10_000,
  });

export const useConfig = () =>
  useQuery({ queryKey: ["config"], queryFn: () => api<{ google: boolean; country: string | null }>("/config"), staleTime: Infinity });

export const useRates = () =>
  useQuery({ queryKey: ["rates"], queryFn: () => api<Record<string, number>>("/rates"), staleTime: 60 * 60 * 1000 });

export type ArsType = "oficial" | "bolsa" | "blue" | "tarjeta";
/** ARS por USD (venta) según tipo de dólar argentino. */
export const useArsRates = (enabled: boolean) =>
  useQuery({
    queryKey: ["rates-ars"],
    queryFn: () => api<Partial<Record<ArsType, { venta: number; updated: string }>>>("/rates/ars"),
    staleTime: 30 * 60 * 1000,
    enabled,
  });

/** Cotización from->to cuando uno de los dos es ARS, usando un dólar argentino específico. */
export const arsCrossRate = (rates: Record<string, number> | undefined, arsPerUsd: number, from: string, to: string) => {
  if (to === "ARS") return rates?.[from] ? arsPerUsd / rates[from] : undefined;
  if (from === "ARS") return rates?.[to] ? rates[to] / arsPerUsd : undefined;
};

/** Cotización cruzada desde la tabla base USD. */
export const crossRate = (rates: Record<string, number> | undefined, from: string, to: string) =>
  from === to ? 1 : rates?.[from] && rates?.[to] ? rates[to] / rates[from] : undefined;
