export interface EventInfo {
  title: string;
  honoree: string;
  occasion: string;
  dateLabel: string;
  dayLabel: string;
  timeLabel: string;
  venue: string;
  attire: string;
  note: string;
  rsvp: string;
  /** Party start, interpreted in the guest's local time zone. */
  startISO: string;
}

export const EVENT: EventInfo = {
  title: "Pickle & Party: Marissa Turns 60!",
  honoree: "Marissa",
  occasion: "Marissa’s 60th Birthday",
  dateLabel: "October 11, 2026",
  dayLabel: "Sunday",
  timeLabel: "6:00 PM – 10:00 PM",
  venue: "Zions Pickleball",
  attire: "Sport’s Attire",
  note: "Bring your own paddle",
  rsvp: "Strictly RSVP",
  startISO: "2026-10-11T18:00:00",
};

export interface NavLink {
  href: `#${string}`;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#party", label: "The Party" },
  { href: "#details", label: "Details" },
  { href: "#countdown", label: "Countdown" },
];
