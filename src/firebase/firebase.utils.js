import * as firebase from "firebase/app";
import 'firebase/firebase-auth';
// import '@firebase/auth-types'
import 'firebase/firebase-firestore';


const config = {
    apiKey: "AIzaSyAMYCPfOBeG7wfBIdt4fQojUgfXBciG9Aw",
    authDomain: "afrolace-db.firebaseapp.com",
    databaseURL: "https://afrolace-db.firebaseio.com",
    projectId: "afrolace-db",
    storageBucket: "afrolace-db.appspot.com",
    messagingSenderId: "23654813638",
    appId: "1:23654813638:web:4240f7a8bafe2db2206cc7",
    measurementId: "G-EVKHK04RSE"
};

// storing google user Id in the firestore database
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();


        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('user was not created', error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(config);


export const auth = firebase.auth(); 
export const firestore = firebase.firestore();


// setting up google authentication utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;