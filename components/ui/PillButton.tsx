"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type PillVariant = "primary" | "secondary" | "tertiary";

const VARIANTS: Record<PillVariant, string> = {
  primary:
    "bg-ink text-cream shadow-soft hover:bg-[#3b483d] hover:shadow-lift hover:shadow-rose/40",
  secondary:
    "bg-white/80 text-ink ring-1 ring-blush/70 backdrop-blur hover:bg-petal hover:ring-rose hover:shadow-soft",
  tertiary:
    "bg-linear-to-r from-blush to-rose text-ink hover:from-rose hover:to-blush hover:shadow-lift",
};

const BASE =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-[0.95rem] font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 cursor-pointer";

interface CommonProps {
  children: ReactNode;
  variant?: PillVariant;
  className?: string;
}

interface LinkPillProps extends CommonProps {
  href: string;
}

export function PillLink({ children, href, variant = "primary", className = "" }: LinkPillProps) {
  return (
    <motion.a
      href={href}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

interface ButtonPillProps extends CommonProps {
  onClick?: () => void;
  ariaLabel?: string;
  buttonRef?: React.Ref<HTMLButtonElement>;
}

export function PillButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
  buttonRef,
}: ButtonPillProps) {
  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}
