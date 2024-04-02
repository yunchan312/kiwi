import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq1KVrqgEZr3taPljxTQzutzVPmz_Gq8o",
  authDomain: "kiwi-57b9f.firebaseapp.com",
  projectId: "kiwi-57b9f",
  storageBucket: "kiwi-57b9f.appspot.com",
  messagingSenderId: "809588504444",
  appId: "1:809588504444:web:5e3994256d3b3cc9bf16f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getFirestore(app);
