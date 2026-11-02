"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import IntroOverlay from "@/components/ui/IntroOverlay";

/* -------------------------------------------------------------------------- */
/*  IntroProvider                                                             */
/*                                                                            */
/*  A tiny inline script in <head> (see app/layout.tsx) sets                  */
/*  <html data-intro="on"> before first paint when the intro should play      */
/*  (first visit this session, no reduced-motion). A CSS cover hides the page */
/*  until this provider mounts the overlay, so there is no flash of content.  */
/*                                                                            */
/*  useIntroDone() → false while the intro plays, true once the hero may      */
/*  start animating (immediately when the intro is skipped).                  */
/* -------------------------------------------------------------------------- */
const IntroContext = createContext(false);

export function useIntroDone() {
  return useContext(IntroContext);
}

export default function IntroProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (document.documentElement.getAttribute("data-intro") === "on") {
      setActive(true);
    } else {
      setDone(true);
    }
  }, []);

  const reveal = useCallback(() => setDone(true), []);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      /* storage blocked — intro simply plays again next time */
    }
    setActive(false);
    setDone(true);
  }, []);

  return (
    <IntroContext.Provider value={done}>
      {children}
      {active && <IntroOverlay onReveal={reveal} onFinish={finish} />}
    </IntroContext.Provider>
  );
}
