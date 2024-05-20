// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCn2axeGSKDg1ecGCpooLyeTaJQcZ5JDk8",
  authDomain: "video-c04a5.firebaseapp.com",
  projectId: "video-c04a5",
  storageBucket: "video-c04a5.appspot.com",
  messagingSenderId: "686783498217",
  appId: "1:686783498217:web:60ed312081e894122aad78",
  measurementId: "G-ZXEPWNJ43J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
