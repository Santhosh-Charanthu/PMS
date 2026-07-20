import LandingHero from "@/features/landing/LandingHero";
import LandingFeatures from "@/features/landing/LandingFeatures";
import LandingCTA from "@/features/landing/LandingCTA";
import LandingNav from "@/features/landing/LandingNav";
import LandingFooter from "@/features/landing/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <LandingNav />
      <LandingHero />
      <LandingFeatures />
      <LandingCTA />
      <LandingFooter />
    </div>
  );
}
