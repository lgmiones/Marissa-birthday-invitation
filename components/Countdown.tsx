"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event";
import { CourtArcs, Pickleball } from "./ui/Illustrations";
import { EASE_LUXE, Reveal, Stagger, StaggerItem } from "./ui/Motion";
import SectionHeading from "./ui/SectionHeading";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const TARGET = new Date(EVENT.startISO).getTime();

function getTimeLeft(now = Date.now()): TimeLeft {
  const diff = Math.max(0, TARGET - now);
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: diff === 0,
  };
}

const UNITS = [
  { key: "days", label: "Days", tone: "bg-linear-to-br from-petal to-blush/70" },
  { key: "hours", label: "Hours", tone: "bg-linear-to-br from-pistachio to-sage-light" },
  { key: "minutes", label: "Minutes", tone: "bg-linear-to-br from-petal to-blush/70" },
  { key: "seconds", label: "Seconds", tone: "bg-linear-to-br from-pistachio to-sage-light" },
] as const;

function Digit({ value }: { value: string }) {
  return (
    <span className="relative flex h-[1.15em] items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "70%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-70%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: EASE_LUXE }}
          className="block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Countdown() {
  // null until mounted so server and client markup match.
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setLeft(getTimeLeft());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="countdown" aria-labelledby="countdown-title" className="relative px-4 py-12 sm:py-16">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-pistachio/70 via-cream to-petal/70 px-5 py-16 shadow-soft ring-1 ring-white sm:rounded-[3rem] sm:px-12 sm:py-20">
        <CourtArcs className="pointer-events-none absolute -right-40 -top-40 w-[36rem] max-w-none text-sage/25" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -left-10 hidden w-24 animate-float [--float-d:6s] sm:block"
        >
          <Pickleball tone="blush" className="w-full opacity-80" />
        </div>

        <SectionHeading
          id="countdown-title"
          eyebrow="counting down"
          title="Until We Serve"
          description={`${EVENT.dayLabel}, ${EVENT.dateLabel} · ${EVENT.startLabel}`}
        />

        {left?.done ? (
          <Reveal direction="scale" className="relative mt-12 text-center">
            <PartyPopper className="mx-auto size-12 text-rose-deep" aria-hidden="true" strokeWidth={1.5} />
            <p className="mt-4 font-script text-6xl text-rose-deep sm:text-7xl" role="status">
              Let the party begin!
            </p>
          </Reveal>
        ) : (
          <Stagger className="relative mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {UNITS.map(({ key, label, tone }) => {
              const raw = left ? left[key] : null;
              const value = raw === null ? "--" : String(raw).padStart(2, "0");
              return (
                <StaggerItem key={key} direction="scale">
                  <div
                    className={`group relative overflow-hidden rounded-[1.75rem] p-5 text-center shadow-soft ring-1 ring-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-6 ${tone}`}
                  >
                    <span aria-hidden="true" className="absolute -right-6 -top-6 size-16 rounded-full bg-white/40" />
                    <div className="relative font-display text-5xl font-semibold tabular-nums text-ink sm:text-6xl">
                      <Digit value={value} />
                    </div>
                    <p className="relative mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink-soft">
                      {label}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}

        {left && !left.done && (
          <p className="sr-only" aria-live="off">
            {left.days} days, {left.hours} hours and {left.minutes} minutes until the party.
          </p>
        )}
      </div>
    </section>
  );
}
