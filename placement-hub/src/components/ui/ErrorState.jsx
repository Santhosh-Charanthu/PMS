"use client";

import { AlertTriangle, RotateCw } from "lucide-react";
import Button from "./Button";

export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-rose-50/40 px-6 py-16 text-center dark:bg-rose-500/5">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-500/10">
        <AlertTriangle className="h-6 w-6 text-[var(--danger)]" />
      </div>
      <h3 className="text-base font-semibold text-[var(--foreground)]">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-[var(--muted)]">{description}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-5" icon={RotateCw} onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
