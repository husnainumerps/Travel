"use strict";
/*eslint-disable*/

/*  Autocomplete => Activities  */
var activityClasses = document.querySelectorAll(".activity_autocomplete");
const resultsHTML = document.getElementById("autocomplete-results");

Array.from(activityClasses).forEach((b) => {
  b.oninput = function () {
    let results = [];
    const userInput = b.value;
    resultsHTML.innerHTML = "";
    if (userInput.length > 0) {
      results = getActivityResults(userInput);
      resultsHTML.style.display = "block";
      for (let i = 0; i < results.length; i++) {
        resultsHTML.innerHTML += '<li class="rlr-autocomplete__item rlr-js-autocomplete__item">' + results[i] + "</li>";
      }
    }
  };
});

// Activity List
function getActivityResults(input) {
  const results = [];
  const activities_list = [
    "Outdoor Activity",
    "Extreme",
    "Bungee Jump",
    "Mountain Trekking",
    "Skydiving",
    "Water Rafting",
    "In the Air",
    "Helicopter Tours",
    "Hot Air Balloon Rides",
    "Paragliding",
    "Motor Sports",
    "4WD Tours",
    "ATV Tours",
    "Nature and Wildlife",
    "Bird Watching",
    "Safaris",
    "Zoos & Wildlife Parks",
    "On the Ground",
    "Camping",
    "Cycling",
    "Hiking",
    "Winter Sports",
    "Glacier Walks",
    "Snowmobiling",
    "Winter SportsArts and Culture",
    "Architecture",
    "Heritage & Architectural",
    "Modern Architecture",
    "Regional Architecture",
    "History and Culture",
    "Cultural Wonders",
    "Local Festivals",
    "Museums",
    "History Museums",
    "War and Holocaust",
    "Virtual Museum ToursClasses and Workshops",
    "Art Classes",
    "Pottery",
    "Oil Painting",
    "Landscape",
    "Cooking Lessons",
    "Jamie Oliver",
    "Indian SpicesFood and Drink",
    "Dining Experiences",
    "Dinner with Locals",
    "Food Tours",
    "Wine, Beer & Spirits",
    "Wine Tasting",
    "The Vineyard TripSight Seeing Tours",
    "City Tours",
    "Hop on Hop Off",
    "Guided sightseeingTickets and Passes",
    "Outdoor Parks",
    "Fun Parks",
    "Theme Parks",
    "National ParksConcerts and Events",
    "Musicals",
    "Orchestra Concerts",
    "Choral Music",
    "Circus",
    "Daredevil stunt acts",
    "Magic Shows",
    "Festivals",
    "Food Festivals",
    "Carnivals"
  ];

  for (let i = 0; i < activities_list.length; i++) {
    var main_string = activities_list[i].toLowerCase();
    var substring = input.toLowerCase();
    if (main_string.indexOf(substring) !== -1) {
      results.push(activities_list[i]);
    }
  }
  return results;
}

if (resultsHTML !== null) {
  resultsHTML.onclick = function (event) {
    const setValue = event.target.innerText;
    activityClasses[0].value = setValue;
    this.innerHTML = "";
  };
}

/* when click on activityClasses show all data from activities_list */
if (activityClasses !== null && activityClasses.length > 0) {
  activityClasses[0].onclick = function () {
    const results = [];
    const activities_list = [
      "Outdoor Activity",
      "Extreme",
      "Bungee Jump",
      "Mountain Trekking",
      "Skydiving",
      "Water Rafting",
      "In the Air",
      "Helicopter Tours",
      "Hot Air Balloon Rides",
      "Paragliding",
      "Motor Sports",
      "4WD Tours",
      "ATV Tours",
      "Nature and Wildlife",
      "Bird Watching",
      "Safaris",
      "Zoos & Wildlife Parks",
      "On the Ground",
      "Camping",
      "Cycling",
      "Hiking",
      "Winter Sports",
      "Glacier Walks",
      "Snowmobiling",
      "Winter SportsArts and Culture",
      "Architecture",
      "Heritage & Architectural",
      "Modern Architecture",
      "Regional Architecture",
      "History and Culture",
      "Cultural Wonders",
      "Local Festivals",
      "Museums",
      "History Museums",
      "War and Holocaust",
      "Virtual Museum ToursClasses and Workshops",
      "Art Classes",
      "Pottery",
      "Oil Painting",
      "Landscape",
      "Cooking Lessons",
      "Jamie Oliver",
      "Indian SpicesFood and Drink",
      "Dining Experiences",
      "Dinner with Locals",
      "Food Tours",
      "Wine, Beer & Spirits",
      "Wine Tasting",
      "The Vineyard TripSight Seeing Tours",
      "City Tours",
      "Hop on Hop Off",
      "Guided sightseeingTickets and Passes",
      "Outdoor Parks",
      "Fun Parks",
      "Theme Parks",
      "National ParksConcerts and Events",
      "Musicals",
      "Orchestra Concerts",
      "Choral Music",
      "Circus",
      "Daredevil stunt acts",
      "Magic Shows",
      "Festivals",
      "Food Festivals",
      "Carnivals"
    ];
    for (let i = 0; i < activities_list.length; i++) {
      results.push(activities_list[i]);
    }
    resultsHTML.innerHTML = "";
    for (let i = 0; i < results.length; i++) {
      resultsHTML.innerHTML += '<li class="rlr-autocomplete__item rlr-js-autocomplete__item">' + results[i] + "</li>";
    }
  };
}
