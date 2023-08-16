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
    appId: "1:650262672723:web:2713d176cbccc41c3e5da6",
    measurementId: "G-Y3T9PMQLH1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
