"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Card({ children, className, hover = false, as: Comp = motion.div, ...props }) {
  return (
    <Comp
      className={cn(
        "card-surface p-6 shadow-sm shadow-slate-900/[0.02]",
        hover && "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-900/[0.06]",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
