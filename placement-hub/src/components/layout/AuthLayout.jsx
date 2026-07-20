"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Briefcase, TrendingUp, ShieldCheck } from "lucide-react";

const FEATURES = [
  { icon: Briefcase, text: "Track every placement drive in one place" },
  { icon: TrendingUp, text: "See your application status update live" },
  { icon: ShieldCheck, text: "Your data, protected end to end" },
];

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden gradient-brand p-12 text-white lg:flex">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-400 blur-3xl" />
        </div>

        <Link href="/" className="relative z-10 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-lexend)" }}>
            PlacementHub
          </span>
        </Link>

        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md text-3xl font-semibold leading-tight"
            style={{ fontFamily: "var(--font-lexend)" }}
          >
            Where your campus career actually gets organized.
          </motion.h2>
          <div className="mt-8 space-y-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 * i + 0.2, duration: 0.4 }}
                className="flex items-center gap-3 text-sm text-white/90"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                  <f.icon className="h-4 w-4" />
                </div>
                {f.text}
              </motion.div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/60">© {new Date().getFullYear()} PlacementHub. Built for campus placements.</p>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-brand">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold" style={{ fontFamily: "var(--font-lexend)" }}>PlacementHub</span>
          </Link>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-lexend)" }}>
            {title}
          </h1>
          {subtitle && <p className="mt-1.5 text-sm text-[var(--muted)]">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
