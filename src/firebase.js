import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEP-HIOpR7AvLKSa50S3GkrO0Itw2xHP4",
  authDomain: "kiwi-225e1.firebaseapp.com",
  projectId: "kiwi-225e1",
  storageBucket: "kiwi-225e1.appspot.com",
  messagingSenderId: "418526769829",
  appId: "1:418526769829:web:ee1394c2bd2d9d903cd34c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getFirestore(app);
