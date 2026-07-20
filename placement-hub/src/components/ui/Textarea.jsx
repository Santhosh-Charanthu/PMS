"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Textarea = forwardRef(
  ({ label, error, hint, className, required, rows = 4, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          {label}
          {required && <span className="text-[var(--danger)]"> *</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full rounded-xl border bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] transition-all duration-150 focus-ring resize-none",
          error
            ? "border-[var(--danger)] focus:border-[var(--danger)]"
            : "border-[var(--border)] focus:border-[var(--primary)]",
          className
        )}
        {...props}
      />
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-[var(--danger)]">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-[var(--muted)]">{hint}</p>
      ) : null}
    </div>
  )
);
Textarea.displayName = "Textarea";

export default Textarea;
