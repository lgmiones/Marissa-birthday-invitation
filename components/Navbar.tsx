"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/event";
import { useInvite } from "./InviteProvider";
import { Pickleball } from "./ui/Illustrations";
import { EASE_LUXE } from "./ui/Motion";

export default function Navbar() {
  const { entered } = useInvite();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");

  // Highlight the link for whichever section sits in the middle of the viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!entered) return null;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_LUXE, delay: 0.5 }}
      className="fixed inset-x-0 top-3 z-50 px-4 sm:top-5"
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-full border border-white/70 bg-white/60 py-2 pl-3 pr-2 shadow-soft backdrop-blur-md"
      >
        <a
          href="#home"
          className="flex items-center gap-2 rounded-full px-2 py-1"
          aria-label="Pickle & Party — back to top"
          onClick={() => setOpen(false)}
        >
          <Pickleball tone="pistachio" className="size-7" />
          <span className="font-script text-2xl leading-none text-rose-deep">Marissa · 60</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-petal"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full bg-petal/70 text-ink transition-colors duration-300 hover:bg-petal md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE_LUXE }}
            className="mx-auto mt-2 max-w-3xl origin-top overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-3 shadow-lift backdrop-blur-md md:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.href ? "true" : undefined}
                    className={`flex min-h-12 items-center rounded-2xl px-5 font-display text-2xl transition-colors duration-300 ${
                      active === link.href ? "bg-petal text-ink" : "text-ink-soft hover:bg-cream"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
