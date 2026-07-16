"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { onConsentGranted } from "@/lib/consent";

// Google Analytics 4 + Google Ads ported from the legacy site, gated behind
// Evidon consent. Both share a single gtag.js load.
const GA4_ID = "G-FVWZ0RM4DH";
const ADS_ID = "AW-17574370157";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export default function GoogleTags() {
  const pathname = usePathname();
  const initialized = useRef(false);
  const firstLoad = useRef(true);

  useEffect(() => {
    onConsentGranted(() => {
      if (initialized.current || window.gtag) return;
      initialized.current = true;

      const lib = document.createElement("script");
      lib.async = true;
      lib.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
      document.head.appendChild(lib);

      const inline = document.createElement("script");
      inline.id = "google-gtag";
      inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');gtag('config','${ADS_ID}');`;
      document.head.appendChild(inline);
    });
  }, []);

  // GA4 via gtag.js does not auto-track SPA navigations; send page_view on change.
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    if (initialized.current) {
      window.gtag?.("event", "page_view", { page_path: pathname });
    }
  }, [pathname]);

  return null;
}
