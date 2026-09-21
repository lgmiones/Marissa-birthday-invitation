import { ArrowUp } from "lucide-react";
import { EVENT } from "@/lib/event";
import FloatingDecorations from "./FloatingDecorations";
import { Paddle, Pickleball } from "./ui/Illustrations";
import { Reveal } from "./ui/Motion";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-linear-to-br from-petal via-cream to-pistachio px-4 pb-10 pt-20">
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-cream"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0 H1440 V20 C1080 80 360 80 0 20 Z" fill="currentColor" />
      </svg>
      <FloatingDecorations preset="footer" />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <div className="flex items-end justify-center gap-1" aria-hidden="true">
          <Paddle tone="blush" className="h-16 -rotate-[20deg]" />
          <Pickleball tone="pistachio" className="mb-1 size-9 animate-float [--float-d:3s] [--float-y:-10px]" />
          <Paddle tone="sage" className="h-16 rotate-[20deg]" />
        </div>
        <p className="mt-6 font-script text-4xl text-rose-deep sm:text-5xl">
          Can’t wait to celebrate with you! <span aria-hidden="true">💗</span>
        </p>
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.3em] text-ink-soft sm:text-sm">
          Marissa’s 60th Birthday · October 11, 2026
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-rose-deep sm:text-sm">
          {EVENT.rsvp}
        </p>

        <a
          href="#home"
          className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-white/70 px-5 py-2 text-sm text-ink ring-1 ring-blush/60 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
        >
          <ArrowUp className="size-4" aria-hidden="true" />
          Back to top
        </a>
      </Reveal>
    </footer>
  );
}
