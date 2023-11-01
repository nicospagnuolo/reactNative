import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCyGsOjSWx5zZmfM5K7TXyEZ4NfeW13DBI",
    authDomain: "argentexto.firebaseapp.com",
    projectId: "argentexto",
    storageBucket: "argentexto.appspot.com",
    messagingSenderId: "676524697347",
    appId: "1:676524697347:web:7bcd577b12c02f020ceb36"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = app.firestore()
