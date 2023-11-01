import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDUQJqGirnxk1nQGgIUsJRtXTcg4E-Mqno",
    authDomain: "demoprog3-dcbcd.firebaseapp.com",
    projectId: "demoprog3-dcbcd",
    storageBucket: "demoprog3-dcbcd.appspot.com",
    messagingSenderId: "872522862021",
    appId: "1:872522862021:web:76d65e9560b6e433610fac"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = app.firestore()
