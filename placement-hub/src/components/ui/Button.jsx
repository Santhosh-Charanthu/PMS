"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary:
    "gradient-brand text-white shadow-sm shadow-blue-600/20 hover:brightness-110",
  secondary:
    "bg-white text-[var(--foreground)] border border-[var(--border)] hover:bg-slate-50 dark:bg-transparent dark:hover:bg-white/5",
  ghost: "text-[var(--foreground)] hover:bg-slate-100 dark:hover:bg-white/5",
  danger: "bg-[var(--danger)] text-white hover:brightness-110",
  outline:
    "border border-[var(--primary)] text-[var(--primary)] hover:bg-blue-50 dark:hover:bg-blue-500/10",
};

const SIZES = {
  sm: "h-8 px-3 text-sm rounded-lg gap-1.5",
  md: "h-10 px-4 text-sm rounded-xl gap-2",
  lg: "h-12 px-6 text-base rounded-xl gap-2",
};

const Button = forwardRef(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      icon: Icon,
      iconPosition = "left",
      as: Comp = "button",
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors duration-150 focus-ring disabled:opacity-50 disabled:cursor-not-allowed",
          VARIANTS[variant],
          SIZES[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          Icon && iconPosition === "left" && <Icon className="h-4 w-4" />
        )}
        {children}
        {!isLoading && Icon && iconPosition === "right" && (
          <Icon className="h-4 w-4" />
        )}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export default Button;
