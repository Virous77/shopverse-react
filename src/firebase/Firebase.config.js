import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCIK69y-bdEB6-EAD6b3WPHbesXxs4Ulrk",
  authDomain: "signup-d4f2a.firebaseapp.com",
  databaseURL:
    "https://signup-d4f2a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "signup-d4f2a",
  storageBucket: "signup-d4f2a.appspot.com",
  messagingSenderId: "841285263516",
  appId: "1:841285263516:web:d7df457f4bf23eb1f94d59",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
