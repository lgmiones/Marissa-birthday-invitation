"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { EASE_LUXE } from "./Motion";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** id of the element that names the dialog */
  labelledBy: string;
  children: ReactNode;
  className?: string;
}

const FOCUSABLE = 'a[href], button:not([disabled]), iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible popup: portalled to <body> (so transformed ancestors can't
 * trap `position: fixed`), scroll-locked, Esc / backdrop to close, focus
 * trapped inside and returned to the trigger afterwards. Renders as a
 * bottom sheet on phones and a centred card on larger screens.
 */
export default function Modal({ open, onClose, labelledBy, children, className = "" }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true }),
    );

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/40 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={{ opacity: 0, y: 70, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.98 }}
            transition={{ duration: 0.55, ease: EASE_LUXE }}
            className={`relative max-h-[92svh] w-full overflow-y-auto overscroll-contain rounded-t-[2rem] bg-cream shadow-[0_40px_120px_-30px_rgb(70_84_72/0.55)] ring-1 ring-white sm:rounded-[2.25rem] ${className}`}
          >
            {/* sticky close button that doesn't take up layout space */}
            <div className="sticky top-0 z-30 h-0">
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/85 text-ink shadow-soft ring-1 ring-blush/50 backdrop-blur transition-all duration-300 hover:rotate-90 hover:bg-white sm:right-4 sm:top-4"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div aria-hidden="true" className="mx-auto mt-2.5 h-1.5 w-12 rounded-full bg-ink/15 sm:hidden" />
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
