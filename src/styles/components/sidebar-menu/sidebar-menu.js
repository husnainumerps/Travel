/*eslint-disable*/
function ready(callbackFunc) {
  "use strict";
  if (document.readyState !== "loading") {
    callbackFunc();
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", callbackFunc);
  } else {
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState === "complete") {
        callbackFunc();
      }
    });
  }
}

ready(function () {
  let url = document.getElementById("rlr-js-sub-menu");

  if (url) {
    document.getElementById("rlr-js-sub-menu").addEventListener("change", () => {
      window.location = url.value;
    });
  }
  return false;
});
