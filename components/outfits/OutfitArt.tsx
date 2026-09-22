"use client";

import { useId } from "react";

/* Flat-lay outfit illustrations in the invitation palette. */

interface ArtProps {
  className?: string;
}

const LINE = "#465448";

function Svg({ className, children }: ArtProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export function Tank({ className, fill = "#E8B4C1", trim = "#FFFFFF" }: ArtProps & { fill?: string; trim?: string }) {
  return (
    <Svg className={className}>
      <path
        d="M36 12 L42 12 Q48 28 60 28 Q72 28 78 12 L84 12 Q86 36 94 46 L94 98 Q60 104 26 98 L26 46 Q34 36 36 12 Z"
        fill={fill}
      />
      <path d="M42 12 Q48 28 60 28 Q72 28 78 12" fill="none" stroke={trim} strokeWidth="4" />
      <path d="M36 12 Q34 36 26 46 M84 12 Q86 36 94 46" fill="none" stroke={trim} strokeWidth="4" strokeLinecap="round" />
      <path d="M45 13 Q50 25 60 25 Q70 25 75 13" fill="none" stroke="#D9959F" strokeWidth="1.6" />
      <path d="M30 60 Q60 66 90 60" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="6" />
      <path d="M26 98 Q60 104 94 98" fill="none" stroke={LINE} strokeOpacity="0.12" strokeWidth="2" />
    </Svg>
  );
}

export function Skort({ className, fill = "#E8B4C1", stripe = "#D9959F" }: ArtProps & { fill?: string; stripe?: string }) {
  const pleats = Array.from({ length: 9 }, (_, i) => i + 1);
  return (
    <Svg className={className}>
      <path d="M23 32 L97 32 L110 98 Q60 106 10 98 Z" fill={fill} />
      {pleats.map((i) => (
        <path
          key={i}
          d={`M${23 + i * 7.4} 33 L${10 + i * 10} ${99 + (i === 5 ? 3 : 2)}`}
          stroke={stripe}
          strokeOpacity="0.55"
          strokeWidth="1.4"
        />
      ))}
      <path d="M10 98 Q60 106 110 98" fill="none" stroke={stripe} strokeWidth="2" />
      <rect x="22" y="12" width="76" height="21" rx="5" fill="#fff" stroke={LINE} strokeOpacity="0.1" />
      <rect x="22" y="17" width="76" height="3.5" fill={stripe} />
      <rect x="22" y="24" width="76" height="3.5" fill={stripe} />
    </Svg>
  );
}

export function Tee({ className, fill = "#C8D5B9", stripe = "#E8B4C1" }: ArtProps & { fill?: string; stripe?: string }) {
  return (
    <Svg className={className}>
      <path
        d="M40 16 Q60 28 80 16 L104 28 L96 48 L86 44 L86 104 Q60 108 34 104 L34 44 L24 48 L16 28 Z"
        fill={fill}
      />
      <path d="M40 16 Q60 28 80 16" fill="none" stroke="#fff" strokeWidth="4" />
      <path d="M43 20 Q60 30 77 20" fill="none" stroke={stripe} strokeWidth="1.8" />
      <path d="M100 28 L92.5 46 M20 28 L27.5 46" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="72" cy="46" r="5" fill={stripe} />
      <circle cx="72" cy="46" r="1.2" fill="#fff" opacity="0.8" />
      <path d="M34 104 Q60 108 86 104" fill="none" stroke={LINE} strokeOpacity="0.15" strokeWidth="2" />
    </Svg>
  );
}

export function Shorts({ className, fill = "#5F6D61", stripe = "#E8B4C1" }: ArtProps & { fill?: string; stripe?: string }) {
  return (
    <Svg className={className}>
      <path d="M24 28 L96 28 L102 94 Q84 98 66 96 L60 60 L54 96 Q36 98 18 94 Z" fill={fill} />
      <path d="M26.5 31 L21.5 92 M93.5 31 L98.5 92" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <rect x="24" y="14" width="72" height="15" rx="4" fill="#fff" stroke={LINE} strokeOpacity="0.1" />
      <rect x="24" y="19.5" width="72" height="3.5" fill={stripe} />
      <path d="M57 26 q-2 9 -5 13 M63 26 q2 9 5 13" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export function Shoe({
  className,
  upper = "#E8B4C1",
  stripe = "#FFFFFF",
  heel = "#D9959F",
}: ArtProps & { upper?: string; stripe?: string; heel?: string }) {
  return (
    <Svg className={className}>
      <path d="M12 76 Q10 60 22 54 L46 44 Q54 40 58 46 L64 56 Q84 58 100 62 Q112 66 112 76 Z" fill={upper} />
      <path d="M12 76 Q10 60 22 54 L30 51 Q26 62 28 76 Z" fill={heel} />
      <path d="M44 45 Q46 35 54 37 L58 46 Z" fill="#fff" opacity="0.7" />
      <path d="M92 61 Q112 66 112 76 L97 76 Q97 68 92 61 Z" fill="#fff" opacity="0.45" />
      <path d="M52 58 L60 75 M60 58 L68 75 M68 59 L76 75" stroke={stripe} strokeWidth="3.6" strokeLinecap="round" />
      <path d="M47 48 L56 44 M51 52 L60 48.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 76 L112 76 L112 80 Q112 88 104 88 L18 88 Q10 88 10 80 Z" fill="#FFFDFB" stroke="#E6D8CE" />
      <path d="M13 82 L109 82" stroke="#E6D8CE" strokeWidth="1.2" />
    </Svg>
  );
}

const SOCK = "M44 8 L66 8 L66 66 Q66 74 74 79 L90 88 Q100 94 95 103 Q90 111 80 107 L50 94 Q40 89 44 76 Z";

export function Socks({ className, a = "#E8B4C1", b = "#A8B79A" }: ArtProps & { a?: string; b?: string }) {
  return (
    <Svg className={className}>
      <g transform="translate(-18 6)">
        <path d={SOCK} fill="#F6F1EE" stroke={LINE} strokeOpacity="0.12" />
        <rect x="44" y="16" width="22" height="3.5" fill={a} />
        <rect x="44" y="22" width="22" height="3.5" fill={b} />
      </g>
      <path d={SOCK} fill="#fff" stroke={LINE} strokeOpacity="0.14" />
      <rect x="44" y="16" width="22" height="3.5" fill={a} />
      <rect x="44" y="22" width="22" height="3.5" fill={b} />
      <circle cx="55" cy="42" r="5" fill={b} opacity="0.85" />
      <circle cx="55" cy="42" r="1.2" fill="#fff" />
    </Svg>
  );
}

export function Visor({ className }: ArtProps) {
  return (
    <Svg className={className}>
      <path d="M20 68 Q60 42 100 68 Q110 86 60 92 Q10 86 20 68 Z" fill="#F7EEE6" stroke="#E2D3C6" />
      <path d="M22 80 Q60 98 98 80" fill="none" stroke="#E2D3C6" strokeWidth="2" />
      <path d="M18 64 Q60 26 102 64 L98 72 Q60 38 22 72 Z" fill="#EFE3D8" stroke="#E2D3C6" />
      <circle cx="60" cy="52" r="4.5" fill="none" stroke="#D9959F" strokeWidth="1.5" />
    </Svg>
  );
}

export function Cap({ className, fill = "#A8B79A", brim = "#8E9F80" }: ArtProps & { fill?: string; brim?: string }) {
  return (
    <Svg className={className}>
      <path d="M20 72 Q20 30 60 28 Q100 30 100 72 Z" fill={fill} />
      <path d="M60 28 L60 72 M41 33 Q34 50 36 72 M79 33 Q86 50 84 72" stroke={LINE} strokeOpacity="0.18" strokeWidth="1.4" fill="none" />
      <circle cx="60" cy="29" r="4" fill={brim} />
      <path d="M16 72 Q60 64 104 72 Q112 76 108 82 Q60 92 12 82 Q8 76 16 72 Z" fill={brim} />
      <circle cx="60" cy="54" r="7" fill="#E8B4C1" />
      <circle cx="58" cy="52" r="1.2" fill="#fff" />
      <circle cx="62" cy="56" r="1.2" fill="#fff" />
    </Svg>
  );
}

export function Wristband({ className, stripe = "#E8B4C1" }: ArtProps & { stripe?: string }) {
  return (
    <Svg className={className}>
      <ellipse cx="60" cy="60" rx="36" ry="26" fill="#fff" stroke={LINE} strokeOpacity="0.14" />
      <ellipse cx="60" cy="60" rx="29" ry="19.5" fill="none" stroke={stripe} strokeWidth="3" />
      <ellipse cx="60" cy="63" rx="20" ry="10" fill="#EFE6E1" />
    </Svg>
  );
}

export function Bag({ className }: ArtProps) {
  const id = useId().replace(/:/g, "");
  return (
    <Svg className={className}>
      <defs>
        <pattern id={`chk-${id}`} width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="#6B7A6D" />
          <rect width="6" height="6" fill="#465448" />
          <rect x="6" y="6" width="6" height="6" fill="#465448" />
        </pattern>
      </defs>
      <path d="M38 42 Q40 16 58 16 Q76 16 78 42" fill="none" stroke="#3B483D" strokeWidth="5" strokeLinecap="round" />
      <rect x="4" y="47" width="24" height="8" rx="4" fill="#fff" transform="rotate(-12 16 51)" />
      <rect x="4" y="60" width="24" height="8" rx="4" fill="#fff" transform="rotate(-6 16 64)" />
      <path d="M20 52 Q20 42 32 42 L78 42 Q108 42 108 72 Q108 102 78 102 L32 102 Q20 102 20 92 Z" fill={`url(#chk-${id})`} />
      <path
        d="M20 52 Q20 42 32 42 L78 42 Q108 42 108 72 Q108 102 78 102 L32 102 Q20 102 20 92 Z"
        fill="none"
        stroke="#D9959F"
        strokeWidth="3"
      />
      <path d="M26 72 L102 72" stroke="#D9959F" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="88" cy="88" r="6" fill="#E8B4C1" />
    </Svg>
  );
}

export function Bottle({ className }: ArtProps) {
  return (
    <Svg className={className}>
      <path d="M52 20 Q52 7 60 7 Q68 7 68 20" fill="none" stroke="#2F3931" strokeWidth="4" />
      <rect x="46" y="18" width="28" height="17" rx="5" fill="#2F3931" />
      <rect x="42" y="33" width="36" height="80" rx="12" fill="#3E4A40" />
      <rect x="48" y="42" width="5" height="60" rx="2.5" fill="#fff" opacity="0.16" />
      <circle cx="60" cy="80" r="7" fill="#E8B4C1" />
      <circle cx="58" cy="78" r="1.3" fill="#fff" />
      <circle cx="62.5" cy="82" r="1.3" fill="#fff" />
    </Svg>
  );
}
