const { default: Splide } = require("@splidejs/splide");

(function () {
  "use strict";
  let rlrMedia = document.getElementsByClassName("rlr-js-media");

  //check if rlr media content is available
  if (rlrMedia.length) {
    //init main media slider
    let splide = new Splide(".rlr-js-media", {
      // heightRatio: 1 / 2, //height ration i.e 0.2 for landscape
      type: "fade",
      speed: 2000,
      lazyLoad: "nearby",
      height: "50vh",
      pagination: true,
      rewind: true,
      keyboard: "focused",
      breakpoints: {
        375: {
          destroy: false,
          height: "40vh"
        },
        768: {
          destroy: false,
          height: "40vh"
        },
        992: {
          destroy: false,
          height: "50vh"
        }
      }
    });

    //customization on pagination
    splide.on("pagination:mounted", function (data) {
      data.list.classList.add("rlr-media__pagination--hide");
    });
    //on slide update
    splide.on("pagination:updated", function (data, prev, curr) {
      // data.items contains all dot items
      let pageCount = document.getElementsByClassName("rlr-js-page")[0];
      pageCount.textContent = `${curr.page + 1}/${data.items.length}`;
    });

    //mout slider after init
    splide.mount();

    //init thumbnail slider
    let thumbnails = new Splide(".rlr-js-thumbnail-media", {
      direction: "ttb",
      // type: 'loop',
      drag: "free",
      height: "50vh",
      pagination: false,
      rewind: true,
      perPage: 4,
      gap: 10,
      focus: "center",
      keyboard: "focused",
      breakpoints: {
        375: {
          destroy: false,
          height: "40vh"
        },
        768: {
          destroy: false,
          height: "40vh"
        },
        992: {
          destroy: false,
          height: "50vh"
        }
      }
    });

    thumbnails.mount();

    //on thumbnail click callback
    thumbnails.on("click", (d) => {
      thumbnails.go(d.index);
      splide.go(d.index);
    });
  }
})();
