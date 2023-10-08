import Swiper, { Autoplay, Navigation, Pagination, FreeMode } from "swiper";
/* eslint-disable */
("use strict");
Swiper.use([Autoplay]);

// Category cards carousel
const categoryCardSwiper = new Swiper(".rlr-js-category-card-swiper", {
  // configure Swiper to use modules
  modules: [Navigation, Pagination, FreeMode],
  direction: "horizontal",
  slidesPerView: "auto",
  slidesPerGroup: 1,
  spaceBetween: 16,
  freeMode: true,
  scrollbar: {
    el: ".swiper-scrollbar"
  },
  mousewheel: true,
  loop: true,
  autoplay: {
    delay: 3000
  },
  speed: 750,
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  loop: true,
  breakpoints: {
    768: {
      slidesPerView: 2,
      slidesPerGroup: 1
    },
    992: {
      slidesPerView: 3,
      slidesPerGroup: 2
    },
    1200: {
      slidesPerView: 3,
      slidesPerGroup: 2,
      spaceBetween: 32
    },
    1400: {
      slidesPerView: 4,
      slidesPerGroup: 2
    }
  },
  // Navigation arrows
  navigation: {
    nextEl: ".button--next",
    prevEl: ".button--previous"
  }
});

// Product cards carousel
const productCardSwiper = new Swiper(".rlr-js-product-card-swiper", {
  // configure Swiper to use modules
  modules: [Navigation, Pagination, FreeMode],
  slidesPerView: "auto",
  slidesPerGroup: 1,
  spaceBetween: 16,
  speed: 750,
  effect: "fade",
  preventClicks: false,
  freeMode: true,
  scrollbar: {
    el: ".swiper-scrollbar"
  },
  mousewheel: true,
  loop: true,
  fadeEffect: {
    crossFade: true
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      slidesPerGroup: 1
    },
    992: {
      slidesPerView: 3,
      slidesPerGroup: 2
    },
    1200: {
      slidesPerView: 4,
      slidesPerGroup: 2,
      loopFillGroupWithBlank: true,
      allowTouchMove: false,
      speed: 500,
      spaceBetween: 16
    }
  },
  // Navigation arrows
  navigation: {
    nextEl: ".button--next",
    prevEl: ".button--previous"
  }
});

// Team cards carousel
const teamCardSwiper = new Swiper(".rlr-js-team-card-swiper", {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 16,
  centeredSlides: false,
  slidesPerGroupSkip: 1,
  speed: 500,
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  loop: true,
  breakpoints: {
    1200: {
      allowTouchMove: false,
      spaceBetween: 32
    },
    1600: {
      slidesPerView: 1.2
    }
  },
  // Navigation arrows
  navigation: {
    nextEl: ".button--next",
    prevEl: ".button--previous"
  }
});

// Dynamic Filter Swiper
const dynamicFilterSwiper = new Swiper(".rlr-js-dynamic-filter-swiper", {
  modules: [Navigation, Pagination, FreeMode],
  direction: "horizontal",
  slidesPerView: "auto",
  slidesPerGroup: 3,
  spaceBetween: 16,
  freeMode: true,
  scrollbar: {
    el: ".swiper-scrollbar"
  },
  mousewheel: true,
  // Navigation arrows
  navigation: {
    nextEl: ".splide__arrow--next",
    prevEl: ".splide__arrow--prev"
  }
});

// Product card item multi-image carousel

const productMultiImageSwiper = new Swiper(".rlr-js-product-multi-image-swiper", {
  modules: [Navigation, Pagination, FreeMode],
  spaceBetween: 30,
  effect: "fade",
  preventClicks: false,
  navigation: {
    nextEl: ".splide__arrow--next",
    prevEl: ".splide__arrow--prev"
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
});
