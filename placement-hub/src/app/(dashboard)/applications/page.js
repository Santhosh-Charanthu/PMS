"use client";

import { useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
import SearchInput from "@/components/ui/SearchInput";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";
import ApplicationsTable from "@/features/applications/ApplicationsTable";
import { APPLICATION_STATUSES } from "@/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useApplications } from "@/hooks/useApplications";
import Link from "next/link";

export default function ApplicationsPage() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const studentId = profile?.id || profile?.studentId || user?.studentId;
  const { applications, setApplications, isLoading, error, refetch } =
    useApplications(studentId);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = (app.companyName || app.company || "")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const handleWithdrawn = (id) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "WITHDRAWN" } : a)),
    );
  };

  return (
    <DashboardShell title="My Applications">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {["ALL", ...APPLICATION_STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === s
                  ? "gradient-brand text-white"
                  : "border border-[var(--border)] text-[var(--muted)] hover:bg-slate-50 dark:hover:bg-white/5",
              )}
            >
              {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by company..."
        />
      </div>

      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      )}

      {!isLoading && error && <ErrorState onRetry={refetch} />}

      {!isLoading && !error && filtered.length === 0 && (
        <EmptyState
          icon={ClipboardList}
          title="No applications found"
          description="Try adjusting your filters, or apply to a new drive."
          action={
            <Link href="/drives">
              <Button size="sm">Browse drives</Button>
            </Link>
          }
        />
      )}

      {!isLoading && !error && filtered.length > 0 && (
        <ApplicationsTable
          applications={filtered}
          onWithdrawn={handleWithdrawn}
        />
      )}
    </DashboardShell>
  );
}
