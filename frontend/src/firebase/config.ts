import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "hitech-6a9b3",
  appId: "1:452443116581:web:6dfd5ddded95548ec79bcc",
  storageBucket: "hitech-6a9b3.firebasestorage.app",
  apiKey: "AIzaSyAbQ_re9pyz8NttSptSe0rJVIjGHDOQLHE",
  authDomain: "hitech-6a9b3.firebaseapp.com",
  messagingSenderId: "452443116581",
  measurementId: "G-46D29T4ZTH",
  projectNumber: "452443116581"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
