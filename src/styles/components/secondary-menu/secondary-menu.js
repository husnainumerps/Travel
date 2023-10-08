(function () {
  'use strict';
  let tabitems = document.getElementsByClassName('js-tabitem');
  let submenu = document.getElementById('rlr-js-secondary-menu');
  Array.from(tabitems).forEach((t) => {
    t.addEventListener('click', function () {
      let activeTabs = this.parentNode.getElementsByClassName('is-active');
      Array.from(activeTabs).forEach((a) => a.classList.remove('is-active'));
      t.classList.remove('is-active');
      let id = this.id;
      if (this.classList.contains('is-active')) {
        this.classList.remove('is-active');
      } else {
        this.classList.add('is-active');
        if (document.querySelector(`[data-id="${id}"]`)) {
          let pos = document.querySelector(`[data-id="${id}"]`).offsetTop;
          pos = submenu.classList.contains('is-fixed') ? pos - 50 : pos - 120;
          window.scroll({
            top: pos,
            behavior: 'smooth'
          });
        }
      }
    });
  });
})();

window.addEventListener('scroll', function () {
  let scrollPos = this.scrollY;
  let menus = document.getElementsByClassName('js-tabitem');
  if (menus.length && document.querySelector(`[data-id="${menus[0].id}"]`)) {
    if (scrollY > document.querySelector(`[data-id="${menus[0].id}"]`).offsetTop - 120) {
      Array.from(menus).forEach(function (currLink) {
        let refElement = document.querySelector(`[data-id="${currLink.getAttribute('id')}"]`);
        if (refElement) {
          if (refElement.offsetTop - 120 <= scrollPos && refElement.offsetTop - 120 + refElement.getBoundingClientRect().height > scrollPos) {
            //added to remove active class from all a elements
            currLink.classList.add('is-active');
          } else {
            currLink.classList.remove('is-active');
          }
        }
      });
    } else {
      menus[0].classList.add('is-active');
    }
  }
});
