// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFo4PTKyRFCnV2TUM3AXyMfgxAnlpvsME",
  authDomain: "json-admin.firebaseapp.com",
  projectId: "json-admin",
  storageBucket: "json-admin.appspot.com",
  messagingSenderId: "685810828668",
  appId: "1:685810828668:web:5efdb49b0789ad6e5210f9"
};

// Initialize Firebase
const fireBaseJsonAdminApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

//Code for Create user in FBDB
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformations = {}
  ) => {
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshort = await getDoc(userDocRef);

  if (!userSnapshort.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date();

    try {
      setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ... additionalInformations
      });
    } catch (error) {
      console.log("Error for create user :" + error)
    }

  } else {
    return userDocRef
  }

}

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}
