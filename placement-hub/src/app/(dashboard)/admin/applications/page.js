"use client";

import { Suspense } from "react";
import AdminApplicationsContent from "./AdminApplicationsContent";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default function AdminApplicationsPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <Suspense fallback={null}>
        <AdminApplicationsContent />
      </Suspense>
    </ProtectedRoute>
  );
}
