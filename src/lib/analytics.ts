// Google Analytics (GA4) and Google Ads (gtag.js)
const MEASUREMENT_ID = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as
  | string
  | undefined;

const GOOGLE_ADS_CONVERSION_ID = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID as
  | string
  | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// gtag.js only executes dataLayer entries that are real `arguments` objects.
const makeArguments = function () {
  // eslint-disable-next-line prefer-rest-params
  return arguments;
} as unknown as (...rest: unknown[]) => IArguments;

function toArguments(args: unknown[]): IArguments {
  return makeArguments(...args);
}

export function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(toArguments(args));
}

export function initAnalytics() {
  if (typeof document === "undefined") return;
  if (!MEASUREMENT_ID && !GOOGLE_ADS_CONVERSION_ID) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;

  const primaryId = MEASUREMENT_ID || GOOGLE_ADS_CONVERSION_ID;
  if (!primaryId) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${primaryId}`;
  document.head.appendChild(script);

  gtag("js", new Date());

  if (MEASUREMENT_ID) {
    gtag("config", MEASUREMENT_ID, { send_page_view: true });
  }

  if (GOOGLE_ADS_CONVERSION_ID) {
    gtag("config", GOOGLE_ADS_CONVERSION_ID);
  }
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

/**
 * Track a Google Ads conversion.
 * `label` is optional. If provided it should be the conversion label suffix,
 * e.g. "abcD1234eFghIj0". The full send_to becomes "AW-XXXXXXXXXX/label".
 */
export function trackConversion(
  label?: string,
  value?: number,
  currency = "USD"
) {
  if (!GOOGLE_ADS_CONVERSION_ID) return;

  const sendTo = label
    ? `${GOOGLE_ADS_CONVERSION_ID}/${label}`
    : GOOGLE_ADS_CONVERSION_ID;

  const params: Record<string, unknown> = { send_to: sendTo };
  if (typeof value === "number") {
    params.value = value;
    params.currency = currency;
  }

  gtag("event", "conversion", params);
}
