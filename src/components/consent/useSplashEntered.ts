"use client";

import { useEffect, useState } from "react";

// Session key mirrored from Splash.tsx. Marks the visitor as having entered.
const SPLASH_KEY = "marfa_splash_lasttimelast";

// Immediately mark the visitor as entered (no exit animation). Used by the
// TermsGate escape hatch when someone deep-linked to /legal before entering
// and clicks "Enter Site" from the corner notice.
export function markSplashEntered(): void {
  try {
    sessionStorage.setItem(SPLASH_KEY, "1");
  } catch {
    /* private browsing */
  }
  document.documentElement.classList.add("splash-entered");
}

// Marfa's splash overlay is not backed by a React context. It signals that the
// visitor has "entered" the site by adding the `splash-entered` class to the
// <html> element:
//   - immediately (before first paint) via a head script for a visitor who
//     already entered earlier this session (sessionStorage flag set), or
//   - about 800ms after a first-time visitor clicks "Enter Site" in Splash.tsx.
//
// The cookie banner and Terms notice watch this signal so they never stack on
// top of the splash for a first-time visitor. Returning-this-session visitors
// get the class before paint, so they see the banner immediately (if they have
// not yet made a cookie choice).
export function useSplashEntered(): boolean {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("splash-entered")) {
      setEntered(true);
      return;
    }
    const observer = new MutationObserver(() => {
      if (root.classList.contains("splash-entered")) {
        setEntered(true);
        observer.disconnect();
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return entered;
}
