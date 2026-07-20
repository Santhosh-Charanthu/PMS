"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchableSelect({ label, options, value, onChange, placeholder = "Select...", error, required }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const filtered = useMemo(
    () => options.filter((o) => o.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  );

  return (
    <div className="w-full relative" ref={ref}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          {label}
          {required && <span className="text-[var(--danger)]"> *</span>}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-xl border bg-[var(--surface)] px-3.5 text-sm focus-ring",
          error ? "border-[var(--danger)]" : "border-[var(--border)]",
          value ? "text-[var(--foreground)]" : "text-[var(--muted)]"
        )}
      >
        {value || placeholder}
        <ChevronDown className={cn("h-4 w-4 text-[var(--muted)] transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg">
          <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-2">
            <Search className="h-3.5 w-3.5 text-[var(--muted)]" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
            />
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <p className="px-3 py-2 text-sm text-[var(--muted)]">No matches</p>
            )}
            {filtered.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                  setQuery("");
                }}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-white/5"
              >
                {opt}
                {value === opt && <Check className="h-3.5 w-3.5 text-[var(--primary)]" />}
              </button>
            ))}
          </div>
        </div>
      )}
      {error && <p className="mt-1.5 text-xs font-medium text-[var(--danger)]">{error}</p>}
    </div>
  );
}
