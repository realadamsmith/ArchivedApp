import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'
import { firebaseConfig } from './config';
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();


export const firestore = firebase.firestore();
export const firestoreNo = firebase.firestore;
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const storage = firebase.storage
export const getStorage = firebase.storage.getStorage
export const getDownloadURL = firebase.storage.getDownloadURL
export const ref = firebase.storage.ref
GoogleProvider.setCustomParameters({ prompt: 'select_account' });


export const handleUserProfile = async ({ userAuth, additionalData }) => { // CALLED AFTER USER HAS BEEN AUTHD IN APP
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`); //WE CHECK THE USERS COLLECTION IF THEY ARE THERE
  const snapshot = await userRef.get();
  if (!snapshot.exists) {                     // IF THEY DO NOT EXIST THEN WE CREATE A NEW DOC FOR THEM
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    const userRoles = ['user'];

    try {
      await userRef.set({                 // THEN WE SEND TO FIRESTORE AND STORE IN USERS COLLECTION
        displayName,
        email,
        createdDate: timestamp,
        userRoles,
        ...additionalData
      });
    } catch(err) {
        // const err = ["Oops, login not found or error, please try again."];
      console.log(err);
    }
  }
//   console.log(userRef, 1)
  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
}