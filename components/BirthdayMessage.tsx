import FloatingDecorations from "./FloatingDecorations";
import { Pickleball } from "./ui/Illustrations";
import { Reveal } from "./ui/Motion";

export default function BirthdayMessage() {
  return (
    <section
      id="message"
      aria-labelledby="message-title"
      className="relative isolate overflow-hidden px-4 py-24 sm:py-32"
    >
      <FloatingDecorations preset="message" className="-z-10" />

      {/* Oversized 60 sitting behind the copy */}
      <Reveal direction="scale" className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <span
          aria-hidden="true"
          className="select-none bg-linear-to-br from-blush via-petal to-sage-light bg-clip-text font-display text-[clamp(16rem,48vw,36rem)] font-semibold leading-none text-transparent opacity-45"
        >
          60
        </span>
      </Reveal>

      <div className="mx-auto max-w-3xl text-center">
        <Reveal direction="fade">
          <div className="mx-auto flex w-fit items-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-rose/60" />
            <Pickleball tone="blush" className="size-7" />
            <span className="h-px w-10 bg-rose/60" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            id="message-title"
            className="mt-6 font-display text-[clamp(2.6rem,7vw,5rem)] font-medium leading-[1.02] text-balance text-ink"
          >
            60 Looks Good on You, <span className="italic text-rose-deep">Mariz!</span>
          </h2>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-pretty text-ink-soft sm:text-xl">
            Here’s to 60 years of wonderful memories, new adventures, great friends, and plenty more reasons to
            celebrate!
          </p>
        </Reveal>
        <Reveal delay={0.35} direction="fade">
          <p className="mt-10 font-script text-4xl text-rose-deep sm:text-5xl">Cheers to sixty!</p>
        </Reveal>
      </div>
    </section>
  );
}
