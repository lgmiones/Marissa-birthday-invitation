import {
  ArrowUpRight,
  CalendarDays,
  CircleDot,
  MailCheck,
  MapPin,
  PartyPopper,
  Shirt,
  type LucideIcon,
} from "lucide-react";
import { EVENT } from "@/lib/event";
import DetailCardTrigger, { type DetailAction } from "./DetailCardTrigger";
import SectionHeading from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Motion";

type Tone = "pink" | "sage" | "cream";

interface DetailCard {
  label: string;
  title: string;
  sub?: string;
  icon: LucideIcon;
  tone: Tone;
  /** Makes the card open a popup. */
  action?: DetailAction;
  cta?: string;
}

const CARDS: DetailCard[] = [
  { label: "What", title: EVENT.occasion, icon: PartyPopper, tone: "pink" },
  { label: "When", title: EVENT.dateLabel, sub: EVENT.timeLabel, icon: CalendarDays, tone: "sage" },
  { label: "Where", title: EVENT.venue, sub: EVENT.venueLabel, icon: MapPin, tone: "cream", action: "map", cta: "View on map" },
  {
    label: "Wear",
    title: EVENT.attire,
    icon: Shirt,
    tone: "sage",
    action: "outfits",
    cta: "See outfit ideas",
  },
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
        {CARDS.map(({ label, title, sub, icon: Icon, tone, action, cta }) => {
          const t = TONES[tone];
          const cardClass = `group relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] p-7 text-left shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift sm:p-8 ${
            action ? "cursor-pointer focus-visible:-translate-y-1.5 focus-visible:shadow-lift" : ""
          } ${t.card}`;
          const inner = (
            <>
              <span
                aria-hidden="true"
                className={`absolute -right-10 -top-10 size-32 rounded-full transition-transform duration-500 group-hover:scale-125 ${t.orb}`}
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-12 -left-12 size-28 rounded-full border border-white/60"
              />
              {action && (
                <span
                  aria-hidden="true"
                  className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-white/80 text-rose-deep shadow-sm transition-all duration-300 group-hover:rotate-45 group-hover:bg-white"
                >
                  <ArrowUpRight className="size-5" />
                </span>
              )}
              <span className="relative block">
                <span
                  className={`flex size-14 items-center justify-center rounded-full shadow-sm transition-transform duration-300 group-hover:rotate-12 ${t.icon}`}
                >
                  <Icon className="size-6" aria-hidden="true" strokeWidth={1.6} />
                </span>
                <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">{label}</span>
                <span className="mt-2 block font-display text-3xl font-medium leading-tight text-ink">{title}</span>
                {sub && <span className="mt-1 block text-base text-ink-soft">{sub}</span>}
              </span>
              {cta && (
                <span className="relative mt-auto pt-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/75 px-4 py-2 text-sm font-medium text-rose-deep ring-1 ring-blush/60 transition-colors duration-300 group-hover:bg-white">
                    {cta}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </span>
              )}
            </>
          );
          return (
            <StaggerItem
              key={label}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              {action ? (
                <DetailCardTrigger action={action} className={cardClass}>
                  {inner}
                </DetailCardTrigger>
              ) : (
                <article className={cardClass}>{inner}</article>
              )}
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
