import { CircleDot, Footprints, Gift, Heart, MapPin, Music, Sparkles, type LucideIcon } from "lucide-react";
import { Reveal } from "./ui/Motion";
import SectionHeading from "./ui/SectionHeading";

interface TimelineEntry {
  time: string;
  title: string;
  note: string;
  /** Optional spot within the venue, e.g. a specific court. */
  place?: string;
  icon: LucideIcon;
}

const SCHEDULE: TimelineEntry[] = [
  { time: "5:00 PM", title: "Party Begins", note: "Arrive, say hello, and find your doubles partner.", icon: Sparkles },
  { time: "5:30 PM", title: "Pickleball Fun", note: "Paddles up — Open Play friendly games for every level.", icon: CircleDot },
  { time: "7:00 PM", title: "Birthday Celebration & Dinner", note: "Dinner, toast, cheers, and a birthday serenade for Mariz.", icon: Gift },
  {
    time: "7:30 PM",
    title: "Zumba Presentation",
    note: "Get ready to move — a lively Zumba showcase to keep the party going!",
    place: "Court 3",
    icon: Footprints,
  },
  { time: "9:00 PM", title: "More Games & Good Times", note: "Rematches, music, and great company.", icon: Music },
  { time: "10:00 PM", title: "Party Ends", note: "Hugs, goodbyes, and happy memories.", icon: Heart },
];

export default function Timeline() {
  return (
    <section id="party" aria-labelledby="party-title" className="relative px-4 py-20 sm:py-24">
      <SectionHeading
        id="party-title"
        eyebrow="the evening"
        title="The Party"
        description="An evening of rallies, laughter, and celebrating Mariz."
      />

      <ol className="relative mx-auto mt-16 max-w-4xl">
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-6 top-6 w-px bg-linear-to-b from-blush via-sage to-blush md:left-1/2"
        />
        {SCHEDULE.map(({ time, title, note, place, icon: Icon }, i) => {
          const right = i % 2 === 1;
          return (
            <li key={time} className="relative pb-10 pl-20 last:pb-0 md:grid md:grid-cols-2 md:pl-0">
              <Reveal
                direction="scale"
                className="absolute left-6 top-2 -translate-x-1/2 md:left-1/2"
                amount={0.6}
              >
                <span
                  className={`flex size-12 items-center justify-center rounded-full shadow-soft ring-4 ring-cream ${
                    right ? "bg-pistachio text-ink" : "bg-petal text-rose-deep"
                  }`}
                >
                  <Icon className="size-5" aria-hidden="true" strokeWidth={1.7} />
                </span>
              </Reveal>

              <Reveal
                direction={right ? "right" : "left"}
                amount={0.5}
                className={right ? "md:col-start-2 md:pl-16" : "md:pr-16 md:text-right"}
              >
                <div className="group rounded-[1.75rem] bg-white/80 p-6 shadow-soft ring-1 ring-blush/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7">
                  <p
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${
                      right ? "bg-pistachio text-ink" : "bg-petal text-rose-deep"
                    }`}
                  >
                    <time>{time}</time>
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-medium leading-tight text-ink">{title}</h3>
                  <p className="mt-2 text-ink-soft">{note}</p>
                  {place && (
                    <p
                      className={`mt-3 flex items-center gap-1.5 text-sm font-medium text-rose-deep ${
                        right ? "" : "md:justify-end"
                      }`}
                    >
                      <MapPin className="size-4" aria-hidden="true" />
                      {place}
                    </p>
                  )}
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
