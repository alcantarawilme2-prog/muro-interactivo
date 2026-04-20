import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-_sY1_WxKGOik8pzG7ypy2Kq4v-QyYIk",
  authDomain: "muro-interactivo-4b1fe.firebaseapp.com",
  projectId: "muro-interactivo-4b1fe",
  storageBucket: "muro-interactivo-4b1fe.firebasestorage.app",
  messagingSenderId: "847173173717",
  appId: "1:847173173717:web:9d8b72bfc5a41f00f1bd5c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);