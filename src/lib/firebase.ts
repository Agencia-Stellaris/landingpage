import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyA7-4Q9l6QjI6oz9smhRlGnxSsa805ejhM",
  authDomain: "stellaris-landing-d9631.firebaseapp.com",
  projectId: "stellaris-landing-d9631",
  storageBucket: "stellaris-landing-d9631.firebasestorage.app",
  messagingSenderId: "529068197655",
  appId: "1:529068197655:web:b5c54946f7cc04d4ec1952",
  measurementId: "G-CDYB65KL2R",
};

const app = initializeApp(firebaseConfig);

// App Check — protects Firestore from unauthorized access
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LdbAKEsAAAAAWraLir0GyyyhEvM7dpchNa_FKV"),
  isTokenAutoRefreshEnabled: true,
});

export const db = getFirestore(app);

// Analytics
export const analytics = isSupported().then((supported) =>
  supported ? getAnalytics(app) : null,
);
