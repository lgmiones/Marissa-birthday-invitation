"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { EVENT } from "@/lib/event";
import { PhotoFan, PhotoSides } from "./intro/MarizPhotos";
import { Blob, CourtArcs, Paddle, Pickleball } from "./ui/Illustrations";
import { EASE_LUXE } from "./ui/Motion";
import { PillButton } from "./ui/PillButton";

/* Fixed positions keep server and client markup identical (no Math.random). */
const PARTICLES = [
  { left: "8%", top: "22%", size: 8, shape: "dot", color: "bg-white", dur: 7, delay: 0.2 },
  { left: "18%", top: "72%", size: 6, shape: "dot", color: "bg-rose/60", dur: 8, delay: 0.8 },
  { left: "30%", top: "12%", size: 5, shape: "dot", color: "bg-sage", dur: 6, delay: 1.4 },
  { left: "72%", top: "16%", size: 7, shape: "dot", color: "bg-white", dur: 9, delay: 0.5 },
  { left: "86%", top: "38%", size: 5, shape: "dot", color: "bg-sage/80", dur: 7, delay: 1.1 },
  { left: "90%", top: "78%", size: 8, shape: "dot", color: "bg-white/90", dur: 8, delay: 0.3 },
  { left: "60%", top: "86%", size: 6, shape: "dot", color: "bg-rose/50", dur: 6.5, delay: 1.7 },
  { left: "12%", top: "44%", size: 12, shape: "confetti", color: "bg-sage/80", dur: 9, delay: 0.9 },
  { left: "80%", top: "58%", size: 12, shape: "confetti", color: "bg-rose/70", dur: 8, delay: 0.4 },
  { left: "40%", top: "90%", size: 10, shape: "confetti", color: "bg-white", dur: 7.5, delay: 1.2 },
  { left: "64%", top: "8%", size: 10, shape: "confetti", color: "bg-sage", dur: 8.5, delay: 1.6 },
  { left: "4%", top: "86%", size: 12, shape: "confetti", color: "bg-rose/60", dur: 9.5, delay: 0.7 },
] as const;

