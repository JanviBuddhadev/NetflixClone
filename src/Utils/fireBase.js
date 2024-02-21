// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxr8LYN5owu_kxVXNxWp3CI8TznbOeGIU",
  authDomain: "netflix-edb2f.firebaseapp.com",
  projectId: "netflix-edb2f",
  storageBucket: "netflix-edb2f.appspot.com",
  messagingSenderId: "95583862096",
  appId: "1:95583862096:web:0190d4e25e4f7af62c4055",
  measurementId: "G-ZQCHJJYCLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();