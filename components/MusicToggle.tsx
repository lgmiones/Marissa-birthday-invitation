"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInvite } from "./InviteProvider";

/*
  A tiny generated music-box loop (Web Audio API) — no audio file to
  download, and it never autoplays: sound starts only on a guest's click.
*/

const HZ: Record<string, number> = {
  F2: 87.31, G2: 98, A2: 110, C3: 130.81,
  E4: 329.63, G4: 392, A4: 440, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99,
};

// C – Am – F – G, eighth notes.
const MELODY: (string | null)[] = [
  "E5", null, "D5", "C5", "D5", null, "E5", "G5",
  "A4", null, "C5", "D5", "E5", "D5", "C5", null,
  "A4", null, "C5", "D5", "C5", null, "A4", "G4",
  "G4", null, "E4", "G4", "A4", null, null, null,
];
const BASS = ["C3", "A2", "F2", "G2"];
const STEP = 60 / 92 / 2;

interface Engine {
  ctx: AudioContext;
  master: GainNode;
  timer: number | null;
  nextTime: number;
  step: number;
}

function tone(e: Engine, freq: number, time: number, dur: number, vol: number, type: OscillatorType) {
  const osc = e.ctx.createOscillator();
  const gain = e.ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(vol, time + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
  osc.connect(gain).connect(e.master);
  osc.start(time);
  osc.stop(time + dur + 0.05);
}

function createEngine(): Engine | null {
  const Ctx =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0.0001;

  // Soft echo for a dreamy, airy feel.
  const delay = ctx.createDelay();
  delay.delayTime.value = STEP * 3;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.28;
  const wet = ctx.createGain();
  wet.gain.value = 0.25;
  master.connect(ctx.destination);
  master.connect(delay);
  delay.connect(feedback).connect(delay);
  delay.connect(wet).connect(ctx.destination);

  return { ctx, master, timer: null, nextTime: 0, step: 0 };
}

function schedule(e: Engine) {
  while (e.nextTime < e.ctx.currentTime + 0.25) {
    const i = e.step % MELODY.length;
    const note = MELODY[i];
    if (note) {
      tone(e, HZ[note], e.nextTime, 1.1, 0.5, "sine");
      tone(e, HZ[note] * 2, e.nextTime, 0.5, 0.08, "triangle");
    }
    if (i % 8 === 0) tone(e, HZ[BASS[i / 8]], e.nextTime, STEP * 7, 0.35, "sine");
    e.nextTime += STEP;
    e.step += 1;
  }
}

export default function MusicToggle() {
  const { entered } = useInvite();
  const [playing, setPlaying] = useState(false);
  const engine = useRef<Engine | null>(null);

  const stop = useCallback(() => {
    const e = engine.current;
    if (!e) return;
    const now = e.ctx.currentTime;
    e.master.gain.cancelScheduledValues(now);
    e.master.gain.setTargetAtTime(0.0001, now, 0.15);
    if (e.timer !== null) window.clearInterval(e.timer);
    e.timer = null;
    window.setTimeout(() => {
      if (engine.current?.timer === null) void engine.current.ctx.suspend();
    }, 600);
  }, []);

  const start = useCallback(async () => {
    engine.current ??= createEngine();
    const e = engine.current;
    if (!e) return false;
    await e.ctx.resume();
    const now = e.ctx.currentTime;
    e.nextTime = now + 0.08;
    e.master.gain.cancelScheduledValues(now);
    e.master.gain.setTargetAtTime(0.12, now, 0.3);
    schedule(e);
    e.timer = window.setInterval(() => schedule(e), 60);
    return true;
  }, []);

  const toggle = async () => {
    if (playing) {
      stop();
      setPlaying(false);
    } else if (await start()) {
      setPlaying(true);
    }
  };

  useEffect(
    () => () => {
      const e = engine.current;
      if (e?.timer != null) window.clearInterval(e.timer);
      void e?.ctx.close();
    },
    [],
  );

  if (!entered) return null;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Pause background music" : "Play background music"}
      title={playing ? "Pause music" : "Play music"}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-4 right-4 z-50 flex size-14 cursor-pointer items-center justify-center rounded-full bg-white/80 text-rose-deep shadow-lift ring-1 ring-blush/60 backdrop-blur-md sm:bottom-6 sm:right-6"
    >
      {playing && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full ring-2 ring-rose/60"
          animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <AnimatePresence mode="wait" initial={false}>
        {playing ? (
          <motion.span
            key="on"
            className="flex h-5 items-end gap-[3px]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            aria-hidden="true"
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] origin-bottom rounded-full bg-rose-deep"
                style={{ height: "100%" }}
                animate={{ scaleY: [0.3, 1, 0.5, 0.85, 0.3] }}
                transition={{ duration: 1.1 + i * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
              />
            ))}
          </motion.span>
        ) : (
          <motion.span
            key="off"
            className="relative"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            aria-hidden="true"
          >
            <Music className="size-5" />
            <VolumeX className="absolute -bottom-2 -right-3 size-3.5 rounded-full bg-white text-ink-soft" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
