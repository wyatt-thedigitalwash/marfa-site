"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { onConsentGranted } from "@/lib/consent";

// Meta (Facebook) Pixel ported from the legacy site, gated behind Evidon
// consent via the shared consent gate.
const PIXEL_ID = "1858545644702596";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  const initialized = useRef(false);
  const firstLoad = useRef(true);

  useEffect(() => {
    onConsentGranted(() => {
      if (initialized.current || window.fbq) return;
      initialized.current = true;
      const s = document.createElement("script");
      s.id = "meta-pixel";
      s.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`;
      document.head.appendChild(s);
    });
  }, []);

  // Track client-side route changes once the pixel is live.
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    if (initialized.current) window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
