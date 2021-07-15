import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCo9mWp-mLRcW0qs7XacNOxHe1-Yxcv0JQ",
  authDomain: "whatsapp-8d81f.firebaseapp.com",
  projectId: "whatsapp-8d81f",
  storageBucket: "whatsapp-8d81f.appspot.com",
  messagingSenderId: "77178981020",
  appId: "1:77178981020:web:6fe7e157b964dc2bf77b59",
  measurementId: "G-P8ZEGV5F5N",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore()

const auth = app.auth()

const provider = new firebase.auth.GoogleAuthProvider()

export {db, auth, provider}