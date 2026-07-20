"use client";

import { motion } from "framer-motion";
import { UserCircle, Search, ClipboardCheck, BellRing } from "lucide-react";

const FEATURES = [
  {
    icon: UserCircle,
    title: "One living profile",
    description:
      "Academic details, skills, resume and photo — kept current and ready to share with every recruiter.",
  },
  {
    icon: Search,
    title: "Drives worth your time",
    description:
      "Browse open drives with eligibility, package and deadline laid out clearly, no digging required.",
  },
  {
    icon: ClipboardCheck,
    title: "Applications you can track",
    description:
      "Watch each application move from applied to shortlisted to offered, with a clear status at every step.",
  },
  {
    icon: BellRing,
    title: "Never miss a deadline",
    description:
      "Countdown timers and reminders keep upcoming drive deadlines impossible to miss.",
  },
];

export default function LandingFeatures() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-lexend)" }}>
          Everything placement season needs
        </h2>
        <p className="mt-3 text-[var(--muted)]">
          Built for students who&apos;d rather spend time preparing than chasing spreadsheets.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="card-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
              <f.icon className="h-5 w-5 text-[var(--primary)]" />
            </div>
            <h3 className="font-semibold text-[var(--foreground)]">{f.title}</h3>
            <p className="mt-1.5 text-sm text-[var(--muted)]">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
