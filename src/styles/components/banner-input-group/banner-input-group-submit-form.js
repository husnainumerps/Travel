/*  Home Page => Search Box => Submit Form
------------------------------------------ */
"use strict";
/*eslint-disable*/
// var eee_params = window.eee_params;
function eeeSubmitSearchForm() {
  var search_url = window.eee_params.search_url + "?opt=home";
  var daterange = document.getElementById("rlr-banner-input-group-dates");
  var destination_input = document.getElementById("destination_input");
  var activity_input = document.getElementById("activity_input");
  var eeeAjaxCall;

  var data = "action=home_search_urlify";
  if (destination_input !== null) {
    data = data + "&destination_input=" + destination_input.value;
  }

  if (daterange !== null) {
    data = data + "&daterange=" + daterange.value;
  }

  if (activity_input !== null) {
    data = data + "&activity_input=" + activity_input.value;
  }

  eeeAjaxCall(
    data,
    (function (returnVal) {
      if (returnVal !== null) {
        var response = JSON.parse(returnVal);
        window.location.href = search_url + response.content;
        return false;
      }
    })()
  );
}
