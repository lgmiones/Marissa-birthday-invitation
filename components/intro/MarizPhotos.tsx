"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { MARIZ_PHOTOS, type Photo } from "@/lib/photos";
import { Paddle, Pickleball } from "../ui/Illustrations";
import { EASE_LUXE } from "../ui/Motion";

interface ArchPhotoProps {
  photo: Photo;
  sizes: string;
  caption?: string;
  /**
   * Tailwind classes to zoom/position the photo inside the arch. To frame a
   * face: pin the image top, scale around the face (origin), then translate
   * down so the face clears the arch curve. The white studio backdrop blends
   * into the white frame, so the gap this leaves is invisible.
   */
  crop?: string;
  className?: string;
  /** Overlays positioned over the whole framed photo (e.g. a held paddle). */
  children?: ReactNode;
}

/** A photo in an invitation-style arch with an offset outline. */
function ArchPhoto({ photo, sizes, caption, crop = "object-[50%_40%]", className = "", children }: ArchPhotoProps) {
  return (
    <figure className={`relative ${className}`}>
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-x-[6%] translate-y-[4%] rounded-t-full rounded-b-[1.5rem] border border-rose-deep/35"
      />
      <div className="relative rounded-t-full rounded-b-[1.5rem] bg-white p-[5%] shadow-[0_24px_60px_-20px_rgb(181_105_122/0.55)] ring-1 ring-white">
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[1.1rem] bg-white">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            placeholder="blur"
            className={`object-cover ${crop}`}
          />
          {/* soft blush wash so the white studio backdrop melts into the palette */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_45%,transparent_55%,rgb(243_208_216/0.55)_100%)]"
          />
        </div>
      </div>
      {children}
      {caption && (
        <figcaption className="mt-3 text-center font-script text-[clamp(1.4rem,1.7vw,1.9rem)] leading-none text-rose-deep">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const rise = (delay: number, rotate: number) => ({
  initial: { opacity: 0, y: 60, rotate: rotate * 2, scale: 0.92 },
  animate: { opacity: 1, y: 0, rotate, scale: 1 },
  transition: { duration: 1.2, ease: EASE_LUXE, delay },
});

const bob = (d: number, delay: number) =>
  ({ "--float-d": `${d}s`, "--float-delay": `${delay}s`, "--float-y": "-10px", "--float-r": "0deg" }) as CSSProperties;

/** Large screens: arches flanking the headline. */
export function PhotoSides({ at }: { at: (s: number) => number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden xl:block">
      <motion.div {...rise(at(0.8), -5)} className="absolute left-[5%] top-1/2 w-[clamp(210px,17vw,320px)] -translate-y-[58%]">
        <div className="animate-float" style={bob(8, 0)}>
          <ArchPhoto photo={MARIZ_PHOTOS.paddle} sizes="320px" caption="Sixty & Serving" crop="object-[50%_45%] scale-[1.12]" />
        </div>
      </motion.div>

      <motion.div {...rise(at(1.25), 7)} className="absolute bottom-[7%] left-[17.5%] w-[clamp(130px,9.5vw,185px)]">
        <div className="animate-float" style={bob(7, 1.2)}>
          <ArchPhoto photo={MARIZ_PHOTOS.navy} sizes="185px" crop="object-[50%_30%] scale-[1.25]" />
        </div>
      </motion.div>

      <motion.div {...rise(at(1.05), 5)} className="absolute right-[5.5%] top-1/2 w-[clamp(210px,17vw,320px)] -translate-y-[45%]">
        <div className="animate-float" style={bob(8.5, 0.6)}>
          <ArchPhoto photo={MARIZ_PHOTOS.basket} sizes="320px" caption="Queen of the Court" crop="object-[50%_45%] scale-[1.08]" />
        </div>
      </motion.div>
    </div>
  );
}

/** Phones & tablets: a fanned trio of arches above the headline. */
export function PhotoFan({ at }: { at: (s: number) => number }) {
  return (
    <div className="relative mb-8 flex items-end justify-center sm:mb-10 xl:hidden">
      <motion.div {...rise(at(0.9), -9)} className="relative z-0 -mr-3 w-[min(25vw,15svh,120px)] sm:w-[min(20vw,16svh,165px)] origin-bottom-right">
        <ArchPhoto photo={MARIZ_PHOTOS.basket}
          sizes="(min-width: 640px) 165px, 120px"
          crop="object-[50%_0%] origin-[51%_16%] scale-[1.45] translate-y-[16%]" />
      </motion.div>
      <motion.div {...rise(at(0.7), 0)} className="relative z-10 -mb-1 w-[min(31vw,19svh,150px)] sm:w-[min(25vw,20svh,205px)]">
        <ArchPhoto photo={MARIZ_PHOTOS.paddle} sizes="(min-width: 640px) 205px, 150px" crop="object-[50%_35%] scale-[1.35]" />
      </motion.div>
      <motion.div {...rise(at(1.1), 9)} className="relative z-0 -ml-3 w-[min(25vw,15svh,120px)] sm:w-[min(20vw,16svh,165px)] origin-bottom-left">
        <ArchPhoto photo={MARIZ_PHOTOS.navy}
          sizes="(min-width: 640px) 165px, 120px"
          crop="object-[50%_0%] origin-[51%_18%] scale-[1.45] translate-y-[14%]"
        >
          {/* paddle held in the hand by her side: grip pinned to the hand, head tilted out */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[19%] top-[36.5%] w-[27%] origin-[50%_82%]"
            initial={{ opacity: 0, rotate: -75 }}
            animate={{ opacity: 1, rotate: -28 }}
            transition={{ duration: 0.9, ease: EASE_LUXE, delay: at(1.8) }}
          >
            <Paddle tone="blush" className="w-full drop-shadow-md" />
          </motion.div>
        </ArchPhoto>
      </motion.div>

      {/* ball bounces in to rest at the fan's foot */}
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-2 left-[2%] z-20 w-[min(10vw,46px)]"
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: [-120, 0, -40, 0, -12, 0], opacity: 1 }}
        transition={{ duration: at(1.6), delay: at(1.4), times: [0, 0.35, 0.55, 0.72, 0.86, 1], ease: "easeOut" }}
      >
        <Pickleball tone="pistachio" className="w-full drop-shadow-md" />
      </motion.div>
    </div>
  );
}
