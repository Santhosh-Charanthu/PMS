"use client";

import Card from "@/components/ui/Card";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import ProfileWizard from "@/features/profile/ProfileWizard";

export default function CreateProfilePage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto flex min-h-screen max-w-2xl items-center px-4 py-10">
        <div className="w-full">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-lexend)" }}>
              Set up your profile
            </h1>
            <p className="mt-1.5 text-sm text-[var(--muted)]">
              Recruiters see this first — let&apos;s make it count.
            </p>
          </div>
          <Card>
            <ProfileWizard />
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
