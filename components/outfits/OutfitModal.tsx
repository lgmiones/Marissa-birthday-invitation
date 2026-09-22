"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Droplets, Footprints, Heart, Wind } from "lucide-react";
import { useState, type CSSProperties, type ReactNode } from "react";
import Modal from "../ui/Modal";
import { EASE_LUXE } from "../ui/Motion";
import { Bag, Bottle, Cap, Shoe, Shorts, Skort, Socks, Tank, Tee, Visor, Wristband } from "./OutfitArt";

type LookKey = "her" | "his";

type Art = (className: string) => ReactNode;

interface Look {
  label: string;
  hero: { top: Art; shirt: Art; bottom: Art; shoe: Art };
  pieces: { name: string; art: Art }[];
}

const herShoe: Art = (c) => <Shoe className={c} />;
const hisShoe: Art = (c) => <Shoe className={c} upper="#FFFDFB" stripe="#A8B79A" heel="#C8D5B9" />;
const socks: Art = (c) => <Socks className={c} />;
const bag: Art = (c) => <Bag className={c} />;
const bottle: Art = (c) => <Bottle className={c} />;
const band: Art = (c) => <Wristband className={c} />;

const LOOKS: Record<LookKey, Look> = {
  her: {
    label: "Her Look",
    hero: {
      top: (c) => <Visor className={c} />,
      shirt: (c) => <Tank className={c} />,
      bottom: (c) => <Skort className={c} />,
      shoe: herShoe,
    },
    pieces: [
      { name: "Athletic Tank", art: (c) => <Tank className={c} /> },
      { name: "Pleated Skort", art: (c) => <Skort className={c} /> },
      { name: "Court Shoes", art: herShoe },
      { name: "Athletic Socks", art: socks },
      { name: "Sport Visor", art: (c) => <Visor className={c} /> },
      { name: "Wristband", art: band },
      { name: "Paddle Bag", art: bag },
      { name: "Water Bottle", art: bottle },
    ],
  },
  his: {
    label: "His Look",
    hero: {
      top: (c) => <Cap className={c} />,
      shirt: (c) => <Tee className={c} />,
      bottom: (c) => <Shorts className={c} />,
      shoe: hisShoe,
    },
    pieces: [
      { name: "Performance Tee", art: (c) => <Tee className={c} /> },
      { name: "Athletic Shorts", art: (c) => <Shorts className={c} /> },
      { name: "Court Shoes", art: hisShoe },
      { name: "Athletic Socks", art: socks },
      { name: "Sport Cap", art: (c) => <Cap className={c} /> },
      { name: "Wristband", art: band },
      { name: "Paddle Bag", art: bag },
      { name: "Water Bottle", art: bottle },
    ],
  },
};

const TIPS = [
  { icon: Footprints, text: "Non-marking court shoes" },
  { icon: Wind, text: "Light, breathable fabrics" },
  { icon: Droplets, text: "Stay hydrated" },
];

const float = (d: number, delay: number, y = -8, r = 3) =>
  ({ "--float-d": `${d}s`, "--float-delay": `${delay}s`, "--float-y": `${y}px`, "--float-r": `${r}deg` }) as CSSProperties;

const pop = (i: number) => ({
  initial: { opacity: 0, y: 24, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.95 },
  transition: { duration: 0.6, ease: EASE_LUXE, delay: 0.1 + i * 0.07 },
});

/** The flat-lay "outfit on the court" composition. */
function LookHero({ look }: { look: Look }) {
  const { top, shirt, bottom, shoe } = look.hero;
  return (
    <div className="relative isolate aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-linear-to-b from-sage-light via-sage to-[#93a586] sm:rounded-[2rem]">
      {/* court lines */}
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 -z-10 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        fill="none"
      >
        <rect x="-20" y="330" width="440" height="200" fill="#F3D0D8" fillOpacity="0.35" />
        <path d="M-20 330 H420 M200 330 V520" stroke="#fff" strokeOpacity="0.7" strokeWidth="3" />
        <path d="M40 -10 V520 M360 -10 V520" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" />
        <circle cx="200" cy="200" r="150" fill="#FFF9F5" fillOpacity="0.4" />
        <circle cx="200" cy="200" r="182" stroke="#fff" strokeOpacity="0.35" strokeDasharray="2 9" />
      </svg>

      {/* the outfit, stacked like a flat-lay */}
      <div className="absolute inset-x-0 top-[7%] flex flex-col items-center">
        <motion.div {...pop(0)} className="w-[22%]">
          <div className="animate-float" style={float(6, 0, -6)}>
            {top("w-full drop-shadow-md")}
          </div>
        </motion.div>
        <motion.div {...pop(1)} className="-mt-[3%] w-[36%]">
          <div className="animate-float" style={float(7, 0.4, -5, 2)}>
            {shirt("w-full drop-shadow-lg")}
          </div>
        </motion.div>
        <motion.div {...pop(2)} className="-mt-[7%] w-[38%]">
          <div className="animate-float" style={float(7.5, 0.8, -5, -2)}>
            {bottom("w-full drop-shadow-lg")}
          </div>
        </motion.div>
        <motion.div {...pop(3)} className="-mt-[2%] flex w-[52%] items-end justify-center">
          <Socks className="-mr-[6%] w-[30%] drop-shadow-sm" />
          <div className="w-[36%] -scale-x-100">{shoe("w-full drop-shadow-md")}</div>
          <div className="-ml-[4%] w-[36%]">{shoe("w-full drop-shadow-md")}</div>
        </motion.div>
      </div>

      <motion.div {...pop(4)} className="absolute bottom-[4%] left-[3%] w-[27%] -rotate-[10deg]">
        <Bag className="w-full drop-shadow-lg" />
      </motion.div>
      <motion.div {...pop(5)} className="absolute bottom-[6%] right-[7%] w-[13%] rotate-[8deg]">
        <Bottle className="w-full drop-shadow-lg" />
      </motion.div>

      {/* hand-lettered callouts */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: -9 }}
        transition={{ duration: 0.7, ease: EASE_LUXE, delay: 0.5 }}
        className="absolute left-[4%] top-[4%] flex aspect-square w-[27%] flex-col items-center justify-center rounded-[46%_54%_50%_50%] bg-petal text-center font-script text-[clamp(1rem,3.4vw,1.35rem)] leading-[1.05] text-rose-deep shadow-md"
      >
        Play
        <br />
        Look Good
        <br />
        Feel Amazing
        <Heart className="mt-0.5 size-3.5" aria-hidden="true" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="absolute left-[5%] top-[40%] -rotate-[8deg] font-script text-[clamp(1.35rem,4.2vw,1.9rem)] leading-[0.95] text-white [text-shadow:0_2px_12px_rgb(70_84_72/0.35)]"
      >
        Good Game
        <br />
        Good People <span aria-hidden="true">♡</span>
      </motion.p>
    </div>
  );
}

