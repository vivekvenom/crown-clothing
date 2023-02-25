import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsqm2d074TkcNJbzKh06Tewo5OKoCqnoU",
  authDomain: "crown-clothing-db-d6141.firebaseapp.com",
  projectId: "crown-clothing-db-d6141",
  storageBucket: "crown-clothing-db-d6141.appspot.com",
  messagingSenderId: "166912227671",
  appId: "1:166912227671:web:c3e5955b7f35bbf8a5e612",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); //GoogleAuthProvider is a class thats why new keyword
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWIthGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return userDocRef;
};
