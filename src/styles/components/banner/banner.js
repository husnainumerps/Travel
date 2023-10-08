"use strict";
const { default: Splide } = require("@splidejs/splide");

if (document.getElementById("rlr_banner_slider")) {
  var splide = new Splide("#rlr_banner_slider", {
    pagination: true,
    type: "fade",
    rewind: true,
    arrows: false,
    autoplay: true,
    lazyLoad: true,
    speed: "750",
    autoHeight: true,
    pauseOnHover: false,
    easing: "cubic-bezier(0.0, 0.0, 1.0, 1.0)"
  });
  splide.mount();

  // Animated text
  splide.on("active", function (e) {
    const element = document.querySelectorAll(".rlr-banner-splide__slogan");
    element[e.index].classList.add("animate__animated", "animate__fadeInDown");
  });

  splide.on("active", function (e) {
    const element = document.querySelectorAll(".rlr-banner-js-arrow-prev");
    element[e.index].classList.add("animate__animated", "animate__backInLeft");
  });

  splide.on("active", function (e) {
    const element = document.querySelectorAll(".rlr-banner-js-arrow-next");
    element[e.index].classList.add("animate__animated", "animate__backInRight");
  });

  splide.on("active", function (e) {
    const element = document.querySelectorAll(".rlr-banner-splide__payment-option");
    element[e.index].classList.add("animate__animated", "animate__fadeInUp");
  });

  splide.on("inactive", function (e) {
    const element = document.querySelectorAll(".rlr-banner-splide__slogan");
    element[e.index].classList.remove("animate__animated", "animate__fadeInRight");
  });

  // Custom Next / Previous arrows
  let prev = document.getElementsByClassName("rlr-banner-js-arrow-prev");
  let next = document.getElementsByClassName("rlr-banner-js-arrow-next");
  Array.from(prev).forEach((p) => {
    p.addEventListener("click", function () {
      splide.go("<");
    });
  });
  Array.from(next).forEach((n) => {
    n.addEventListener("click", function () {
      splide.go(">");
    });
  });
}
