// Vencimiento de viajes. Los plazos se ajustan acá; la tarea diaria del Worker aplica retentionPlan a cada viaje.
const DAY = 86_400_000;
export const RETENTION = {
  closedGuestDays: 30, // finalizado, solo invitados
  closedRegisteredDays: 365, // finalizado, con alguien registrado
  inactiveGuestDays: 60, // sin finalizar ni actividad, solo invitados
  inactiveRemindDays: 60, // registrado: recordatorio para finalizarlo
  inactiveDeleteDays: 90, // registrado: borrado si sigue sin actividad
  warnDays: 7, // aviso por email antes de borrar (registrados)
  showGuestDays: 14, // a invitados se les muestra la fecha cuando falta esto o menos
};

/** 0 = sin avisos, 1 = recordatorio enviado, 2 = aviso de borrado enviado */
export type Notice = 0 | 1 | 2;

export type RetentionInput = {
  closedAt: number | null; // repartida final
  lastActivity: number; // último gasto, repartida o pago
  hasRegistered: boolean; // alguien vinculado con cuenta real (recibe emails)
  notice: Notice;
  noticeAt: number | null;
};

export type RetentionPlan = {
  action: "delete" | "remind" | "warn" | null;
  deleteAt: number | null; // fecha prevista de borrado para mostrar (null = todavía no corresponde mostrarla)
};

export function retentionPlan(t: RetentionInput, now: number): RetentionPlan {
  // cualquier actividad posterior al último aviso lo anula: los plazos vuelven a contar desde cero
  const notice = t.noticeAt && t.lastActivity > t.noticeAt ? 0 : t.notice;
  // a registrados nunca se les borra sin un aviso enviado al menos warnDays antes
  const warnedLongEnough = notice === 2 && !!t.noticeAt && now >= t.noticeAt + RETENTION.warnDays * DAY;

  if (t.closedAt) {
    if (!t.hasRegistered) {
      const deleteAt = t.closedAt + RETENTION.closedGuestDays * DAY;
      return { action: now >= deleteAt ? "delete" : null, deleteAt };
    }
    const deleteAt = t.closedAt + RETENTION.closedRegisteredDays * DAY;
    if (notice === 2) return { action: now >= deleteAt && warnedLongEnough ? "delete" : null, deleteAt: Math.max(deleteAt, t.noticeAt! + RETENTION.warnDays * DAY) };
    return now >= deleteAt - RETENTION.warnDays * DAY ? { action: "warn", deleteAt: Math.max(deleteAt, now + RETENTION.warnDays * DAY) } : { action: null, deleteAt };
  }

  if (!t.hasRegistered) {
    const deleteAt = t.lastActivity + RETENTION.inactiveGuestDays * DAY;
    if (now >= deleteAt) return { action: "delete", deleteAt };
    return { action: null, deleteAt: now >= deleteAt - RETENTION.showGuestDays * DAY ? deleteAt : null };
  }

  const deleteAt = t.lastActivity + RETENTION.inactiveDeleteDays * DAY;
  if (notice === 2) return { action: now >= deleteAt && warnedLongEnough ? "delete" : null, deleteAt: Math.max(deleteAt, t.noticeAt! + RETENTION.warnDays * DAY) };
  if (now >= deleteAt - RETENTION.warnDays * DAY) return { action: "warn", deleteAt: Math.max(deleteAt, now + RETENTION.warnDays * DAY) };
  if (notice === 0 && now >= t.lastActivity + RETENTION.inactiveRemindDays * DAY) return { action: "remind", deleteAt };
  return { action: null, deleteAt: notice === 1 ? deleteAt : null };
}
