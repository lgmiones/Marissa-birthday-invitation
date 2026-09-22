"use client";

import { motion } from "framer-motion";
import { Check, Copy, ExternalLink, MapPin, Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event";
import { Pickleball } from "./ui/Illustrations";
import Modal from "./ui/Modal";
import { EASE_LUXE } from "./ui/Motion";

const PLACE = `${EVENT.venue}, ${EVENT.venueLabel}`;
const Q = encodeURIComponent(PLACE);
const EMBED_URL = `https://maps.google.com/maps?q=${Q}&z=16&output=embed`;
const OPEN_URL = `https://www.google.com/maps/search/?api=1&query=${Q}`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${Q}`;

export default function LocationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PLACE);
      setCopied(true);
    } catch {
      /* clipboard unavailable — the address is still visible to copy by hand */
    }
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="location-title" className="sm:max-w-3xl">
      <div className="relative overflow-hidden p-4 pt-5 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 -right-8 w-20 animate-float opacity-90 [--float-d:5s] sm:w-24"
        >
          <Pickleball tone="blush" className="w-full" />
        </div>

        <p className="font-script text-3xl text-rose-deep">find your way</p>
        <h2 id="location-title" className="mt-1 pr-14 font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
          {EVENT.venue}
        </h2>
        <p className="mt-2 flex items-start gap-2 text-ink-soft">
          <MapPin className="mt-0.5 size-4 shrink-0 text-rose-deep" aria-hidden="true" />
          {EVENT.venueLabel}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_LUXE, delay: 0.15 }}
          className="relative mt-6 overflow-hidden rounded-[1.75rem] bg-pistachio p-1.5 shadow-soft ring-1 ring-white"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-sage-light sm:aspect-[16/9]">
            {/* placeholder while the map loads */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-soft" aria-hidden="true">
              <MapPin className="size-8 animate-bounce text-rose-deep" />
              <span className="text-sm">Loading map…</span>
            </div>
            <iframe
              title={`Map showing ${PLACE}`}
              src={EMBED_URL}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </motion.div>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-cream shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3b483d] hover:shadow-lift"
          >
            <Navigation className="size-4" aria-hidden="true" />
            Get Directions
          </a>
          <a
            href={OPEN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-ink ring-1 ring-blush/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-petal"
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            Open in Google Maps
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-medium text-ink-soft transition-colors duration-300 hover:bg-pistachio/60 hover:text-ink"
          >
            {copied ? (
              <Check className="size-4 text-ink" aria-hidden="true" />
            ) : (
              <Copy className="size-4" aria-hidden="true" />
            )}
            <span aria-live="polite">{copied ? "Address copied!" : "Copy address"}</span>
          </button>
        </div>

        <p className="mt-5 text-sm text-ink-soft">
          See you on the court — {EVENT.dayLabel}, {EVENT.dateLabel} at {EVENT.startLabel}.
        </p>
      </div>
    </Modal>
  );
}
