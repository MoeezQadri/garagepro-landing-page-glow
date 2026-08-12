// Google Analytics (GA4) via gtag.js
const MEASUREMENT_ID = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as
  | string
  | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // gtag.js only executes commands pushed as an `arguments` object.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

export function initAnalytics() {
  if (!MEASUREMENT_ID || typeof document === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID);
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!MEASUREMENT_ID) return;
  gtag("event", name, params ?? {});
}

export function trackCta(
  label: string,
  params?: Record<string, unknown>,
  eventName = "cta_click"
) {
  trackEvent(eventName, { label, ...(params ?? {}) });
}
