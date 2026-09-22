import { CircleDot, Shirt, Sparkles } from "lucide-react";
import FloatingDecorations from "./FloatingDecorations";
import { Paddle, Pickleball } from "./ui/Illustrations";
import { Floating, Reveal, Stagger, StaggerItem } from "./ui/Motion";

const PERKS = [
  { icon: CircleDot, text: "Bring your own paddle" },
  { icon: Shirt, text: "Sports attire, your way" },
  { icon: Sparkles, text: "Every skill level welcome" },
];

/** Abstract, invitation-style take on a pickleball court (top-down). */
function CourtVisual() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
      <div className="absolute inset-0 rotate-[-4deg] rounded-[3rem] bg-linear-to-br from-sage-light via-sage to-[#95a687] shadow-lift" />
      <div className="absolute inset-0 rotate-[-4deg] overflow-hidden rounded-[3rem]">
        <svg viewBox="0 0 400 500" className="h-full w-full" aria-hidden="true" focusable="false" fill="none">
          {/* curved white flourish lines */}
          <path d="M-20 90 C 120 20, 280 20, 420 90" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" />
          <path d="M-20 410 C 120 480, 280 480, 420 410" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx="200" cy="250" r="190" stroke="#fff" strokeOpacity="0.18" strokeDasharray="2 9" />

          {/* kitchen (non-volley) zones in blush */}
          <rect x="80" y="180" width="240" height="68" fill="#F3D0D8" fillOpacity="0.8" />
          <rect x="80" y="252" width="240" height="68" fill="#F3D0D8" fillOpacity="0.8" />

          {/* court lines */}
          <rect x="80" y="60" width="240" height="380" rx="6" stroke="#fff" strokeWidth="3" />
          <path d="M80 180 H320 M80 320 H320" stroke="#fff" strokeWidth="3" />
          <path d="M200 60 V180 M200 320 V440" stroke="#fff" strokeWidth="3" />

          {/* net */}
          <path d="M60 250 H340" stroke="#465448" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 250 H340" stroke="#fff" strokeWidth="1.5" strokeDasharray="3 5" />
          <circle cx="60" cy="250" r="6" fill="#fff" />
          <circle cx="340" cy="250" r="6" fill="#fff" />

          {/* serve arc */}
          <path d="M140 400 Q 210 300 262 212" stroke="#D9959F" strokeWidth="2" strokeDasharray="4 7" strokeLinecap="round" />
        </svg>
      </div>

      <Floating className="absolute -left-6 top-10 w-20 sm:-left-10 sm:w-24" amplitude={15} rotate={8} duration={5}>
        <Paddle tone="blush" className="w-full -rotate-[24deg] drop-shadow-lg" />
      </Floating>
      <Floating
        className="absolute -right-4 bottom-16 w-20 sm:-right-8 sm:w-24"
        amplitude={12}
        rotate={-8}
        duration={6}
        delay={0.8}
      >
        <Paddle tone="cream" className="w-full rotate-[20deg] drop-shadow-lg" />
      </Floating>
      <Floating className="absolute left-[56%] top-[36%] w-12 sm:w-14" amplitude={18} rotate={12} duration={3.2}>
        <Pickleball tone="cream" className="w-full drop-shadow-md" />
      </Floating>
      <Floating className="absolute -top-6 right-10 w-10" amplitude={10} duration={4.5} delay={1.2}>
        <Pickleball tone="blush" className="w-full drop-shadow" />
      </Floating>
    </div>
  );
}

export default function PickleballSection() {
  return (
    <section
      id="pickle"
      aria-labelledby="pickle-title"
      className="relative overflow-hidden bg-linear-to-b from-cream via-petal/45 to-cream px-4 py-24 sm:py-28"
    >
      {/* curved pastel bands */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full text-cream"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0 H1440 V40 C1080 100 360 100 0 40 Z" fill="currentColor" />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 size-[26rem] rounded-full bg-pistachio/60 blur-3xl"
      />
      <FloatingDecorations preset="party" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="text-center lg:text-left">
          <Reveal direction="fade">
            <p className="font-script text-3xl text-rose-deep sm:text-4xl">paddles up</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="pickle-title"
              className="mt-1 font-display text-4xl font-medium leading-[1.05] text-balance text-ink sm:text-5xl lg:text-6xl"
            >
              Let’s Get Our Pickle On!
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-pretty text-ink-soft sm:text-lg lg:mx-0">
              Grab your paddle, wear your favorite sport’s attire, and get ready for an evening of pickleball,
              laughs, and celebration!
            </p>
          </Reveal>

          <Stagger className="mx-auto mt-8 flex max-w-lg flex-col gap-3 lg:mx-0" delay={0.2}>
            {PERKS.map(({ icon: Icon, text }) => (
              <StaggerItem key={text} direction="left">
                <div className="flex items-center gap-4 rounded-2xl bg-white/70 px-5 py-4 text-left shadow-soft ring-1 ring-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-pistachio text-ink">
                    <Icon className="size-5" aria-hidden="true" strokeWidth={1.7} />
                  </span>
                  <span className="font-medium text-ink">{text}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal direction="right" className="px-6 sm:px-10">
          <CourtVisual />
        </Reveal>
      </div>
    </section>
  );
}
