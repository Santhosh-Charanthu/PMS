"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ClipboardList } from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
import SearchableSelect from "@/components/ui/SearchableSelect";
import SearchInput from "@/components/ui/SearchInput";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { TableRowSkeleton } from "@/components/ui/Skeleton";
import StatusSelect from "@/features/admin/StatusSelect";
import { useDrives } from "@/hooks/useDrives";
import { applicationService } from "@/services/applicationService";
import { format } from "date-fns";

export default function AdminApplicationsContent() {
  const searchParams = useSearchParams();
  const { drives } = useDrives({ page: 1 });
  const [driveId, setDriveId] = useState(searchParams.get("driveId") || "");
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const driveNameToId = Object.fromEntries(
    drives.map((d) => [`${d.companyName || d.company} — ${d.role}`, d.id])
  );
  const selectedDriveLabel = Object.keys(driveNameToId).find((k) => driveNameToId[k] === driveId) || "";

  const fetchApplications = useCallback(async () => {
    if (!driveId) return;
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await applicationService.getByDrive(driveId);
      setApplications(Array.isArray(data) ? data : data.content || []);
    } catch (err) {
      setError(err.message || "Could not load applicants");
    } finally {
      setIsLoading(false);
    }
  }, [driveId]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusChange = async (app, status) => {
    const prev = app.status;
    setApplications((list) => list.map((a) => (a.id === app.id ? { ...a, status } : a)));
    try {
      await applicationService.updateStatus(app.id, status);
      toast.success(`Status updated to ${status.charAt(0) + status.slice(1).toLowerCase()}`);
    } catch (err) {
      toast.error(err.message || "Could not update status");
      setApplications((list) => list.map((a) => (a.id === app.id ? { ...a, status: prev } : a)));
    }
  };

  const filtered = applications.filter((a) =>
    (a.studentName || a.rollNumber || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardShell title="Applications">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full max-w-xs">
          <SearchableSelect
            options={Object.keys(driveNameToId)}
            value={selectedDriveLabel}
            onChange={(label) => setDriveId(driveNameToId[label])}
            placeholder="Select a drive"
          />
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search by student..." />
      </div>

      {!driveId && (
        <EmptyState icon={ClipboardList} title="Select a drive" description="Choose a drive above to view and manage its applicants." />
      )}

      {driveId && error && <ErrorState onRetry={fetchApplications} />}

      {driveId && !error && (
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-[var(--muted)] dark:bg-white/[0.03]">
              <tr>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Roll number</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {isLoading && Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={4} />)}
              {!isLoading &&
                filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02]">
                    <td className="px-4 py-3.5 font-medium text-[var(--foreground)]">{app.studentName || "—"}</td>
                    <td className="px-4 py-3.5 text-[var(--muted)]">{app.rollNumber || "—"}</td>
                    <td className="px-4 py-3.5 text-[var(--muted)]">
                      {app.appliedDate ? format(new Date(app.appliedDate), "MMM d, yyyy") : "—"}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusSelect value={app.status} onChange={(status) => handleStatusChange(app, status)} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {!isLoading && filtered.length === 0 && (
            <div className="p-6">
              <EmptyState icon={ClipboardList} title="No applicants yet" description="Students who apply to this drive will show up here." />
            </div>
          )}
        </div>
      )}
    </DashboardShell>
  );
}
