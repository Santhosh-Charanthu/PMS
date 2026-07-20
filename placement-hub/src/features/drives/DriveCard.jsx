"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, MapPin, Wallet, CalendarClock } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { format, isPast } from "date-fns";

export default function DriveCard({ drive, delay = 0 }) {
  const deadline = drive.deadline ? new Date(drive.deadline) : null;
  const expired = deadline && isPast(deadline);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.3 }}>
      <Card hover className="flex h-full flex-col">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 text-[var(--primary)] dark:from-blue-500/10 dark:to-purple-500/10">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-[var(--foreground)]">{drive.companyName || drive.company}</h3>
            <p className="truncate text-sm text-[var(--muted)]">{drive.role}</p>
          </div>
          {drive.alreadyApplied && <Badge tone="success">Applied</Badge>}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(drive.requiredSkills ? drive.requiredSkills.split(",").map(s => s.trim()).filter(Boolean) : []).slice(0, 3).map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-[var(--muted)]">
          <div className="flex items-center gap-1.5">
            <Wallet className="h-3.5 w-3.5" /> {drive.jobPackage || "—"}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {drive.jobLocation || "—"}
          </div>
          <div className="col-span-2 flex items-center gap-1.5">
            <CalendarClock className="h-3.5 w-3.5" />
            {deadline ? (
              <span className={expired ? "text-[var(--danger)]" : ""}>
                {expired ? "Closed" : "Apply by"} {format(deadline, "MMM d, yyyy")}
              </span>
            ) : (
              "No deadline set"
            )}
          </div>
        </div>

        <Link href={`/drives/${drive.id}`} className="mt-5">
          <span className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--primary)] py-2 text-sm font-medium text-[var(--primary)] transition-colors hover:bg-blue-50 dark:hover:bg-blue-500/10">
            View details
          </span>
        </Link>
      </Card>
    </motion.div>
  );
}
