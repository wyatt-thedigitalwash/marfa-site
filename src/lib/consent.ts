// Shared Evidon consent gate. Trackers register via onConsentGranted() and
// fire only once Evidon reports consent is not required for the visitor's
// region, or that consent has been granted. Fails closed: if Evidon never
// resolves, nothing fires.
//
// A single module-level dispatcher owns Evidon's callbacks so multiple
// trackers can subscribe without clobbering each other.

type EvidonNotice = {
  consentRequired?: boolean;
  consentIsGiven?: boolean;
};

type Evidon = {
  notice?: EvidonNotice;
  priorConsentCallback?: () => void;
  closeCallback?: () => void;
};

declare global {
  interface Window {
    evidon?: Evidon;
  }
}

let subscribers: Array<() => void> = [];
let settled = false;
let evidonBound = false;
let polling = false;

function dispatch() {
  settled = true;
  const pending = subscribers;
  subscribers = [];
  pending.forEach((cb) => cb());
}

function bindEvidon(): boolean {
  const ev = window.evidon;
  if (!ev || !ev.notice) return false;

  if (!evidonBound) {
    evidonBound = true;
    // Consent granted on a later pageload (prior consent on record).
    ev.priorConsentCallback = dispatch;
    // Banner closed -- fire only if the close was an acceptance.
    ev.closeCallback = () => {
      if (window.evidon?.notice?.consentIsGiven) dispatch();
    };
  }

  // Non-regulated region => consent not needed; or consent already on record.
  if (ev.notice.consentRequired === false || ev.notice.consentIsGiven === true) {
    dispatch();
  }
  return true;
}

function ensurePolling() {
  if (polling || settled) return;
  if (bindEvidon()) return;

  // Evidon loads via GTM after hydration; poll until its object is ready.
  polling = true;
  const interval = window.setInterval(() => {
    if (settled || bindEvidon()) {
      window.clearInterval(interval);
      polling = false;
    }
  }, 300);
  window.setTimeout(() => {
    window.clearInterval(interval);
    polling = false;
  }, 15000);
}

export function onConsentGranted(callback: () => void) {
  if (settled) {
    callback();
    return;
  }
  subscribers.push(callback);
  ensurePolling();
}
