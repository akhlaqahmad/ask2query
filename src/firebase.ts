import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported, setUserId } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Analytics only in browser and after consent
declare global {
  interface Window { analyticsConsent?: boolean; }
}

let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined" && window.analyticsConsent) {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
      if (import.meta.env.DEV) {
        window['FIREBASE_ANALYTICS_DEBUG_MODE'] = true;
      }
    }
  });
}

export { app, analytics, setUserId }; 