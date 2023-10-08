'use strict';
var dropdownmenu = document.getElementsByClassName('rlr-js-dropdown');
Array.from(dropdownmenu).forEach((m) => {
  var buttons = m.getElementsByClassName('rlr-js-dropdown-button');
  var dropdowns = m.getElementsByClassName('rlr-js-dropdown-item');
  Array.from(dropdowns).forEach((d) => {
    d.addEventListener('click', function () {
      buttons[0].textContent = this.textContent;

      Array.from(dropdowns).forEach((dr) => dr.classList.contains('active') && dr.classList.remove('active'));

      this.classList.add('active');
    });
  });
});
