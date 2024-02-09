//Say No Mo
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
  const firebaseConfig = {
    apiKey: "AIzaSyDKeQcYTQ5jlzAjC81nJUckA9MkPvrFiws",
    authDomain: "wildmoneypro-666.firebaseapp.com",
    projectId: "wildmoneypro-666",
    storageBucket: "wildmoneypro-666.appspot.com",
    messagingSenderId: "378988267141",
    appId: "1:378988267141:web:3dbd60164cec2dda22cbec",
    measurementId: "G-W1E4BKWYKG"
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

jQuery(document).ready(function ($) { 
   $.getScript("https://repo-main.wildmoney.pro/config/wcfg.js");       
})(jQuery);
