import { CalendarDays, CircleDot, MailCheck, MapPin, PartyPopper, Shirt, type LucideIcon } from "lucide-react";
import { EVENT } from "@/lib/event";
import SectionHeading from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Motion";

type Tone = "pink" | "sage" | "cream";

interface DetailCard {
  label: string;
  title: string;
  sub?: string;
  icon: LucideIcon;
  tone: Tone;
}

const CARDS: DetailCard[] = [
  { label: "What", title: EVENT.occasion, icon: PartyPopper, tone: "pink" },
  { label: "When", title: EVENT.dateLabel, sub: EVENT.timeLabel, icon: CalendarDays, tone: "sage" },
  { label: "Where", title: EVENT.venue, sub: EVENT.venueLabel, icon: MapPin, tone: "cream" },
  { label: "Wear", title: EVENT.attire, icon: Shirt, tone: "sage" },
  { label: "Don’t Forget", title: EVENT.note, icon: CircleDot, tone: "pink" },
  { label: "RSVP", title: EVENT.rsvp, sub: "Kindly confirm your attendance", icon: MailCheck, tone: "cream" },
];

const TONES: Record<Tone, { card: string; icon: string; orb: string }> = {
  pink: {
    card: "bg-linear-to-br from-petal via-[#f7dde3] to-blush/70",
    icon: "bg-white/80 text-rose-deep",
    orb: "bg-white/40",
  },
  sage: {
    card: "bg-linear-to-br from-pistachio via-[#e5ecd7] to-sage-light",
    icon: "bg-white/80 text-ink",
    orb: "bg-white/45",
  },
  cream: {
    card: "bg-linear-to-br from-white to-cream ring-1 ring-blush/50",
    icon: "bg-petal text-rose-deep",
    orb: "bg-pistachio/60",
  },
};

export default function EventDetails() {
  return (
    <section id="details" aria-labelledby="details-title" className="relative px-4 py-20 sm:py-24">
      <SectionHeading
        id="details-title"
        eyebrow="mark your calendar"
        title="Save the Date"
        description="Everything you need to know for an unforgettable evening on (and off) the court."
      />

      <Stagger className="mx-auto mt-14 flex max-w-6xl flex-wrap justify-center gap-5 sm:gap-6" stagger={0.1}>
        {CARDS.map(({ label, title, sub, icon: Icon, tone }) => {
          const t = TONES[tone];
          return (
            <StaggerItem
              key={label}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <article
                className={`group relative h-full overflow-hidden rounded-[2rem] p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift sm:p-8 ${t.card}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute -right-10 -top-10 size-32 rounded-full transition-transform duration-500 group-hover:scale-125 ${t.orb}`}
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-12 -left-12 size-28 rounded-full border border-white/60"
                />
                <div className="relative">
                  <span
                    className={`flex size-14 items-center justify-center rounded-full shadow-sm transition-transform duration-300 group-hover:rotate-12 ${t.icon}`}
                  >
                    <Icon className="size-6" aria-hidden="true" strokeWidth={1.6} />
                  </span>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">{label}</p>
                  <h3 className="mt-2 font-display text-3xl font-medium leading-tight text-ink">{title}</h3>
                  {sub && <p className="mt-1 text-base text-ink-soft">{sub}</p>}
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
