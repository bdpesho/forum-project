import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyDZ48116FD0VxT3voFwLvkttiIGP7x9V28",
    authDomain: "web-forum-project.firebaseapp.com",
    databaseURL: "https://web-forum-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "web-forum-project",
    storageBucket: "web-forum-project.appspot.com",
    messagingSenderId: "11936816753",
    appId: "1:11936816753:web:1a1a7cba741552c71405d0"
  };

export const app = initializeApp(firebaseConfig);
// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);