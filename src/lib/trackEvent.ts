import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (analytics && typeof window !== "undefined") {
    logEvent(analytics, eventName, params);
    if (import.meta.env.DEV) {
      // Debug logging
      console.debug("[Analytics]", eventName, params);
    }
  }
}; 