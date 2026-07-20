"use client";

import { UserPlus } from "lucide-react";
import DashboardShell from "@/components/layout/DashboardShell";
import { useProfile } from "@/hooks/useProfile";
import { Skeleton } from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import ProfileView from "@/features/profile/ProfileView";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { profile, setProfile, isLoading, error, notFound, refetch } = useProfile();
  const router = useRouter();

  return (
    <DashboardShell title="My Profile">
      {isLoading && (
        <div className="space-y-6">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      )}
      {!isLoading && error && <ErrorState onRetry={refetch} />}
      {!isLoading && notFound && (
        <EmptyState
          icon={UserPlus}
          title="You haven't created a profile yet"
          description="Add your academic details, skills, and resume to start applying to drives."
          action={<Button onClick={() => router.push("/profile/create")}>Create profile</Button>}
        />
      )}
      {!isLoading && !error && !notFound && profile && (
        <ProfileView profile={profile} onUpdated={setProfile} />
      )}
    </DashboardShell>
  );
}
