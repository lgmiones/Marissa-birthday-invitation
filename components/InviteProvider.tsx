"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import IntroOverlay from "./IntroOverlay";

interface InviteContextValue {
  /** True once the guest has dismissed the intro overlay. */
  entered: boolean;
}

const InviteContext = createContext<InviteContextValue>({ entered: true });

export const useInvite = () => useContext(InviteContext);

/**
 * Owns the intro → site hand-off. The page renders underneath the overlay
 * (so it's server-rendered and ready), but stays inert and scroll-locked
 * until "Enter the Party" is pressed.
 */
export default function InviteProvider({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false);

  const enter = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setEntered(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = entered ? "" : "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [entered]);

  const value = useMemo(() => ({ entered }), [entered]);

  return (
    <MotionConfig reducedMotion="user">
      <InviteContext.Provider value={value}>
        <AnimatePresence>{!entered && <IntroOverlay key="intro" onEnter={enter} />}</AnimatePresence>
        <div inert={!entered} className="overflow-x-clip">
          {children}
        </div>
      </InviteContext.Provider>
    </MotionConfig>
  );
}
