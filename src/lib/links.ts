// Central place for external links so they're easy to update
export const CALENDLY_URL = "https://calendly.com/mygaragepro/demo";
export const BLOG_URL = "https://blog.mygaragepro.co";
export const CONTACT_EMAIL = "info@mygaragepro.co";
export const APP_SUBSCRIBE_URL = "https://app.mygaragepro.co/subscribe";

export const getPlanSubscribeUrl = (plan: string) =>
  `${APP_SUBSCRIBE_URL}?plan=${encodeURIComponent(plan.toLowerCase())}`;
