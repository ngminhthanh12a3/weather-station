// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARG5SuaBFkyxXjyHBGzzGMH30cq4LrELo",
  authDomain: "vnpt-web-push.firebaseapp.com",
  databaseURL: "https://vnpt-web-push-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vnpt-web-push",
  storageBucket: "vnpt-web-push.appspot.com",
  messagingSenderId: "784077660924",
  appId: "1:784077660924:web:d2045125b517029d1fed79",
  measurementId: "G-QQYF7PNY6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
export default app;
