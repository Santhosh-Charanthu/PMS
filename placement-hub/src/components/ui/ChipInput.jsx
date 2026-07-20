"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ChipInput({ label, value = [], onChange, placeholder = "Type a skill and press Enter", error, hint }) {
  const [draft, setDraft] = useState("");

  const addChip = (raw) => {
    const chip = raw.trim();
    if (!chip) return;
    if (value.some((v) => v.toLowerCase() === chip.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...value, chip]);
    setDraft("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addChip(draft);
    } else if (e.key === "Backspace" && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="w-full">
      {label && <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">{label}</label>}
      <div
        className={cn(
          "flex min-h-11 w-full flex-wrap items-center gap-1.5 rounded-xl border bg-[var(--surface)] px-2.5 py-2 focus-within:border-[var(--primary)]",
          error ? "border-[var(--danger)]" : "border-[var(--border)]"
        )}
      >
        <AnimatePresence initial={false}>
          {value.map((chip) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
            >
              {chip}
              <button
                type="button"
                onClick={() => onChange(value.filter((v) => v !== chip))}
                className="rounded-full hover:bg-blue-100 dark:hover:bg-blue-500/20"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addChip(draft)}
          placeholder={value.length ? "" : placeholder}
          className="min-w-[120px] flex-1 border-none bg-transparent px-1 py-1 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
        />
      </div>
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-[var(--danger)]">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-[var(--muted)]">{hint}</p>
      ) : null}
    </div>
  );
}
