/* Pure SVG illustrations — safe to render from Server or Client Components. */

type BallTone = "pistachio" | "blush" | "cream" | "sage";

const BALL_TONES: Record<BallTone, { base: string; shade: string; hole: string }> = {
  pistachio: { base: "#DCE6C9", shade: "#A8B79A", hole: "#8E9F80" },
  blush: { base: "#F3D0D8", shade: "#D9959F", hole: "#C98492" },
  cream: { base: "#FFF9F5", shade: "#E9DCD3", hole: "#D6C5BA" },
  sage: { base: "#C8D5B9", shade: "#98A98A", hole: "#7F9272" },
};

const round = (n: number) => Math.round(n * 100) / 100;

const ring = (count: number, radius: number, r: number, offset = 0) =>
  Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2 + offset;
    return { cx: round(50 + Math.cos(a) * radius), cy: round(50 + Math.sin(a) * radius), r };
  });

const HOLES = [{ cx: 50, cy: 50, r: 4.6 }, ...ring(6, 20, 4.2), ...ring(11, 36, 3.4, 0.3)];

interface PickleballProps {
  className?: string;
  tone?: BallTone;
}

export function Pickleball({ className, tone = "pistachio" }: PickleballProps) {
  const c = BALL_TONES[tone];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="47" fill={c.shade} />
      <circle cx="47" cy="46.5" r="44" fill={c.base} />
      {HOLES.map((h, i) => (
        <circle key={i} cx={h.cx} cy={h.cy} r={h.r} fill={c.hole} opacity="0.7" />
      ))}
      <ellipse cx="33" cy="27" rx="13" ry="7" fill="#fff" opacity="0.55" transform="rotate(-32 33 27)" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#465448" strokeOpacity="0.1" />
    </svg>
  );
}

type PaddleTone = "blush" | "sage" | "cream";

const PADDLE_TONES: Record<PaddleTone, { face: string; edge: string; grip: string }> = {
  blush: { face: "#F3D0D8", edge: "#D9959F", grip: "#465448" },
  sage: { face: "#DCE6C9", edge: "#A8B79A", grip: "#B5697A" },
  cream: { face: "#FFF9F5", edge: "#E8B4C1", grip: "#A8B79A" },
};

interface PaddleProps {
  className?: string;
  tone?: PaddleTone;
}

export function Paddle({ className, tone = "blush" }: PaddleProps) {
  const c = PADDLE_TONES[tone];
  return (
    <svg viewBox="0 0 100 172" className={className} aria-hidden="true" focusable="false">
      <rect x="5" y="4" width="90" height="106" rx="36" fill={c.edge} />
      <rect x="10.5" y="9.5" width="79" height="95" rx="31" fill={c.face} />
      <rect
        x="20"
        y="19"
        width="60"
        height="76"
        rx="24"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />
      <ellipse cx="34" cy="32" rx="10" ry="5" fill="#fff" opacity="0.5" transform="rotate(-35 34 32)" />
      <circle cx="50" cy="57" r="2" fill={c.edge} opacity="0.8" />
      <circle cx="43" cy="57" r="1.3" fill={c.edge} opacity="0.6" />
      <circle cx="57" cy="57" r="1.3" fill={c.edge} opacity="0.6" />
      <path d="M37 106 Q50 118 63 106 L61 122 H39 Z" fill={c.edge} />
      <rect x="39" y="118" width="22" height="46" rx="8" fill={c.grip} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M39.5 ${127 + i * 8} L60.5 ${121 + i * 8}`}
          stroke="#fff"
          strokeOpacity="0.35"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      ))}
      <rect x="36" y="160" width="28" height="9" rx="4.5" fill={c.edge} />
    </svg>
  );
}

const BLOB_PATHS = [
  "M44.7,-62.3C57.1,-52.4,65.6,-38.2,70.4,-22.6C75.2,-7,76.3,10,70.5,24.2C64.7,38.4,52,49.8,37.6,58.6C23.2,67.4,7.1,73.6,-9.6,74.1C-26.3,74.6,-43.6,69.4,-55.8,58.3C-68,47.2,-75.1,30.2,-76.9,12.7C-78.7,-4.8,-75.2,-22.8,-65.6,-36.4C-56,-50,-40.3,-59.2,-24.9,-67.3C-9.5,-75.4,5.6,-82.4,19.7,-80C33.8,-77.6,32.3,-72.2,44.7,-62.3Z",
  "M39.5,-52.9C51.9,-45.3,63.1,-34.3,68.7,-20.6C74.3,-6.9,74.3,9.5,68.3,23.1C62.3,36.7,50.3,47.5,36.8,55.9C23.3,64.3,8.3,70.3,-7.6,71.2C-23.5,72.1,-40.3,67.9,-52.4,57.9C-64.5,47.9,-71.9,32.1,-73.6,16C-75.3,-0.1,-71.3,-16.5,-62.9,-29.4C-54.5,-42.3,-41.7,-51.7,-28.5,-59C-15.3,-66.3,-1.7,-71.5,11.2,-69.4C24.1,-67.3,27.1,-60.5,39.5,-52.9Z",
  "M54.1,-58.3C67.7,-44.5,74.6,-24.2,74.1,-5.1C73.6,14,65.7,31.9,52.9,46.1C40.1,60.3,22.4,70.8,3.3,68.1C-15.8,65.4,-36.3,49.5,-50.6,33.3C-64.9,17.1,-73,0.6,-70.4,-14.2C-67.8,-29,-54.5,-42.1,-40,-55.6C-25.5,-69.1,-9.8,-83,6.6,-85.4C23,-87.8,40.5,-72.1,54.1,-58.3Z",
] as const;

interface BlobProps {
  className?: string;
  variant?: 0 | 1 | 2;
  fill?: string;
}

export function Blob({ className, variant = 0, fill = "currentColor" }: BlobProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <path d={BLOB_PATHS[variant]} fill={fill} transform="translate(100 100)" />
    </svg>
  );
}

export function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 100" className={className} aria-hidden="true" focusable="false">
      <path d="M30 4 C54 26 56 64 30 96 C4 64 6 26 30 4Z" fill="currentColor" />
      <path d="M30 14 V88" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M30 40 L19 30 M30 56 L41 45 M30 70 L20 61"
        stroke="#fff"
        strokeOpacity="0.45"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Thin concentric court-line arcs used as an airy background motif. */
export function CourtArcs({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true" focusable="false" fill="none">
      <circle cx="300" cy="300" r="290" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="300" cy="300" r="220" stroke="currentColor" strokeWidth="1" strokeDasharray="2 10" />
      <circle cx="300" cy="300" r="150" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 300 H590" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
    </svg>
  );
}
