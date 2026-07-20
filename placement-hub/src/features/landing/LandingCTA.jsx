"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function LandingCTA() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl gradient-brand px-8 py-14 text-center text-white"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <h2 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-lexend)" }}>
          Ready for placement season?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-white/85">
          Set up your profile in minutes and start applying to drives the moment they open.
        </p>
        <Link href="/register" className="mt-7 inline-block">
          <Button size="lg" variant="secondary" className="bg-white text-[var(--primary)] hover:bg-white/90 border-none" icon={ArrowRight} iconPosition="right">
            Get started for free
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
