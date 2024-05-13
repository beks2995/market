// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRmQha6WlrqUvbSlkKp5dXMSwUrEkgeOE",
  authDomain: "market-51d48.firebaseapp.com",
  databaseURL: "https://market-51d48-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "market-51d48",
  storageBucket: "market-51d48.appspot.com",
  messagingSenderId: "232919272449",
  appId: "1:232919272449:web:68862e13635832dabb4400"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

