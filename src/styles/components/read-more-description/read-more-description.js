(function () {
  'use strict';
  let readmore = document.getElementsByClassName('rlr-js-readmore');
  let readmoreContent = document.getElementsByClassName('rlr-js-desc');
  if (readmoreContent.length) {
    Array.from(readmoreContent).forEach((rc) => {
      let maxHeight = rc.getBoundingClientRect().height;

      let checkOverflow = function (height, rmoreContent) {
        if (height > 100) {
          rmoreContent.nextElementSibling.classList.add('is-more');
          rmoreContent.classList.add('is-more');
        } else {
          rmoreContent.nextElementSibling.classList.remove('is-more');
          rmoreContent.classList.remove('is-more');
        }
      };

      checkOverflow(maxHeight, rc);

      let doit;
      window.addEventListener('resize', function (e) {
        e.preventDefault();
        clearTimeout(doit);
        doit = setTimeout(function () {
          checkOverflow(maxHeight, rc);
        }, 300);
      });
    });
    if (readmore.length) {
      Array.from(readmore).forEach((rd) => {
        rd.addEventListener('click', function (e) {
          e.preventDefault();
          if (this.classList.contains('is-active')) {
            this.classList.remove('is-active');
            this.textContent = 'Show more...';
            this.previousElementSibling.classList.add('is-more');
          } else {
            this.classList.add('is-active');
            this.textContent = 'Show less...';
            this.previousElementSibling.classList.remove('is-more');
          }
        });
      });
    }
  }
})();
