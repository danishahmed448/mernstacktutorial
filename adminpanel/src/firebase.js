import { initializeApp } from 'firebase/app';
import { getStorage,ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAUKFmg5aSFvVQ4_GIUPLOldxaaS1UhvE0",
  authDomain: "anyflix-9bf0f.firebaseapp.com",
  projectId: "anyflix-9bf0f",
  storageBucket: "anyflix-9bf0f.appspot.com",
  messagingSenderId: "902144466305",
  appId: "1:902144466305:web:172a98fc2f16a08f419c80",
  measurementId: "G-2D5N09B9V6"
};
  const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
