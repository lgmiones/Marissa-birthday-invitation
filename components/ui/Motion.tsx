"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

export type RevealDirection = "up" | "left" | "right" | "scale" | "fade";

const HIDDEN: Record<RevealDirection, { opacity: number; x?: number; y?: number; scale?: number }> = {
  up: { opacity: 0, y: 32 },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
  scale: { opacity: 0, scale: 0.92 },
  fade: { opacity: 0 },
};

const revealVariants = (direction: RevealDirection, delay = 0): Variants => ({
  hidden: HIDDEN[direction],
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: EASE_LUXE, delay },
  },
});

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  amount?: number;
}

/** Animates its children in once when scrolled into view. */
export function Reveal({ children, className, direction = "up", delay = 0, amount = 0.3 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={revealVariants(direction, delay)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}

/** Parent that reveals each <StaggerItem> one after another. */
export function Stagger({ children, className, stagger = 0.12, delay = 0, amount = 0.2 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
}

export function StaggerItem({ children, className, direction = "up" }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={revealVariants(direction)}>
      {children}
    </motion.div>
  );
}

interface FloatingProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
}

/** Gentle, endless bob-and-sway — used for pickleballs and paddles. */
export function Floating({
  children,
  className,
  amplitude = 15,
  rotate = 8,
  duration = 6,
  delay = 0,
}: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0], rotate: [0, rotate, -rotate, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
