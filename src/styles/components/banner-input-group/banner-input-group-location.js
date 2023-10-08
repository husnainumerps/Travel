"use strict";
/*eslint-disable*/
/*  Home Page => Search Box => Destination/Location
------------------------------------------ */
var destinInputClasses = document.querySelectorAll("#destination_input");
const resDestiHTML = document.getElementById("home_destination_results");

Array.from(destinInputClasses).forEach((b) => {
  b.oninput = function () {
    let results = [];
    const userInput = b.value;
    resDestiHTML.innerHTML = "";
    if (userInput.length > 0) {
      results = getDestiData(userInput);
      resDestiHTML.style.display = "block";
      for (let i = 0; i < results.length; i++) {
        var text_data = "";
        // seperate city from string
        const rowdata = results[i].toString().split(",");
        var param = "'" + rowdata[0] + "'";
        text_data += '<li class="rlr-autocomplete__item rlr-js-autocomplete__item" onclick="setDestination(this, ' + param + ')"><div class="rlr-autocomplete__item-wrapper"><span class="rlr-svg-icon">';

        text_data +=
          '<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.363 2.60149C14.1044 1.35931 12.5008 0.513379 10.7551 0.170666C9.00943 -0.172046 7.19997 0.0038532 5.55555 0.676122C3.91113 1.34839 2.50562 2.48684 1.51674 3.9475C0.527864 5.40816 3.51041e-05 7.12544 0 8.88217C0 13.6816 4.59772 17.6733 7.06819 19.818C7.41139 20.1186 7.70789 20.3732 7.94448 20.5907C8.23132 20.8538 8.6084 21 8.99998 21C9.39157 21 9.76865 20.8538 10.0555 20.5907C10.2921 20.3732 10.5886 20.1156 10.9318 19.818C13.4022 17.6733 18 13.6816 18 8.88217C18.003 7.71519 17.7716 6.5592 17.3189 5.48112C16.8663 4.40304 16.2015 3.42428 15.363 2.60149ZM10.1073 18.891C9.75696 19.1916 9.45336 19.4582 9.20357 19.6927C9.14772 19.742 9.07542 19.7693 9.00049 19.7693C8.92556 19.7693 8.85326 19.742 8.79741 19.6927C8.54762 19.4622 8.24504 19.1996 7.89371 18.891C5.57149 16.8746 1.24894 13.1214 1.24894 8.87816C1.24894 6.84868 2.06578 4.90232 3.51976 3.46727C4.97375 2.03221 6.94577 1.226 9.00202 1.226C11.0583 1.226 13.0303 2.03221 14.4843 3.46727C15.9383 4.90232 16.7551 6.84868 16.7551 8.87816C16.752 13.1244 12.4295 16.8746 10.1073 18.891Z" fill="black"></path>';
        text_data +=
          '<path d="M9 5C8.20888 5 7.43552 5.2346 6.77772 5.67412C6.11992 6.11365 5.60723 6.73836 5.30448 7.46927C5.00173 8.20017 4.92252 9.00444 5.07686 9.78036C5.2312 10.5563 5.61216 11.269 6.17157 11.8284C6.73098 12.3878 7.44372 12.7688 8.21964 12.9231C8.99556 13.0775 9.79983 12.9983 10.5307 12.6955C11.2616 12.3928 11.8864 11.8801 12.3259 11.2223C12.7654 10.5645 13 9.79112 13 9C12.9989 7.93947 12.5771 6.92268 11.8272 6.17277C11.0773 5.42286 10.0605 5.00108 9 5ZM9 11.7424C8.4576 11.7424 7.92737 11.5816 7.47638 11.2803C7.02539 10.9789 6.67388 10.5506 6.46631 10.0495C6.25874 9.54837 6.20443 8.99696 6.31025 8.46497C6.41607 7.93299 6.67726 7.44433 7.0608 7.0608C7.44434 6.67726 7.93299 6.41607 8.46498 6.31025C8.99696 6.20443 9.54837 6.25874 10.0495 6.46631C10.5506 6.67388 10.9789 7.02538 11.2803 7.47638C11.5816 7.92737 11.7424 8.45759 11.7424 9C11.7416 9.72709 11.4524 10.4242 10.9383 10.9383C10.4242 11.4524 9.72709 11.7416 9 11.7424Z" fill="black"></path></svg>';

        text_data += ' </span><div class="rlr-autocomplete__text-wrapper">';
        text_data += '<span class="rlr-autocomplete__text">' + rowdata[0] + "</span>";
        text_data += '<span class="rlr-autocomplete__sub-text">' + results[i] + "</span>";
        text_data += "</div> </div></li>";
        resDestiHTML.innerHTML += text_data;
      }
    }
  };
});

