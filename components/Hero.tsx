"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { CalendarDays, MailCheck, MapPin } from "lucide-react";
import { useRef } from "react";
import { EVENT } from "@/lib/event";
import FloatingDecorations from "./FloatingDecorations";
import { useInvite } from "./InviteProvider";
import { Blob, CourtArcs, Paddle, Pickleball } from "./ui/Illustrations";
import { EASE_LUXE } from "./ui/Motion";
import { PillLink } from "./ui/PillButton";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_LUXE } },
};

export default function Hero() {
  const { entered } = useInvite();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yBack = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const state = entered ? "show" : "hidden";

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pb-24 pt-32 sm:pt-36"
    >
      {/* Back layer: washes, blobs, court arcs */}
      <motion.div style={{ y: yBack }} className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,#f3d0d8_0%,transparent_70%),radial-gradient(40%_40%_at_0%_100%,#dce6c9_0%,transparent_70%)]" />
        <Blob variant={0} className="absolute -right-40 -top-32 w-[28rem] text-blush/45 sm:w-[40rem]" />
        <Blob variant={2} className="absolute -bottom-40 -left-40 w-[26rem] text-sage-light/70 sm:w-[36rem]" />
        <CourtArcs className="absolute left-1/2 top-1/2 w-[48rem] max-w-none -translate-x-1/2 -translate-y-1/2 text-rose/25 sm:w-[60rem]" />
        <div className="absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />
      </motion.div>

      <FloatingDecorations preset="hero" className="-z-10" />

      {/* Front layer: pickleballs & paddles */}
      <motion.div style={{ y: yFront }} className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          className="absolute left-[4%] top-[16%] w-14 sm:top-[12%] sm:w-20 lg:left-[7%] lg:top-[22%] lg:w-24"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={entered ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: EASE_LUXE, delay: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, -26, 0], rotate: [0, 25, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Pickleball tone="pistachio" className="w-full drop-shadow-lg" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute right-[3%] top-[12%] w-12 sm:top-[42%] sm:w-20 lg:right-[7%] lg:top-[18%] lg:w-24"
          initial={{ opacity: 0, rotate: 50 }}
          animate={entered ? { opacity: 1, rotate: 22 } : {}}
          transition={{ duration: 1.2, ease: EASE_LUXE, delay: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Paddle tone="blush" className="w-full drop-shadow-lg" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-[10%] right-[16%] hidden w-12 md:block"
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Pickleball tone="blush" className="w-full drop-shadow" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-[14%] left-[14%] hidden w-16 -rotate-[28deg] lg:block"
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <Paddle tone="sage" className="w-full drop-shadow" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: yContent, opacity: fade }}
        variants={container}
        initial="hidden"
        animate={state}
        className="relative mx-auto max-w-4xl text-center"
      >
        <motion.p
          variants={item}
          className="text-[0.7rem] font-medium uppercase tracking-[0.4em] text-ink-soft sm:text-xs"
        >
          A 60th Birthday Invitation
        </motion.p>

        <motion.h1
          id="hero-title"
          variants={item}
          className="mt-5 font-display text-[clamp(3.4rem,13vw,8.5rem)] font-medium leading-[0.9] tracking-tight text-ink"
        >
          Pickle <span className="font-script text-[0.78em] font-normal text-rose-deep">&amp;</span> Party
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-2 font-script text-[clamp(3rem,10vw,6.5rem)] leading-[1.1] text-rose-deep"
        >
          Mariz Turns 60!
        </motion.p>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-ink-soft sm:text-lg"
        >
          Come celebrate Mariz' 60 fabulous years with pickleball, laughter, and a whole lot of fun!
        </motion.p>

        <motion.ul
          variants={item}
          className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-ink sm:gap-3"
        >
          <li className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 ring-1 ring-blush/60 backdrop-blur">
            <CalendarDays className="size-4 text-rose-deep" aria-hidden="true" />
            {EVENT.dayLabel}, {EVENT.dateLabel} · {EVENT.startLabel}
          </li>
          <li className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 ring-1 ring-sage-light backdrop-blur">
            <MapPin className="size-4 text-ink-soft" aria-hidden="true" />
            {EVENT.venue}
          </li>
          <li className="flex items-center gap-2 rounded-full bg-petal/80 px-4 py-2 font-medium text-rose-deep ring-1 ring-blush backdrop-blur">
            <MailCheck className="size-4" aria-hidden="true" />
            {EVENT.rsvp}
          </li>
        </motion.ul>

        <motion.p variants={item} className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-pretty text-ink-soft">
          Please contact <span className="font-semibold text-rose-deep">{EVENT.rsvpContacts}</span>{" "}
          <span className="whitespace-nowrap">
            before <span className="font-semibold text-rose-deep">{EVENT.rsvpDeadline}</span>.
          </span>
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <PillLink href="#details" variant="secondary" className="w-full max-w-xs sm:w-auto">
            See the Details
          </PillLink>
          <PillLink href="#party" variant="tertiary" className="w-full max-w-xs sm:w-auto">
            Let’s Celebrate!
          </PillLink>
        </motion.div>
      </motion.div>

      <motion.a
        href="#details"
        aria-label="Scroll to event details"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft sm:flex"
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1 }}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-rose/30">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-rose-deep"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