export default function OutfitModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lookKey, setLookKey] = useState<LookKey>("her");
  const look = LOOKS[lookKey];

  return (
    <Modal open={open} onClose={onClose} labelledBy="outfit-title" className="sm:max-w-5xl">
      <div className="grid gap-5 p-4 pt-5 sm:p-7 md:grid-cols-[1fr_1.1fr] md:grid-rows-[auto_1fr] md:gap-x-8 md:gap-y-5 md:p-8">
        {/* Phones: title → picture → pieces. Desktop: picture left, title + pieces right. */}
        <div className="md:col-start-2 md:row-start-1">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-ink-soft">What to wear</p>
          <h2 id="outfit-title" className="mt-2 pr-12 leading-none">
            <span className="block font-display text-[clamp(2.6rem,7vw,3.9rem)] font-semibold uppercase tracking-tight text-rose-deep">
              Pickleball
            </span>
            <span className="-mt-1 flex items-center gap-2 font-script text-[clamp(2.6rem,7vw,3.6rem)] text-ink">
              Outfit Goals
              <Heart className="size-7 text-rose-deep" strokeWidth={1.5} aria-hidden="true" />
            </span>
          </h2>
          <p className="mt-3 inline-block -rotate-[1.5deg] rounded-[0.6rem_1.2rem_0.8rem_1.4rem] bg-blush px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-ink shadow-sm sm:text-sm">
            Sporty · Cute · Court Ready.
          </p>

          {/* look switcher */}
          <div
            className="mt-6 inline-flex rounded-full bg-white p-1 shadow-soft ring-1 ring-blush/50"
            role="group"
            aria-label="Choose a look"
          >
            {(Object.keys(LOOKS) as LookKey[]).map((key) => {
              const active = key === lookKey;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setLookKey(key)}
                  className={`relative min-h-10 cursor-pointer rounded-full px-5 text-sm font-medium transition-colors duration-300 ${
                    active ? "text-cream" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="look-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{LOOKS[key].label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-start-1 md:row-span-2 md:row-start-1 md:self-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={lookKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LookHero look={look} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* the pieces */}
        <div className="md:col-start-2 md:row-start-2">
          <AnimatePresence mode="wait">
            <motion.ul
              key={lookKey}
              className="grid grid-cols-2 gap-2.5 sm:gap-3"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}
            >
              {look.pieces.map((p) => (
                <motion.li
                  key={p.name}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_LUXE } },
                  }}
                  className="group flex items-center gap-3 rounded-2xl bg-white/80 p-2.5 ring-1 ring-blush/35 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft sm:p-3"
                >
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-petal/50 transition-transform duration-300 group-hover:-rotate-6 sm:size-16">
                    {p.art("w-[82%]")}
                  </span>
                  <span className="text-[0.68rem] font-semibold uppercase leading-snug tracking-[0.14em] text-ink sm:text-xs">
                    {p.name}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>

      {/* footer strip */}
      <div className="border-t border-blush/40 bg-linear-to-r from-petal/70 via-cream to-pistachio/70 px-4 py-5 sm:px-8">
        <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {TIPS.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-medium text-ink ring-1 ring-white sm:text-sm"
            >
              <Icon className="size-4 text-rose-deep" aria-hidden="true" strokeWidth={1.8} />
              {text}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-sm text-ink-soft">
          Just inspiration — come in whatever sports attire makes you feel fabulous!
        </p>
      </div>
    </Modal>
  );
}
