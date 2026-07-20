import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-brand">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-[var(--foreground)]">PlacementHub</span>
        </Link>
        <p className="text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} PlacementHub. Built for campus placements.
        </p>
      </div>
    </footer>
  );
}
