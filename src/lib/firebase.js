import Firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// import seed file
// import { seedDatabase } from '../seed';
const config = {
    apiKey: "AIzaSyBHrC6VB94b0oBH9l2CYzT8M9EfTL6Jaxc",
    authDomain: "instarl.firebaseapp.com",
    projectId: "instarl",
    storageBucket: "instarl.appspot.com",
    messagingSenderId: "246448928462",
    appId: "1:246448928462:web:10296b569126a41071829f",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// call seed file only ONCE
// seedDatabase(firebase)
export { firebase, FieldValue};