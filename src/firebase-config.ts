import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTT4_juu5HisBpVkfEGLITlKmUYReatQ0",
  authDomain: "project4-33cc2.firebaseapp.com",
  projectId: "project4-33cc2",
  storageBucket: "project4-33cc2.appspot.com",
  messagingSenderId: "899718233501",
  appId: "1:899718233501:web:3475aced705fe6812ac374"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
