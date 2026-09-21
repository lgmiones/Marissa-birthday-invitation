import { Reveal } from "./Motion";

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

/** Script eyebrow + serif title + optional lede, revealed on scroll. */
export default function SectionHeading({ id, eyebrow, title, description, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      <Reveal direction="fade">
        <p className="font-script text-3xl text-rose-deep sm:text-4xl">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={id}
          className="mt-1 font-display text-4xl font-medium leading-[1.05] text-balance text-ink sm:text-5xl lg:text-6xl"
        >
          {title}
        </h2>
      </Reveal>
      <Reveal direction="fade" delay={0.2}>
        <div className="mx-auto mt-5 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-12 bg-linear-to-r from-transparent to-rose" />
          <span className="size-1.5 rounded-full bg-sage" />
          <span className="h-px w-12 bg-linear-to-l from-transparent to-rose" />
        </div>
      </Reveal>
      {description && (
        <Reveal delay={0.25}>
          <p className="mt-5 text-base leading-relaxed text-pretty text-ink-soft sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
