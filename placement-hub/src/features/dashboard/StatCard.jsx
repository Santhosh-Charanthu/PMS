"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

export default function StatCard({ icon: Icon, label, value, tone = "primary", delay = 0 }) {
  const tones = {
    primary: "bg-blue-50 text-[var(--primary)] dark:bg-blue-500/10",
    success: "bg-emerald-50 text-[var(--success)] dark:bg-emerald-500/10",
    warning: "bg-amber-50 text-[var(--warning)] dark:bg-amber-500/10",
    purple: "bg-purple-50 text-[var(--accent-purple)] dark:bg-purple-500/10",
  };
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.35 }}>
      <Card hover className="flex items-center gap-4">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--muted)]">{label}</p>
          <p className="text-xl font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-lexend)" }}>
            {value}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
