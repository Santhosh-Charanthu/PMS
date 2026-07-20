"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] hover:bg-slate-50 disabled:opacity-40 dark:hover:bg-white/5"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
            p === page
              ? "gradient-brand text-white"
              : "border border-[var(--border)] text-[var(--foreground)] hover:bg-slate-50 dark:hover:bg-white/5"
          )}
        >
          {p}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] hover:bg-slate-50 disabled:opacity-40 dark:hover:bg-white/5"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
