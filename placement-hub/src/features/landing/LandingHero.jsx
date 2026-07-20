"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

const STATS = [
  { value: "2,400+", label: "Students placed" },
  { value: "180+", label: "Recruiting companies" },
  { value: "96%", label: "Application response rate" },
];

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute right-[-10%] top-1/3 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl dark:bg-purple-500/10" />
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-20 pt-20 text-center lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-medium text-[var(--muted)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Placement season 2026 drives are live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-6xl"
          style={{ fontFamily: "var(--font-lexend)" }}
        >
          One dashboard for every
          <span className="text-gradient-brand"> placement drive.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-5 max-w-2xl text-lg text-[var(--muted)]"
        >
          Build your profile once, discover every drive you&apos;re eligible for, and track each
          application from applied to offered — all in one clean, fast workspace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href="/register">
            <Button size="lg" icon={ArrowRight} iconPosition="right">
              Create your profile
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="secondary">
              I already have an account
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[var(--muted)]"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-[var(--success)]" />
          Free for students. Set up in under 3 minutes.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-lexend)" }}>
                {s.value}
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
