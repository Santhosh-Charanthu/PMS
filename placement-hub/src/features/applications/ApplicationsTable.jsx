"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { XCircle, ExternalLink } from "lucide-react";
import Button from "@/components/ui/Button";
import ConfirmModal from "@/components/ui/ConfirmModal";
import StatusBadge from "./StatusBadge";
import { applicationService } from "@/services/applicationService";
import toast from "react-hot-toast";

export default function ApplicationsTable({ applications, onWithdrawn }) {
  const [target, setTarget] = useState(null);
  const [withdrawing, setWithdrawing] = useState(false);

  const handleWithdraw = async () => {
    if (!target) return;
    setWithdrawing(true);
    try {
      await applicationService.withdraw(target.id);
      toast.success("Application withdrawn");
      onWithdrawn?.(target.id);
      setTarget(null);
    } catch (err) {
      toast.error(err.message || "Could not withdraw application");
    } finally {
      setWithdrawing(false);
    }
  };

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-[var(--border)] sm:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-[var(--muted)] dark:bg-white/[0.03]">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Applied</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {applications.map((app) => (
              <tr key={app.id} className="transition-colors hover:bg-slate-50/60 dark:hover:bg-white/[0.02]">
                <td className="px-4 py-3.5 font-medium text-[var(--foreground)]">{app.companyName || app.company}</td>
                <td className="px-4 py-3.5 text-[var(--muted)]">{app.role}</td>
                <td className="px-4 py-3.5 text-[var(--muted)]">
                  {app.appliedDate ? format(new Date(app.appliedDate), "MMM d, yyyy") : "—"}
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={app.status} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/drives/${app.driveId}`} className="rounded-lg p-1.5 text-[var(--muted)] hover:bg-slate-100 hover:text-[var(--foreground)] dark:hover:bg-white/5">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    {app.status !== "WITHDRAWN" && app.status !== "REJECTED" && (
                      <button
                        onClick={() => setTarget(app)}
                        className="rounded-lg p-1.5 text-[var(--muted)] hover:bg-rose-50 hover:text-[var(--danger)] dark:hover:bg-rose-500/10"
                        title="Withdraw"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 sm:hidden">
        {applications.map((app) => (
          <div key={app.id} className="card-surface p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-[var(--foreground)]">{app.companyName || app.company}</p>
                <p className="text-sm text-[var(--muted)]">{app.role}</p>
              </div>
              <StatusBadge status={app.status} />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-[var(--muted)]">
              <span>{app.appliedDate ? format(new Date(app.appliedDate), "MMM d, yyyy") : "—"}</span>
              {app.status !== "WITHDRAWN" && app.status !== "REJECTED" && (
                <Button size="sm" variant="ghost" className="text-[var(--danger)]" onClick={() => setTarget(app)}>
                  Withdraw
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        open={!!target}
        onOpenChange={(open) => !open && setTarget(null)}
        title="Withdraw application?"
        description={`This will withdraw your application to ${target?.companyName || target?.company || "this company"}. You can't undo this.`}
        confirmLabel="Withdraw"
        tone="danger"
        isLoading={withdrawing}
        onConfirm={handleWithdraw}
      />
    </>
  );
}
