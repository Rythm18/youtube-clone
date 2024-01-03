import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User
 } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0yKzuImmCCWlS0UQjIyhis9mSgXwXX40",
  authDomain: "yt-clone-f85f5.firebaseapp.com",
  projectId: "yt-clone-f85f5",
  appId: "1:370848107359:web:a9c601b08608c0677a84ea",
  measurementId: "G-65H3R0MNRM"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

const auth = getAuth(app);

export function signinWithGoogle() {
  signInWithPopup(auth, new GoogleAuthProvider());
}

export function signOut() {
 return auth.signOut();
}

export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}