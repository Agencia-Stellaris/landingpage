import type { FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA7-4Q9l6QjI6oz9smhRlGnxSsa805ejhM",
  authDomain: "stellaris-landing-d9631.firebaseapp.com",
  projectId: "stellaris-landing-d9631",
  storageBucket: "stellaris-landing-d9631.firebasestorage.app",
  messagingSenderId: "529068197655",
  appId: "1:529068197655:web:b5c54946f7cc04d4ec1952",
  measurementId: "G-CDYB65KL2R",
};

const RECAPTCHA_SITE_KEY = "6LdbAKEsAAAAAWraLir0GyyyhEvM7dpchNa_FKV";

let appPromise: Promise<FirebaseApp> | null = null;
let appCheckPromise: Promise<void> | null = null;

function getApp(): Promise<FirebaseApp> {
  if (!appPromise) {
    appPromise = import("firebase/app").then(({ initializeApp }) =>
      initializeApp(firebaseConfig),
    );
  }
  return appPromise;
}

// App Check is only required before Firestore reads/writes — keep it out of the
// initial bundle and off the main thread until a user actually submits a form.
function ensureAppCheck(): Promise<void> {
  if (!appCheckPromise) {
    appCheckPromise = (async () => {
      const [app, { initializeAppCheck, ReCaptchaV3Provider }] = await Promise.all([
        getApp(),
        import("firebase/app-check"),
      ]);
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY),
        isTokenAutoRefreshEnabled: true,
      });
    })();
  }
  return appCheckPromise;
}

export async function loadAnalytics() {
  const [app, { getAnalytics, isSupported }] = await Promise.all([
    getApp(),
    import("firebase/analytics"),
  ]);
  const supported = await isSupported();
  return supported ? getAnalytics(app) : null;
}

export async function addContactRequest(
  payload: Record<string, unknown>,
): Promise<void> {
  await ensureAppCheck();
  const [app, { getFirestore, collection, addDoc, serverTimestamp }] =
    await Promise.all([getApp(), import("firebase/firestore")]);
  const db = getFirestore(app);
  await addDoc(collection(db, "contactRequests"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}

const CONSENT_KEY = "cookieConsent";

function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

/**
 * Fire-and-forget custom analytics event for a resource download click.
 * Silent no-op if cookie consent was not granted, if Analytics fails to
 * initialize, or if running in an environment where Analytics is unsupported.
 */
export async function logResourceDownload(
  resourceId: string,
  resourceType: string,
): Promise<void> {
  if (!hasAnalyticsConsent()) return;
  try {
    const analytics = await loadAnalytics();
    if (!analytics) return;
    const { logEvent } = await import("firebase/analytics");
    logEvent(analytics, "resource_download", {
      resource_id: resourceId,
      resource_type: resourceType,
    });
  } catch {
    // Best-effort tracking — never bubble up errors that would block the
    // download navigation.
  }
}
