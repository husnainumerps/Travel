"use strict";
/*eslint-disable*/
var navigation = new Navigation(document.getElementById("navigation"));
var navigationTransParent = new Navigation(document.getElementById("rlrTransNav"));

function setScrollAnimation() {
  var scrollPosY = window.pageYOffset | document.body.scrollTop;

  if (document.getElementById("rlrTransNav")) {
    if (scrollPosY > 50) {
      navigationTransParent.classList.add("navigation-animated");
    } else {
      navigationTransParent.classList.remove("navigation-animated");
    }
  } else if (document.getElementById("navigation")) {
    if (scrollPosY > 50) {
      navigation.classList.add("navigation-animated");
    } else {
      navigation.classList.remove("navigation-animated");
    }
  }
}

function transparentNav() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navigationTransParent.classList.remove("navigation-transparent");
  } else {
    navigationTransParent.classList.add("navigation-transparent");
  }
}

if (document.getElementById("rlrTransNav")) {
  window.onscroll = function () {
    transparentNav();
    setScrollAnimation();
  };
} else if (document.getElementById("navigation")) {
  window.onscroll = function () {
    setScrollAnimation();
  };
}