// Destination List
function getDestiData(input) {
  const results = [];
  const location_list = [
    "Bhaktapur",
    "Lalitpur",
    "Kathmandu",
    "Birtanagar",
    "Bharatpur",
    "Birtamod",
    "Kanchanjunga",
    "London",
    "Paris",
    "Milan",
    "New York",
    "Dubai, United Arab Emirates",
    "London, United Kingdom",
    "Cancún, Mexico",
    "Tulum, Mexico",
    "Cabo San Lucas, Mexico",
    "Bali, Indonesia",
    "Crete, Greece",
    "Rhodes, Greece",
    "Santorini, Greece",
    "Rome, Italy",
    "Istanbul, Turkey",
    "Göreme, Turkey",
    "Paris, France",
    "Hurghada, Egypt",
    "Cairo, Egypt",
    "Mallorca, Spain",
    "Ibiza, Spain",
    "Dubrovnik, Croatia",
    "Natal, Brazil",
    "Arusha, Tanzania",
    "Las Vegas, Nevada, USA",
    "Oahu, Hawaii, USA",
    "Key West, Florida, USA",
    "Miami Beach, Florida, USA",
    "New York City, New York, USA",
    "New Orleans, Louisiana, USA",
    "Savannah, Georgia, USA",
    "Nashville, Tennessee, USA",
    "Sedona, Arizona, USA",
    "New Delhi, India",
    "Mumbai, Maharashtra, India",
    "Chennai, Bangalore, India",
    "Kashmir, India",
    "Kathmandu, Nepal",
    "Pokhara, Nepal",
    "Sagarmatha, Nepal"
  ];

  for (let i = 0; i < location_list.length; i++) {
    var main_string = location_list[i].toLowerCase();
    var substring = input.toLowerCase();
    if (main_string.indexOf(substring) !== -1) {
      results.push(location_list[i]);
    }
  }
  return results;
}

window.setDestination = function (event, location) {
  destinInputClasses[0].value = location;
  resDestiHTML.style.display = "none";
};

/* when click on destinInputClasses show all data from location_list */
/* execute this event only if the page has destinInputClasses */
if (destinInputClasses.length > 0) {
  destinInputClasses[0].addEventListener("click", function (event) {
    resDestiHTML.style.display = "block";
    resDestiHTML.innerHTML = "";
    var input = destinInputClasses[0].value;
    var results = getDestiData(input);
    if (results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        var text_data = "";
        // seperate city from string
        const rowdata = results[i].toString().split(",");
        var param = "'" + rowdata[0] + "'";
        text_data += '<li class="rlr-autocomplete__item rlr-js-autocomplete__item" onclick="setDestination(this, ' + param + ')"><div class="rlr-autocomplete__item-wrapper"><span class="rlr-svg-icon">';

        text_data +=
          '<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.363 2.60149C14.1044 1.35931 12.5008 0.513379 10.7551 0.170666C9.00943 -0.172046 7.19997 0.0038532 5.55555 0.676122C3.91113 1.34839 2.50562 2.48684 1.51674 3.9475C0.527864 5.40816 3.51041e-05 7.12544 0 8.88217C0 13.6816 4.59772 17.6733 7.06819 19.818C7.41139 20.1186 7.70789 20.3732 7.94448 20.5907C8.23132 20.8538 8.6084 21 8.99998 21C9.39157 21 9.76865 20.8538 10.0555 20.5907C10.2921 20.3732 10.5886 20.1156 10.9318 19.818C13.4022 17.6733 18 13.6816 18 8.88217C18.003 7.71519 17.7716 6.5592 17.3189 5.48112C16.8663 4.40304 16.2015 3.42428 15.363 2.60149ZM10.1073 18.891C9.75696 19.1916 9.45336 19.4582 9.20357 19.6927C9.14772 19.742 9.07542 19.7693 9.00049 19.7693C8.92556 19.7693 8.85326 19.742 8.79741 19.6927C8.54762 19.4622 8.24504 19.1996 7.89371 18.891C5.57149 16.8746 1.24894 13.1214 1.24894 8.87816C1.24894 6.84868 2.06578 4.90232 3.51976 3.46727C4.97375 2.03221 6.94577 1.226 9.00202 1.226C11.0583 1.226 13.0303 2.03221 14.4843 3.46727C15.9383 4.90232 16.7551 6.84868 16.7551 8.87816C16.752 13.1244 12.4295 16.8746 10.1073 18.891Z" fill="black"></path>';
        text_data +=
          '<path d="M9 5C8.20888 5 7.43552 5.2346 6.77772 5.67412C6.11992 6.11365 5.60723 6.73836 5.30448 7.46927C5.00173 8.20017 4.92252 9.00444 5.07686 9.78036C5.2312 10.5563 5.61216 11.269 6.17157 11.8284C6.73098 12.3878 7.44372 12.7688 8.21964 12.9231C8.99556 13.0775 9.79983 12.9983 10.5307 12.6955C11.2616 12.3928 11.8864 11.8801 12.3259 11.2223C12.7654 10.5645 13 9.79112 13 9C12.9989 7.93947 12.5771 6.92268 11.8272 6.17277C11.0773 5.42286 10.0605 5.00108 9 5ZM9 11.7424C8.4576 11.7424 7.92737 11.5816 7.47638 11.2803C7.02539 10.9789 6.67388 10.5506 6.46631 10.0495C6.25874 9.54837 6.20443 8.99696 6.31025 8.46497C6.41607 7.93299 6.67726 7.44433 7.0608 7.0608C7.44434 6.67726 7.93299 6.41607 8.46498 6.31025C8.99696 6.20443 9.54837 6.25874 10.0495 6.46631C10.5506 6.67388 10.9789 7.02538 11.2803 7.47638C11.5816 7.92737 11.7424 8.45759 11.7424 9C11.7416 9.72709 11.4524 10.4242 10.9383 10.9383C10.4242 11.4524 9.72709 11.7416 9 11.7424Z" fill="black"></path></svg>';

        text_data += ' </span><div class="rlr-autocomplete__text-wrapper">';
        text_data += '<span class="rlr-autocomplete__text">' + rowdata[0] + "</span>";
        text_data += '<span class="rlr-autocomplete__sub-text">' + results[i] + "</span>";
        text_data += "</div> </div></li>";
        resDestiHTML.innerHTML += text_data;
      }
    }
  });
}
