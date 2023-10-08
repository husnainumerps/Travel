"use strict";
/*eslint-disable*/
var inputs = document.querySelectorAll(".rlr-banner-input-group__input");

Array.from(inputs).forEach((input) => {
  input.setAttribute("size", input.getAttribute("placeholder").length + 3);
});

import "./banner-input-group-activity";
import "./banner-input-group-location";
import "./banner-input-group-date";
import "./banner-input-group-submit-form";
