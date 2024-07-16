// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDnHQKbcCNqiT98TPOjYFRMh3E2m6E-Wek",
   authDomain: "todo-a17ca.firebaseapp.com",
   projectId: "todo-a17ca",
   storageBucket: "todo-a17ca.appspot.com",
   messagingSenderId: "608210025602",
   appId: "1:608210025602:web:6c6a8efaf524a2626d489b",
};

// upadtion
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
