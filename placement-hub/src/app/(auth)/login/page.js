import Link from "next/link";
import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/features/auth/LoginForm";

export const metadata = { title: "Sign in | PlacementHub" };

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue to your dashboard.">
      <LoginForm />
      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        New to PlacementHub?{" "}
        <Link href="/register" className="font-medium text-[var(--primary)] hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
