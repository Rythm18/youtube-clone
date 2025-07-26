import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User
 } from "firebase/auth";

const firebaseConfig = {
  apiKey: api-key,
  authDomain: auth-domain,
  projectId: project-id,
  appId: app-id,
  measurementId: m-id
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
