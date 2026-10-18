import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Check, Plus, PencilSimple, SignOut, Translate, LinkSimpleBreak, Palette, Trash, DoorOpen } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import { useTripCtx } from "./TripLayout";
import { api, auth, type Member } from "../lib/api";
import { useI18n, useT } from "../lib/i18n";
import { useTheme } from "../lib/theme";
import { AvatarPicker } from "../components/AvatarPicker";
import { Avatar, Button, Field, Segmented } from "../components/ui";
import { ConfirmSheet, CurrencySelect, ShareCode } from "../components/bits";

export function Group() {
  const t = useT();
  const { lang, setLang } = useI18n();
  const { theme, setTheme } = useTheme();
  const qc = useQueryClient();
  const { data } = useTripCtx();
  const { trip, members, meId } = data;
  const refresh = () => qc.invalidateQueries({ queryKey: ["trip", trip.id] });
  const nav = useNavigate();
  const session = auth.useSession();
  const isOwner = trip.createdBy === session.data?.user.id;
  const [confirm, setConfirm] = useState<"leave" | "delete" | Member | null>(null);
  // se puede quitar a alguien sin gastos ni pagos (para no romper las cuentas)
  const hasMovements = (id: string) =>
    data.expenses.some((e) => e.paidBy === id || e.shares.some((x) => x.memberId === id)) ||
    data.settlements.some((st) => st.transfers.some((x) => x.fromMember === id || x.toMember === id));
  const act = useMutation({
    mutationFn: (what: "leave" | "delete" | Member) =>
      what === "leave"
        ? api(`/trips/${trip.id}/leave`, { method: "POST" })
        : what === "delete"
          ? api(`/trips/${trip.id}`, { method: "DELETE" })
          : api(`/trips/${trip.id}/members/${what.id}`, { method: "DELETE" }),
    onSuccess: (_, what) => {
      setConfirm(null);
      if (typeof what === "object") return refresh();
      qc.invalidateQueries({ queryKey: ["trips"] });
      nav("/", { replace: true });
    },
  });
  const [newName, setNewName] = useState("");
  const [tripName, setTripName] = useState(trip.name);

  const addMember = useMutation({
    mutationFn: () => api(`/trips/${trip.id}/members`, { body: { name: newName.trim() } }),
    onSuccess: () => (setNewName(""), refresh()),
  });
  const updateTrip = useMutation({
    mutationFn: (body: { name?: string; settleCurrency?: string }) => api(`/trips/${trip.id}`, { method: "PATCH", body }),
    onSuccess: refresh,
  });

  return (
    <div className="flex flex-col gap-6 pt-2">
      <section className="rounded-3xl bg-surface p-5 text-center">
        <h2 className="mb-4 font-semibold">{t.inviteCode}</h2>
        <ShareCode code={trip.inviteCode} tripName={trip.name} />
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          {members.length} {t.members}
        </h2>
        <p className="mb-3 text-sm text-muted">{t.aliasOwnerOnly}</p>
        <ul className="flex flex-col gap-2">
          {members.map((m) => (
            <MemberRow
              key={m.id}
              m={m}
              isMe={m.id === meId}
              tripId={trip.id}
              onRemove={m.id !== meId && !hasMovements(m.id) && (!m.userId || isOwner) ? () => (act.reset(), setConfirm(m)) : undefined}
            />
          ))}
        </ul>
        {trip.status === "active" && (
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (newName.trim()) addMember.mutate();
            }}
          >
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={t.memberNamePh}
              aria-label={t.addMember}
              maxLength={30}
              className="h-12 flex-1 rounded-2xl border border-line bg-surface px-4 outline-none placeholder:text-muted/70 focus:border-accent"
            />
            <Button type="submit" variant="soft" className="px-4" loading={addMember.isPending} disabled={!newName.trim()} aria-label={t.addMember}>
              <Plus size={20} weight="bold" />
            </Button>
          </form>
        )}
      </section>

      <section className="flex flex-col gap-4 rounded-3xl bg-surface p-5">
        <h2 className="font-semibold">{t.tripSettings}</h2>
        <form
          className="flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (tripName.trim() && tripName !== trip.name) updateTrip.mutate({ name: tripName.trim() });
          }}
        >
          <Field label={t.tripName} value={tripName} onChange={(e) => setTripName(e.target.value)} maxLength={60} className="flex-1" />
          <Button type="submit" variant="soft" className="px-4" disabled={tripName === trip.name || !tripName.trim()} aria-label={t.save}>
            <Check size={20} weight="bold" />
          </Button>
        </form>
        <div className="flex flex-col gap-2">
          <label htmlFor="g-cur" className="text-sm font-medium text-muted">
            {t.settleCurrency}
          </label>
          <CurrencySelect id="g-cur" value={trip.settleCurrency} onChange={(v) => updateTrip.mutate({ settleCurrency: v })} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted">
            <Palette size={18} /> {t.appearance}
          </span>
          <Segmented value={theme} onChange={setTheme} options={(["system", "light", "dark"] as const).map((v) => ({ value: v, label: t.themes[v] }))} />
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted">
            <Translate size={18} /> {t.language}
          </span>
          <Segmented value={lang} onChange={setLang} options={[{ value: "es", label: "Español" }, { value: "en", label: "English" }]} />
        </div>
      </section>

      <Button variant="danger" onClick={() => (act.reset(), setConfirm(isOwner ? "delete" : "leave"))}>
        {isOwner ? <Trash size={20} /> : <DoorOpen size={20} />} {isOwner ? t.deleteTrip : t.leaveTrip}
      </Button>
      <ConfirmSheet
        open={!!confirm}
        onClose={() => setConfirm(null)}
        title={confirm === "delete" ? t.deleteTrip : confirm === "leave" ? t.leaveTrip : t.removeMember}
        body={confirm === "delete" ? t.deleteTripBody : confirm === "leave" ? t.leaveTripBody : t.removeMemberBody.replace("{name}", (confirm as Member | null)?.name ?? "")}
        confirmLabel={confirm === "delete" ? t.delete : confirm === "leave" ? t.leave : t.remove}
        loading={act.isPending}
        error={act.isError ? t.genericError : undefined}
        onConfirm={() => confirm && act.mutate(confirm)}
      />
      <Button variant="ghost" onClick={() => auth.signOut().then(() => location.assign("/app/login"))}>
        <SignOut size={20} /> {t.logout}
      </Button>
    </div>
  );
}

