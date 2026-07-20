import Link from "next/link";
import AuthLayout from "@/components/layout/AuthLayout";
import RegisterForm from "@/features/auth/RegisterForm";

export const metadata = { title: "Create account | PlacementHub" };

export default function RegisterPage() {
  return (
    <AuthLayout title="Create your account" subtitle="Set up your profile and start applying to drives.">
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-[var(--primary)] hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
