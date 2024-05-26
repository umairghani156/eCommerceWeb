import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_9RZpzueRLCp6ogrORrsqR4yMIQFJLmc",
  authDomain: "ecommerce-5cf18.firebaseapp.com",
  projectId: "ecommerce-5cf18",
  storageBucket: "ecommerce-5cf18.appspot.com",
  messagingSenderId: "511210118724",
  appId: "1:511210118724:web:db049500f1b7f58b00a611",
  measurementId: "G-FKYLQTTX30"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
    app,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
}