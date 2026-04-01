import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

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

export const db = getFirestore(app);

// Analytics — only initialize in the browser (not during SSR/build)
export const analytics = isSupported().then((supported) =>
  supported ? getAnalytics(app) : null,
);
