import type { CSSProperties } from "react";
import { Blob, Leaf, Paddle, Pickleball } from "./ui/Illustrations";

/*
  Ambient decoration layer. Pure CSS keyframes (compositor-only transforms)
  keep it cheap, and it renders as a Server Component. Items flagged
  `desktop` are hidden on small screens to simplify mobile layouts.
*/

type DecoKind = "dot" | "ring" | "confetti" | "leaf" | "ball" | "paddle" | "blob";

interface Deco {
  kind: DecoKind;
  className: string;
  float?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
  desktop?: boolean;
}

export type DecorationPreset = "hero" | "party" | "message" | "footer";

const PRESETS: Record<DecorationPreset, Deco[]> = {
  hero: [
    { kind: "dot", className: "left-[12%] top-[18%] size-3 bg-rose/70", float: -18, duration: 6 },
    { kind: "dot", className: "right-[22%] top-[14%] size-2 bg-sage", float: -12, duration: 7, delay: 1 },
    { kind: "ring", className: "left-[22%] bottom-[20%] size-10 border-2 border-blush", float: -16, duration: 9, desktop: true },
    { kind: "confetti", className: "right-[14%] bottom-[30%] h-4 w-1.5 bg-rose/60", rotate: 40, duration: 8, delay: 0.5 },
    { kind: "confetti", className: "left-[8%] top-[55%] h-3 w-1.5 bg-sage/80", rotate: -30, duration: 7, delay: 1.5, desktop: true },
    { kind: "confetti", className: "right-[32%] top-[24%] h-3 w-1 bg-blush", rotate: 25, duration: 6.5, delay: 2, desktop: true },
    { kind: "leaf", className: "left-[4%] bottom-[12%] w-8 text-sage-light", rotate: 12, duration: 10, desktop: true },
    { kind: "leaf", className: "right-[6%] top-[62%] w-6 text-sage/70", rotate: -14, duration: 9, delay: 2, desktop: true },
    { kind: "dot", className: "left-[45%] bottom-[10%] size-2 bg-rose/60", float: -10, duration: 5, delay: 0.8 },
  ],
  party: [
    { kind: "confetti", className: "left-[6%] top-[12%] h-4 w-1.5 bg-rose/60", rotate: 35, duration: 7 },
    { kind: "confetti", className: "right-[10%] top-[8%] h-3 w-1.5 bg-sage", rotate: -25, duration: 8, delay: 1 },
    { kind: "dot", className: "left-[40%] top-[6%] size-2.5 bg-blush", float: -14, duration: 6, delay: 0.4 },
    { kind: "ring", className: "right-[4%] bottom-[18%] size-12 border-2 border-sage-light", float: -20, duration: 10, desktop: true },
    { kind: "ball", className: "left-[3%] bottom-[10%] w-12", rotate: 20, duration: 8, delay: 0.6, desktop: true },
    { kind: "paddle", className: "right-[2%] top-[30%] w-10 rotate-[18deg]", rotate: 8, duration: 9, delay: 1.2, desktop: true },
    { kind: "confetti", className: "left-[48%] bottom-[6%] h-3 w-1 bg-rose/70", rotate: 50, duration: 6.5, delay: 2 },
  ],
  message: [
    { kind: "blob", className: "-left-24 top-10 w-72 text-petal/80 sm:w-96", duration: 20 },
    { kind: "blob", className: "-right-20 bottom-0 w-64 text-pistachio/90 sm:w-80", duration: 24, delay: 3 },
    { kind: "dot", className: "left-[18%] top-[22%] size-3 bg-rose/50", float: -16, duration: 7 },
    { kind: "dot", className: "right-[20%] top-[18%] size-2 bg-sage", float: -12, duration: 6, delay: 1 },
    { kind: "leaf", className: "right-[12%] bottom-[22%] w-8 text-sage-light", rotate: -12, duration: 9, desktop: true },
    { kind: "leaf", className: "left-[10%] bottom-[18%] w-6 text-blush", rotate: 14, duration: 10, delay: 1.5, desktop: true },
    { kind: "confetti", className: "left-[28%] bottom-[12%] h-4 w-1.5 bg-rose/50", rotate: 30, duration: 8, desktop: true },
  ],
  footer: [
    { kind: "dot", className: "left-[10%] top-[30%] size-2 bg-rose/60", float: -10, duration: 6 },
    { kind: "dot", className: "right-[14%] top-[24%] size-2.5 bg-sage", float: -12, duration: 7, delay: 1 },
    { kind: "confetti", className: "right-[28%] bottom-[24%] h-3 w-1 bg-rose/60", rotate: 35, duration: 7, desktop: true },
    { kind: "confetti", className: "left-[26%] bottom-[30%] h-3 w-1 bg-sage/80", rotate: -35, duration: 8, delay: 1, desktop: true },
  ],
};

function Shape({ kind }: { kind: DecoKind }) {
  switch (kind) {
    case "leaf":
      return <Leaf className="w-full" />;
    case "ball":
      return <Pickleball className="w-full drop-shadow-sm" tone="blush" />;
    case "paddle":
      return <Paddle className="w-full drop-shadow-sm" tone="sage" />;
    case "blob":
      return <Blob className="w-full" variant={1} />;
    default:
      return null;
  }
}

const SHAPE_CLASS: Partial<Record<DecoKind, string>> = {
  dot: "rounded-full",
  ring: "rounded-full",
  confetti: "rounded-full",
};

export default function FloatingDecorations({
  preset,
  className = "",
}: {
  preset: DecorationPreset;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {PRESETS[preset].map((d, i) => {
        const style = {
          "--float-y": `${d.float ?? -14}px`,
          "--float-r": `${d.rotate ?? 6}deg`,
          "--float-d": `${d.duration ?? 7}s`,
          "--float-delay": `${d.delay ?? 0}s`,
        } as CSSProperties;
        const anim = d.kind === "blob" ? "animate-drift" : "animate-float";
        return (
          <div
            key={i}
            style={style}
            className={`absolute will-change-transform ${anim} ${SHAPE_CLASS[d.kind] ?? ""} ${
              d.desktop ? "hidden md:block" : ""
            } ${d.className}`}
          >
            <Shape kind={d.kind} />
          </div>
        );
      })}
    </div>
  );
}
