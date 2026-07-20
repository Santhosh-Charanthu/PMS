"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SegmentedControl({ label, options, value, onChange, error }) {
  return (
    <div className="w-full">
      {label && <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">{label}</label>}
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={cn(
                "relative overflow-hidden rounded-xl border px-3 py-3 text-sm font-medium transition-colors focus-ring",
                active
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-[var(--border)] text-[var(--muted)] hover:border-slate-300"
              )}
            >
              {active && (
                <motion.span
                  layoutId="segmented-bg"
                  className="absolute inset-0 bg-blue-50 dark:bg-blue-500/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative">{opt.label}</span>
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-[var(--danger)]">{error}</p>}
    </div>
  );
}
