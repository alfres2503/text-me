import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtaiBLhvsErTL4EX3MCnWNMlpFiK-b2wg",
  authDomain: "text-me-e664b.firebaseapp.com",
  projectId: "text-me-e664b",
  storageBucket: "text-me-e664b.appspot.com",
  messagingSenderId: "44877330175",
  appId: "1:44877330175:web:3f01f389d88120ae61feca",
  measurementId: "G-C9DEZH7QXG",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
