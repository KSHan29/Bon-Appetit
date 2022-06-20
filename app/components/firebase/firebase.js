/* import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD3zPteOYYEFZN3GdOdhMNwHm6qcPpQoyA",
  authDomain: "bonappetit-78e70.firebaseapp.com",
  projectId: "bonappetit-78e70",
  storageBucket: "bonappetit-78e70.appspot.com",
  messagingSenderId: "1058620233492",
  appId: "1:1058620233492:web:4c57c5393fe8e0f3121401",
  // measurementId: "G-SCZVDLXV5M",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };
 */

import { initialiseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3zPteOYYEFZN3GdOdhMNwHm6qcPpQoyA",
  authDomain: "bonappetit-78e70.firebaseapp.com",
  projectId: "bonappetit-78e70",
  storageBucket: "bonappetit-78e70.appspot.com",
  messagingSenderId: "1058620233492",
  appId: "1:1058620233492:web:4c57c5393fe8e0f3121401",
  // measurementId: "G-SCZVDLXV5M",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
