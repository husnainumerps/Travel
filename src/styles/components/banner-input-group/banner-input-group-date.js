"use strict";

/*eslint-disable*/
// /*  Home Page => Search Box Date Range
// ------------------------------------------ */

const eee_home_search_flatpickr = document.querySelector(".eee_home_search_flatpickr");
if (eee_home_search_flatpickr !== null) {
  window.addEventListener("DOMContentLoaded", () => {
    flatpickr(".eee_home_search_flatpickr", {
      mode: "range",
      minDate: "today",
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      allowInput: true,
      showMonths: 2
    });
  });
}
