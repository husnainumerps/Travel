import tippy from 'tippy.js';
('use strict');
/* Product Single Page -> Social share popover */
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover-share"]'));
popoverTriggerList.map(function (popoverTriggerEl) {
  const popoverId = popoverTriggerEl.getAttribute('data-content-id');
  const popoverButtonId = popoverTriggerEl.getAttribute('id');
  if (popoverId) {
    const contentEl = document.getElementById(popoverId).innerHTML;
    tippy('#' + popoverButtonId, {
      theme: 'rlr-custom-tippy',
      trigger: 'click',
      allowHTML: true,
      interactive: true,
      content: contentEl,
      maxWidth: 375
    });
  }
});

/* Add to Wishlist */
let whislist = document.getElementsByClassName('rlr-js-action-wishlist');

whislist.length &&
  Array.from(whislist).forEach((w) => {
    w.addEventListener('click', function () {
      let helptext = this.nextElementSibling;
      let value = '';
      if (this.classList.contains('is-active')) {
        this.classList.remove('is-active');
        value = 'Removed';
      } else {
        this.classList.add('is-active');
        value = 'Saved';
      }
      helptext.textContent = value;
      helptext.style.opacity = 1;
      helptext.style.visibility = 'visible';
      let pos = helptext.getBoundingClientRect().width / 2 + 24;
      helptext.style.left = `calc(100% - ${pos}px)`;
      if (helptext.closest('.rlr-js-detail-wrapper')) {
        let parentRight = helptext.closest('.rlr-js-detail-wrapper').getBoundingClientRect().right;
        let childRight = helptext.getBoundingClientRect().right;

        if (parentRight < childRight) {
          helptext.style.right = 0;
          helptext.style.left = 'unset';
        } else {
          helptext.style.right = `calc(100% - ${pos}px)`;
        }
      } else {
        helptext.style.left = `calc(100% - ${pos}px)`;
      }
      setTimeout(() => {
        helptext.style.opacity = 0;
        helptext.style.visibility = 'hidden';
      }, 2000);
    });
  });
