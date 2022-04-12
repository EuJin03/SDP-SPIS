// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDujJ26ALr81Y2AuikKcy7IfuXexFtNEnE",
  authDomain: "tuition-system-spis.firebaseapp.com",
  projectId: "tuition-system-spis",
  storageBucket: "tuition-system-spis.appspot.com",
  messagingSenderId: "828852156021",
  appId: "1:828852156021:web:35627074d57e50860b6a3c",
  measurementId: "G-S9F4E6J3LB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
