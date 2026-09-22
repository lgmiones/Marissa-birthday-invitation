export interface EventInfo {
  title: string;
  honoree: string;
  occasion: string;
  dateLabel: string;
  dayLabel: string;
  timeLabel: string;
  startLabel: string;
  venue: string;
  attire: string;
  note: string;
  rsvp: string;
  /** People guests should RSVP to. */
  rsvpContacts: string;
  rsvpDeadline: string;
  /** Party start, interpreted in the guest's local time zone. */
  startISO: string;
  venueLabel: string;
}

export const EVENT: EventInfo = {
  title: "Pickle & Party: Mariz Turns 60!",
  honoree: "Mariz",
  occasion: "Mariz’s 60th Birthday",
  dateLabel: "October 11, 2026",
  dayLabel: "Sunday",
  timeLabel: "5:00 PM – 10:00 PM",
  startLabel: "5:00 PM",
  venue: "Zions Pickleball",
  venueLabel: "Celadon Town, Pajac, Lapu-Lapu City, Cebu",
  attire: "Sports Attire",
  note: "Bring your own paddle",
  rsvp: "Strictly RSVP",
  rsvpContacts: "Nova, Maymay & Mariz",
  rsvpDeadline: "October 10",
  startISO: "2026-10-11T17:00:00",
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
