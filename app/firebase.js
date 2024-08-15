// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSZTc4kScdz4bw2INg53LZkOkHS8UXDPA",
  authDomain: "athe-7e059.firebaseapp.com",
  databaseURL: "https://athe-7e059-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "athe-7e059",
  storageBucket: "athe-7e059.appspot.com",
  messagingSenderId: "485569719438",
  appId: "1:485569719438:web:e524d79dd277298fabeddf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// تهيئة Firebase Storage
const storage = getStorage(app);
// تهيئة Firestore
const db = getFirestore(app);

export { storage, db };
