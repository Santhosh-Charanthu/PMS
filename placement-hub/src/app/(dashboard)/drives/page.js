"use client";

import { useState } from "react";
import { Briefcase } from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
import SearchInput from "@/components/ui/SearchInput";
import Pagination from "@/components/ui/Pagination";
import { CardSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import DriveCard from "@/features/drives/DriveCard";
import { useDrives } from "@/hooks/useDrives";

export default function DrivesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { drives, totalPages, isLoading, error, refetch } = useDrives({ page, search });

  return (
    <DashboardShell title="Placement Drives">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--muted)]">
          {isLoading ? "Loading drives…" : `${drives.length} open drive${drives.length === 1 ? "" : "s"}`}
        </p>
        <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by company..." />
      </div>

      {isLoading && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      )}

      {!isLoading && error && <ErrorState onRetry={refetch} />}

      {!isLoading && !error && drives.length === 0 && (
        <EmptyState icon={Briefcase} title="No drives found" description="Try a different search or check back later." />
      )}

      {!isLoading && !error && drives.length > 0 && (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {drives.map((d, i) => (
              <DriveCard key={d.id} drive={d} delay={i * 0.04} />
            ))}
          </div>
          <div className="mt-8">
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        </>
      )}
    </DashboardShell>
  );
}
