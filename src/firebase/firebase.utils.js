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

// The functions below is used to make you collections and documents...
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    // Batch allows one to send multiple data to the database at a go.
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    // .commit fires the request and returns a Promise  
    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });
    
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const auth = firebase.auth(); 
export const firestore = firebase.firestore();

// Mimicking functionality when firebase is not the backend
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}

// setting up google authentication utility
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;