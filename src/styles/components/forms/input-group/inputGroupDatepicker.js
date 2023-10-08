import flatpickr from "flatpickr";
("use strict");
flatpickr(".rlr-js-test123", {
  mode: "range",
  minDate: "today",
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
  allowInput: true
});
