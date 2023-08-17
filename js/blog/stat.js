//say no more
 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA9KQn1G3UYzBASWyV8NUuMsYSVCM1swgc",
    authDomain: "pupi-notification.firebaseapp.com",
    projectId: "pupi-notification",
    storageBucket: "pupi-notification.appspot.com",
    messagingSenderId: "650262672723",
    appId: "1:650262672723:web:000f0b8456795feb3e5da6",
    measurementId: "G-V9EEPDVE2B"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