export default function IntroOverlay({ onEnter }: { onEnter: () => void }) {
  const reduce = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Compress the choreography when the guest prefers reduced motion.
  const at = (s: number) => (reduce ? s * 0.15 : s);

  useEffect(() => {
    const id = window.setTimeout(
      () => buttonRef.current?.focus({ preventScroll: true }),
      (reduce ? 0.6 : 4.2) * 1000,
    );
    return () => window.clearTimeout(id);
  }, [reduce]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE_LUXE, delay: at(delay) },
  });

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      aria-describedby="intro-desc"
      className="fixed inset-0 z-[100] flex h-[100svh] w-full items-center justify-center overflow-hidden bg-petal"
      exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
      transition={{ duration: 0.95, ease: EASE_LUXE }}
    >
      {/* Soft moving gradient wash */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-[20%] bg-[radial-gradient(40%_40%_at_30%_30%,#fff9f5_0%,transparent_70%),radial-gradient(35%_35%_at_75%_70%,#e8b4c1_0%,transparent_70%),radial-gradient(30%_30%_at_80%_20%,#dce6c9_0%,transparent_70%)]"
        animate={{ x: ["0%", "4%", "-3%", "0%"], y: ["0%", "-3%", "4%", "0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sage organic shapes */}
      <motion.div
        aria-hidden="true"
        className="absolute -left-28 -top-24 w-[22rem] text-sage-light sm:-left-20 sm:w-[30rem]"
        initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
        animate={{ opacity: 0.9, scale: 1, rotate: 0 }}
        transition={{ duration: 1.8, ease: EASE_LUXE, delay: at(0.15) }}
      >
        <Blob variant={0} className="w-full animate-drift" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-32 -right-24 w-[24rem] text-sage-light sm:w-[34rem]"
        initial={{ opacity: 0, scale: 0.6, rotate: 20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.8, ease: EASE_LUXE, delay: at(0.35) }}
      >
        <Blob variant={2} className="w-full animate-drift [animation-delay:-6s]" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute -right-16 top-[12%] hidden w-56 text-pistachio md:block"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE_LUXE, delay: at(0.55) }}
      >
        <Blob variant={1} className="w-full animate-drift [animation-delay:-3s]" />
      </motion.div>

      {/* Court arcs */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 w-[46rem] max-w-none -translate-x-1/2 -translate-y-1/2 text-white"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 2.2, ease: EASE_LUXE, delay: at(0.4) }}
      >
        <CourtArcs className="w-full animate-spin-slow" />
      </motion.div>

      {/* Floating particles & confetti */}
      <div aria-hidden="true" className="absolute inset-0">
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-full ${p.color} ${i > 7 ? "hidden sm:block" : ""}`}
            style={{
              left: p.left,
              top: p.top,
              width: p.shape === "dot" ? p.size : 4,
              height: p.size,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.8], y: [0, -24, 0], rotate: p.shape === "confetti" ? [0, 90, 180] : 0 }}
            transition={{
              opacity: { duration: 1.2, delay: at(0.6 + p.delay) },
              y: { duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay },
              rotate: { duration: p.dur, repeat: Infinity, ease: "linear" },
            }}
          />
        ))}
      </div>

      {/* Mariz, framed in arches either side of the headline (large screens) */}
      <PhotoSides at={at} />

      {/* Content — scrolls on very short screens instead of clipping */}
      <div className="absolute inset-0 z-10 flex overflow-y-auto overscroll-contain">
        <div className="relative m-auto flex w-full max-w-3xl flex-col items-center px-6 py-10 text-center">
          {/* Mariz, fanned above the headline (phones & tablets) */}
          <PhotoFan at={at} />

          {/* Bouncing pickleball + paddle */}
          <div className="relative mb-4 hidden h-28 items-end justify-center xl:flex" aria-hidden="true">
            <motion.div
              initial={{ x: "-60vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ x: { duration: at(2), ease: [0.25, 0.8, 0.4, 1], delay: at(0.5) }, opacity: { duration: 0.3, delay: at(0.5) } }}
            >
              <motion.div
                initial={{ y: -150 }}
                animate={{ y: [-150, 0, -80, 0, -34, 0, -10, 0] }}
                transition={{
                  duration: at(2),
                  delay: at(0.5),
                  times: [0, 0.28, 0.46, 0.62, 0.74, 0.85, 0.93, 1],
                  ease: ["easeIn", "easeOut", "easeIn", "easeOut", "easeIn", "easeOut", "easeIn"],
                }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 720 }}
                  transition={{ duration: at(2), delay: at(0.5), ease: "easeOut" }}
                >
                  <Pickleball tone="pistachio" className="size-14 drop-shadow-md sm:size-16" />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="-ml-1 origin-bottom"
              initial={{ opacity: 0, rotate: 60, x: 30 }}
              animate={{ opacity: 1, rotate: 18, x: 0 }}
              transition={{ duration: 0.9, ease: EASE_LUXE, delay: at(3.3) }}
            >
              <motion.div
                className="origin-bottom"
                animate={{ rotate: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: at(4.2) }}
              >
                <Paddle tone="blush" className="h-24 drop-shadow-md sm:h-28" />
              </motion.div>
            </motion.div>
          </div>

          <motion.p {...fadeUp(1.9)} className="font-script text-5xl leading-tight text-rose-deep sm:text-6xl">
            You’re Invited!
          </motion.p>

          <motion.h1
            id="intro-title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE_LUXE, delay: at(2.5) }}
            className="mt-1 font-display text-[clamp(3.2rem,12vw,7rem)] font-medium leading-[0.95] tracking-tight text-ink"
          >
            Pickle <span className="font-script text-[0.8em] font-normal text-rose-deep">&amp;</span> Party
          </motion.h1>

          <motion.p
            {...fadeUp(3.1)}
            className="mt-3 font-display text-3xl italic text-ink-soft sm:text-4xl"
          >
            Mariz Turns 60!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, ease: EASE_LUXE, delay: at(3.5) }}
            className="mt-6 flex items-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px w-14 bg-linear-to-r from-transparent to-rose-deep/60" />
            <span className="size-1.5 rounded-full bg-sage" />
            <span className="h-px w-14 bg-linear-to-l from-transparent to-rose-deep/60" />
          </motion.div>

          <motion.p
            id="intro-desc"
            {...fadeUp(3.6)}
            className="mt-4 flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-[0.32em] text-ink-soft sm:flex-row sm:gap-3 sm:text-sm"
          >
            <span>{EVENT.dateLabel}</span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span>{EVENT.venue}</span>
          </motion.p>

          <motion.p
            {...fadeUp(3.8)}
            className="mt-4 rounded-full border border-rose-deep/40 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-rose-deep sm:text-xs"
          >
            {EVENT.rsvp}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_LUXE, delay: at(4) }}
            className="mt-9"
          >
            <PillButton buttonRef={buttonRef} onClick={onEnter} className="px-9 text-base">
              Enter the Party
              <ArrowRight className="size-4" aria-hidden="true" />
            </PillButton>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
