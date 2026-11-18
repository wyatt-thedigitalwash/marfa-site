// Injects the label's analytics / advertising tags ONLY after the visitor
// consents to the matching category -- nothing non-essential fires before
// consent. These are the tag IDs that previously loaded unconditionally from
// the layout; the loading logic lives in labelTags.ts (shared across the
// label's artist sites).
//
// Replaces the old Evidon-gated MetaPixel/GoogleTags components, which waited
// on an Evidon script this site never loaded (so they never fired at all),
// and the GTM container that loaded unconditionally from the layout.

import { type Consent, readConsent } from "./consent";
import { applyLabelTags, trackLabelPageView, type LabelTagConfig } from "./labelTags";

const TAGS: LabelTagConfig = {
  // The container itself carries GA4 (G-FVWZ0RM4DH), Google Ads
  // (AW-17574370157) and the Meta Pixel (1858545644702596), so those are not
  // loaded directly -- that would double count.
  gtm: "GTM-5MF7DJ3X",
};

/** Inject scripts for every category the user has consented to. Additive only. */
export function applyConsent(consent: Consent) {
  applyLabelTags(TAGS, consent);
  // Functional and Social categories have no third-party scripts on this site;
  // they are reserved so the choice is recorded for future use.
}

/** Report a client-side route change to whatever tags consent allowed. */
export function trackSpaPageView() {
  const consent = readConsent();
  if (consent) trackLabelPageView(TAGS, consent);
}
