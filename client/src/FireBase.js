
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDiqTTUjA6hy7DnN5zOcFG9zkRfyVSjT68",
  authDomain: "examnotes-2a958.firebaseapp.com",
  projectId: "examnotes-2a958",
  storageBucket: "examnotes-2a958.firebasestorage.app",
  messagingSenderId: "273597659429",
  appId: "1:273597659429:web:3b3f226202d6fdf4a0c2cc",
  measurementId: "G-HG1MYBGDRL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const provider= new GoogleAuthProvider();
export {auth,provider};