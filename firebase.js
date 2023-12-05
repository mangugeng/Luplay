// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMpFSS-o_sb6wg0CyGC6xWvf9BcG01fdk",
  authDomain: "lunarvisionapp.firebaseapp.com",
  projectId: "lunarvisionapp",
  storageBucket: "lunarvisionapp.appspot.com",
  messagingSenderId: "1015585207701",
  appId: "1:1015585207701:web:b4363874a3f4379477f29c",
  measurementId: "G-LP12Y4VW57"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)