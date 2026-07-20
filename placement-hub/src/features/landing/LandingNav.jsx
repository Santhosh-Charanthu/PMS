"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function LandingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-brand">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight" style={{ fontFamily: "var(--font-lexend)" }}>
            PlacementHub
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--muted)] md:flex">
          <a href="#features" className="hover:text-[var(--foreground)]">Features</a>
          <a href="#how-it-works" className="hover:text-[var(--foreground)]">How it works</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)]">
            Sign in
          </Link>
          <Link href="/register">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
