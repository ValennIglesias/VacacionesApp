import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { auth } from "../lib/api";
import { useI18n, useT } from "../lib/i18n";
import { AVATAR_SETS, avatarUrl, type AvatarSet } from "../../shared/avatars";
import { Avatar, Segmented, Sheet, spring } from "./ui";

type Tab = "default" | AvatarSet;
const SETS = Object.keys(AVATAR_SETS) as AvatarSet[];

/** Galería de avatares de la cuenta (se ve en todos los viajes). `null` = inicial. */
export function AvatarPicker({ open, onClose, name, color, current }: { open: boolean; onClose: () => void; name: string; color: number; current: string | null }) {
  const t = useT();
  const { lang } = useI18n();
  const qc = useQueryClient();
  const [tab, setTab] = useState<Tab>(() => SETS.find((s) => AVATAR_SETS[s].some(([f]) => current === avatarUrl(f))) ?? "default");
  const [saving, setSaving] = useState<string | null | undefined>(undefined);

  const pick = async (image: string | null) => {
    setSaving(image);
    const res = await auth.updateUser({ image });
    setSaving(undefined);
    if (res.error) return;
    navigator.vibrate?.(12);
    qc.invalidateQueries({ queryKey: ["trip"] });
    onClose();
  };

  const options: { img: string | null; label: string }[] =
    tab === "default"
      ? [{ img: null, label: t.initialAvatar }]
      : AVATAR_SETS[tab].map(([file, es, en]) => ({ img: avatarUrl(file), label: lang === "es" ? es : en }));

  return (
    <Sheet open={open} onClose={onClose} title={t.chooseAvatar}>
      <div className="flex flex-col gap-4">
        <Segmented full value={tab} onChange={setTab} options={(["default", ...SETS] as Tab[]).map((s) => ({ value: s, label: t.avatarSets[s] }))} />
        {tab === "default" && <p className="-mt-1 text-sm text-muted">{t.initialAvatarHelp}</p>}
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="grid grid-cols-4 gap-3" role="radiogroup" aria-label={t.chooseAvatar}>
          {options.map(({ img, label }, i) => {
            const on = (current ?? null) === img;
            return (
              <motion.button
                key={img ?? "initial"}
                type="button"
                role="radio"
                aria-checked={on}
                aria-label={label}
                title={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: saving !== undefined && saving !== img ? 0.5 : 1, scale: 1 }}
                transition={{ delay: Math.min(i, 16) * 0.015 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                disabled={saving !== undefined}
                onClick={() => pick(img)}
                className="relative flex aspect-square items-center justify-center rounded-3xl bg-surface-2"
              >
                {on && <motion.span layoutId="avatar-ring" className="absolute inset-0 rounded-3xl border-2 border-accent" transition={spring} />}
                <Avatar name={name} color={color} image={img} size={60} />
                {saving === img && <span className="absolute inset-0 m-auto size-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </Sheet>
  );
}
