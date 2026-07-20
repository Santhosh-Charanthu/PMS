"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Building2,
  MapPin,
  Wallet,
  CalendarClock,
  ListChecks,
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { format, isPast } from "date-fns";
import DashboardShell from "@/components/layout/DashboardShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ErrorState from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import CountdownTimer from "@/features/drives/CountdownTimer";
import { driveService } from "@/services/driveService";
import { applicationService } from "@/services/applicationService";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";

export default function DriveDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { profile } = useProfile();
  const [drive, setDrive] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await driveService.getById(id);
      setDrive(data);
    } catch (err) {
      setError(err.message || "Could not load this drive");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const checkApplied = async () => {
      const sid = profile?.id;
      if (!sid || !id) return;
      try {
        const { data } = await applicationService.getByStudent(sid);
        const apps = Array.isArray(data) ? data : data.content || [];
        setApplied(apps.some((a) => String(a.driveId) === String(id)));
      } catch {
        // silently ignore
      }
    };
    checkApplied();
  }, [profile?.id, id]);

  const studentId = profile?.id || profile?.studentId || user?.studentId;
  const deadline = drive?.deadline ? new Date(drive.deadline) : null;
  const expired = deadline && isPast(deadline);

  const handleApply = async () => {
    setApplying(true);
    try {
      await applicationService.apply(studentId, id);
      toast.success("Application submitted!");
      setApplied(true);
      setConfirmOpen(false);
    } catch (err) {
      toast.error(err.message || "Could not submit your application");
    } finally {
      setApplying(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardShell title="Drive details">
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </DashboardShell>
    );
  }

  if (error || !drive) {
    return (
      <DashboardShell title="Drive details">
        <ErrorState onRetry={load} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="Drive details">
      <button
        onClick={() => router.push("/drives")}
        className="mb-5 flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to drives
      </button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 text-[var(--primary)] dark:from-blue-500/10 dark:to-purple-500/10">
                <Building2 className="h-7 w-7" />
              </div>
              <div>
                <h1
                  className="text-xl font-semibold text-[var(--foreground)]"
                  style={{ fontFamily: "var(--font-lexend)" }}
                >
                  {drive.companyName || drive.company}
                </h1>
                <p className="mt-0.5 text-[var(--muted)]">{drive.role}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Wallet className="h-4 w-4" /> {drive.jobPackage || "—"}
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <MapPin className="h-4 w-4" /> {drive.jobLocation || "—"}
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <CalendarClock className="h-4 w-4" />{" "}
                {deadline ? format(deadline, "MMM d, yyyy") : "—"}
              </div>
            </div>
          </Card>

          {drive.driveDescription && (
            <Card>
              <h3 className="mb-2 font-semibold text-[var(--foreground)]">
                About the drive
              </h3>
              <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--muted)]">
                {drive.driveDescription}
              </p>
            </Card>
          )}

          {drive.jobDescription && (
            <Card>
              <h3 className="mb-2 font-semibold text-[var(--foreground)]">
                About the role
              </h3>
              <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--muted)]">
                {drive.jobDescription}
              </p>
            </Card>
          )}

          {drive.recruitmentProcess && (
            <Card>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-[var(--foreground)]">
                <ListChecks className="h-4 w-4" /> Recruitment process
              </h3>
              <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--muted)]">
                {drive.recruitmentProcess}
              </p>
            </Card>
          )}

          {(drive.minCgpa ||
            drive.backlogRestrictions != null ||
            drive.graduationYear ||
            drive.eligibleBranches?.length > 0) && (
            <Card>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-[var(--foreground)]">
                <GraduationCap className="h-4 w-4" /> Eligibility
              </h3>
              <dl className="space-y-2 text-sm text-[var(--muted)]">
                {drive.minCgpa && (
                  <div>
                    Min CGPA:{" "}
                    <span className="font-medium text-[var(--foreground)]">
                      {drive.minCgpa}
                    </span>
                  </div>
                )}
                {drive.backlogRestrictions != null && (
                  <div>
                    Max backlogs:{" "}
                    <span className="font-medium text-[var(--foreground)]">
                      {drive.backlogRestrictions}
                    </span>
                  </div>
                )}
                {drive.graduationYear && (
                  <div>
                    Graduation year:{" "}
                    <span className="font-medium text-[var(--foreground)]">
                      {drive.graduationYear}
                    </span>
                  </div>
                )}
                {drive.eligibleBranches?.length > 0 && (
                  <div>
                    Eligible branches:{" "}
                    <span className="font-medium text-[var(--foreground)]">
                      {drive.eligibleBranches.join(", ")}
                    </span>
                  </div>
                )}
              </dl>
            </Card>
          )}

          {drive.requiredSkills && (
            <Card>
              <h3 className="mb-3 font-semibold text-[var(--foreground)]">
                Skills required
              </h3>
              <div className="flex flex-wrap gap-2">
                {drive.requiredSkills
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((s) => (
                    <Badge key={s} tone="primary">
                      {s}
                    </Badge>
                  ))}
              </div>
            </Card>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <Card>
            <CountdownTimer deadline={drive.deadline} />
            <Button
              className="mt-4 w-full"
              size="lg"
              disabled={applied || expired}
              onClick={() => setConfirmOpen(true)}
              icon={applied ? CheckCircle2 : undefined}
            >
              {applied
                ? "Already applied"
                : expired
                  ? "Applications closed"
                  : "Apply now"}
            </Button>
            {applied && (
              <p className="mt-3 text-center text-xs text-[var(--muted)]">
                Track this application from{" "}
                <a
                  href="/applications"
                  className="font-medium text-[var(--primary)] hover:underline"
                >
                  My Applications
                </a>
                .
              </p>
            )}
          </Card>
        </div>
      </div>

      <ConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={`Apply to ${drive.companyName || drive.company}?`}
        description="You're about to submit your profile for this drive. You can withdraw later from My Applications."
        confirmLabel="Confirm application"
        isLoading={applying}
        onConfirm={handleApply}
      />
    </DashboardShell>
  );
}
