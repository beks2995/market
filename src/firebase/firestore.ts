import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyDRmQha6WlrqUvbSlkKp5dXMSwUrEkgeOE",
    authDomain: "market-51d48.firebaseapp.com",
    databaseURL: "https://market-51d48-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "market-51d48",
    storageBucket: "market-51d48.appspot.com",
    messagingSenderId: "232919272449",
    appId: "1:232919272449:web:68862e13635832dabb4400"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
