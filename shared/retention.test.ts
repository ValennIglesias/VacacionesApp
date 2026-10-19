import { describe, expect, it } from "vitest";
import { RETENTION as R, retentionPlan, type RetentionInput } from "./retention";

const DAY = 86_400_000;
const T0 = Date.UTC(2026, 0, 1);
const base: RetentionInput = { closedAt: null, lastActivity: T0, hasRegistered: true, notice: 0, noticeAt: null };
const at = (days: number) => T0 + days * DAY;

describe("viajes finalizados", () => {
  it("solo invitados: se borran a los 30 días", () => {
    const t = { ...base, hasRegistered: false, closedAt: T0 };
    expect(retentionPlan(t, at(R.closedGuestDays - 1)).action).toBe(null);
    expect(retentionPlan(t, at(R.closedGuestDays)).action).toBe("delete");
  });

  it("con registrados: aviso 7 días antes y recién después se borra", () => {
    const t = { ...base, closedAt: T0 };
    expect(retentionPlan(t, at(R.closedRegisteredDays - R.warnDays - 1)).action).toBe(null);
    expect(retentionPlan(t, at(R.closedRegisteredDays - R.warnDays)).action).toBe("warn");
    // sin aviso enviado nunca se borra, aunque se pase la fecha
    expect(retentionPlan(t, at(R.closedRegisteredDays + 10)).action).toBe("warn");
    const warned = { ...t, notice: 2 as const, noticeAt: at(R.closedRegisteredDays - R.warnDays) };
    expect(retentionPlan(warned, at(R.closedRegisteredDays - 1)).action).toBe(null);
    expect(retentionPlan(warned, at(R.closedRegisteredDays)).action).toBe("delete");
  });

  it("el aviso informa la fecha real de borrado (al menos 7 días después de enviarlo)", () => {
    const t = { ...base, closedAt: T0 };
    expect(retentionPlan(t, at(R.closedRegisteredDays - 2)).deleteAt).toBe(at(R.closedRegisteredDays - 2 + R.warnDays));
    expect(retentionPlan(base, at(R.inactiveDeleteDays + 3)).deleteAt).toBe(at(R.inactiveDeleteDays + 3 + R.warnDays));
  });

  it("si el aviso salió tarde, el borrado espera los 7 días completos", () => {
    const late = { ...base, closedAt: T0, notice: 2 as const, noticeAt: at(R.closedRegisteredDays + 5) };
    expect(retentionPlan(late, at(R.closedRegisteredDays + 6)).action).toBe(null);
    expect(retentionPlan(late, at(R.closedRegisteredDays + 5 + R.warnDays)).action).toBe("delete");
  });
});

describe("viajes sin finalizar y sin actividad", () => {
  it("solo invitados: se borran a los 60 días y muestran la fecha en los últimos 14", () => {
    const t = { ...base, hasRegistered: false };
    expect(retentionPlan(t, at(10)).deleteAt).toBe(null);
    expect(retentionPlan(t, at(R.inactiveGuestDays - R.showGuestDays)).deleteAt).toBe(at(R.inactiveGuestDays));
    expect(retentionPlan(t, at(R.inactiveGuestDays)).action).toBe("delete");
  });

  it("con registrados: recordatorio, aviso y recién después borrado", () => {
    expect(retentionPlan(base, at(R.inactiveRemindDays - 1)).action).toBe(null);
    expect(retentionPlan(base, at(R.inactiveRemindDays)).action).toBe("remind");
    const reminded = { ...base, notice: 1 as const, noticeAt: at(R.inactiveRemindDays) };
    expect(retentionPlan(reminded, at(R.inactiveRemindDays + 1)).action).toBe(null);
    expect(retentionPlan(reminded, at(R.inactiveDeleteDays - R.warnDays)).action).toBe("warn");
    const warned = { ...base, notice: 2 as const, noticeAt: at(R.inactiveDeleteDays - R.warnDays) };
    expect(retentionPlan(warned, at(R.inactiveDeleteDays)).action).toBe("delete");
  });

  it("actividad después del aviso lo anula y reinicia los plazos", () => {
    const active = { ...base, lastActivity: at(85), notice: 2 as const, noticeAt: at(83) };
    expect(retentionPlan(active, at(90))).toEqual({ action: null, deleteAt: null });
    expect(retentionPlan(active, at(85 + R.inactiveRemindDays)).action).toBe("remind");
  });
});
