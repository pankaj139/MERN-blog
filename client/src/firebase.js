// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-8410e.firebaseapp.com",
  projectId: "mern-blog-8410e",
  storageBucket: "mern-blog-8410e.appspot.com",
  messagingSenderId: "1058656109701",
  appId: "1:1058656109701:web:898914c724ab87f0cf55ec",
  measurementId: "G-7MSMK2P07G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);