function MemberRow({ m, isMe, tripId, onRemove }: { m: Member; isMe: boolean; tripId: string; onRemove?: () => void }) {
  const t = useT();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [picking, setPicking] = useState(false);
  const [alias, setAlias] = useState(m.alias ?? "");
  const save = useMutation({
    mutationFn: () => api(`/trips/${tripId}/members/${m.id}`, { method: "PATCH", body: { alias: alias.trim() || null } }),
    onSuccess: () => (setEditing(false), qc.invalidateQueries({ queryKey: ["trip", tripId] })),
  });

  return (
    <motion.li layout className={`rounded-3xl bg-surface p-3 ${isMe ? "ring-2 ring-accent/40" : ""}`}>
      <div className="flex items-center gap-3">
        {isMe ? (
          <button type="button" onClick={() => setPicking(true)} className="relative shrink-0 rounded-full transition-transform active:scale-90" aria-label={t.myAvatar}>
            <Avatar name={m.name} color={m.color} image={m.image} size={44} />
            <span className="absolute -bottom-0.5 -right-0.5 inline-flex size-5 items-center justify-center rounded-full bg-accent text-white ring-2 ring-surface">
              <PencilSimple size={10} weight="bold" />
            </span>
          </button>
        ) : (
          <Avatar name={m.name} color={m.color} image={m.image} />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">
            {m.name} {isMe && <span className="text-muted">({t.you})</span>}
          </p>
          <p className="truncate text-xs text-muted">
            {m.alias ||
              (!m.userId ? (
                <span className="inline-flex items-center gap-1">
                  <LinkSimpleBreak size={12} /> {t.unclaimed}
                </span>
              ) : (
                t.noAlias
              ))}
          </p>
        </div>
        {onRemove && (
          <button onClick={onRemove} className="inline-flex size-10 items-center justify-center rounded-full bg-surface-2 text-muted" aria-label={`${t.remove} ${m.name}`}>
            <Trash size={18} />
          </button>
        )}
        {isMe && !editing && (
          <button onClick={() => setEditing(true)} className="inline-flex size-10 items-center justify-center rounded-full bg-surface-2 text-muted" aria-label={`${t.myAlias} ${m.name}`}>
            <PencilSimple size={18} />
          </button>
        )}
      </div>
      {editing && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate();
          }}
        >
          <Field label={t.myAlias} placeholder={t.aliasPh} value={alias} onChange={(e) => setAlias(e.target.value)} maxLength={80} className="flex-1" autoFocus />
          <Button type="submit" className="px-4" loading={save.isPending} aria-label={t.save}>
            <Check size={20} weight="bold" />
          </Button>
        </motion.form>
      )}
      {isMe && <AvatarPicker open={picking} onClose={() => setPicking(false)} name={m.name} color={m.color} current={m.image} />}
    </motion.li>
  );
}
