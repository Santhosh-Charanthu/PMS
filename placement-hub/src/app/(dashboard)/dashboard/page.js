"use client";

import Link from "next/link";
import {
  Briefcase,
  ClipboardList,
  TrendingUp,
  UserCircle,
  ArrowUpRight,
} from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ProgressRing from "@/components/ui/ProgressRing";
import EmptyState from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import StatCard from "@/features/dashboard/StatCard";
import StatusBadge from "@/features/applications/StatusBadge";
import DriveCard from "@/features/drives/DriveCard";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useApplications } from "@/hooks/useApplications";
import { useDrives } from "@/hooks/useDrives";

function computeCompletion(profile) {
  if (!profile) return 0;
  const fields = [
    "rollNumber",
    "branch",
    "phoneNumber",
    "dateOfBirth",
    "gender",
    "graduationYear",
    "cgpa",
    "imageUrl",
    "resumeUrl",
  ];
  const filled =
    fields.filter((f) => profile[f]).length + (profile.skills?.length ? 1 : 0);
  return Math.round((filled / (fields.length + 1)) * 100);
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { profile, isLoading: profileLoading } = useProfile();
  const { applications, isLoading: appsLoading } = useApplications(
    profile?.id || profile?.studentId || user?.studentId,
  );
  const { drives, isLoading: drivesLoading } = useDrives({ page: 1 });

  const completion = computeCompletion(profile);
  const recentApplications = applications.slice(0, 5);
  const upcomingDrives = drives.slice(0, 3);

  const stats = [
    {
      icon: ClipboardList,
      label: "Applications",
      value: applications.length,
      tone: "primary",
    },
    {
      icon: TrendingUp,
      label: "Shortlisted",
      value: applications.filter(
        (a) => a.status === "SHORTLISTED" || a.status === "INTERVIEW",
      ).length,
      tone: "warning",
    },
    {
      icon: Briefcase,
      label: "Offers",
      value: applications.filter((a) => a.status === "OFFERED").length,
      tone: "success",
    },
  ];

  return (
    <DashboardShell title={`Welcome back, ${user?.firstName || "there"}`}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex items-center gap-4">
            {profileLoading ? (
              <Skeleton className="h-16 w-16 rounded-full" />
            ) : (
              <ProgressRing percent={completion} size={72} />
            )}
            <div>
              <p className="font-semibold text-[var(--foreground)]">
                Profile completion
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {completion === 100
                  ? "Your profile is all set."
                  : "Complete your profile to stand out."}
              </p>
            </div>
          </div>
          <Link href="/profile" className="mt-4 block">
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              icon={UserCircle}
            >
              {profile ? "Update profile" : "Create profile"}
            </Button>
          </Link>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-2">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.05} />
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-[var(--foreground)]">
              Recent applications
            </h3>
            <Link
              href="/applications"
              className="flex items-center gap-1 text-xs font-medium text-[var(--primary)] hover:underline"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          {appsLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : recentApplications.length === 0 ? (
            <EmptyState
              icon={ClipboardList}
              title="No applications yet"
              description="Browse open drives and apply to get started."
              action={
                <Link href="/drives">
                  <Button size="sm">Browse drives</Button>
                </Link>
              }
            />
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      {app.companyName || app.company}
                    </p>
                    <p className="text-xs text-[var(--muted)]">{app.role}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-[var(--foreground)]">
              Upcoming drives
            </h3>
            <Link
              href="/drives"
              className="flex items-center gap-1 text-xs font-medium text-[var(--primary)] hover:underline"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          {drivesLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : upcomingDrives.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              title="No drives yet"
              description="Check back soon for new placement drives."
            />
          ) : (
            <div className="space-y-3">
              {upcomingDrives.map((d) => (
                <Link
                  key={d.id}
                  href={`/drives/${d.id}`}
                  className="block rounded-xl border border-[var(--border)] p-3 transition-colors hover:border-[var(--primary)]"
                >
                  <p className="text-sm font-medium text-[var(--foreground)]">
                    {d.companyName || d.company}
                  </p>
                  <p className="text-xs text-[var(--muted)]">{d.role}</p>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardShell>
  );
}
