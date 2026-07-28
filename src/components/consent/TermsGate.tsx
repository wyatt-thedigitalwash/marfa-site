"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { readConsent } from "./consent";
import { useSplashEntered, markSplashEntered } from "./useSplashEntered";

// Shown once, right after the cookie choice is made, so the arbitration /
// class-action-waiver notice is front and center instead of buried in the
// footer. Persists acknowledgement separately from cookie consent. Gated on
// the splash so it never stacks on top of the splash overlay for a first-time
// visitor -- it only appears once they have entered and made a cookie choice.
const STORAGE_KEY = "mf-terms-gate";

function readAcknowledged(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return !!window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
}

function writeAcknowledged(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  } catch {
    /* storage unavailable -- notice will simply reappear next visit */
  }
}

export default function TermsGate() {
  const pathname = usePathname();
  const router = useRouter();
  const entered = useSplashEntered();
  const [show, setShow] = useState(false);

  const onExempt = pathname.startsWith("/legal");

  const maybeShow = useCallback(() => {
    // Case A: deep-linked to /legal without having entered. The splash is
    // hidden here, so this corner notice is the way into the site -- always
    // available regardless of a past acknowledgement.
    if (!entered && onExempt) {
      setShow(true);
      return;
    }
    // Case B: backup notice after a cookie decision, shown once ever, only
    // after the visitor has entered so it never stacks on the splash.
    if (readAcknowledged()) {
      setShow(false);
      return;
    }
    setShow(entered && !!readConsent());
  }, [entered, onExempt]);

  useEffect(() => {
    maybeShow();
    window.addEventListener("cookie-consent-decided", maybeShow);
    return () => window.removeEventListener("cookie-consent-decided", maybeShow);
  }, [maybeShow]);

  const enter = () => {
    writeAcknowledged();
    setShow(false);
    // Deep-linked to /legal before entering: treat this click as entering the
    // site -- mark entered and go home, instead of stranding them here.
    if (!entered && onExempt) {
      markSplashEntered();
      router.push("/");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:left-auto sm:right-4 sm:max-w-[420px]">
      <div className="border border-text-body/20 bg-background-alt/95 p-4 shadow-2xl backdrop-blur-sm sm:p-6">
        <p className="font-body text-[12.5px] leading-relaxed text-text-accent sm:text-sm">
          Your use of this website constitutes your consent to our{" "}
          <Link href="/legal/terms" className="font-semibold underline hover:opacity-70">
            Terms &amp; Conditions
          </Link>
          , which includes your agreement to{" "}
          <Link href="/legal/terms#section-17" className="font-semibold underline hover:opacity-70">
            arbitrate any claims
          </Link>{" "}
          as well as a{" "}
          <Link
            href="/legal/terms#class-action-waiver"
            className="font-semibold underline hover:opacity-70"
          >
            waiver of any class action rights
          </Link>
          .
        </p>
        <button type="button" onClick={enter} className="cc-btn cc-btn-primary mt-3 w-full sm:mt-5">
          {entered ? "Got It" : "Enter Site"}
        </button>
      </div>
    </div>
  );
}
