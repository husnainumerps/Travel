"use strict";

/* if the page has rlr-header-search__button only then excute this function */
if (document.querySelector(".rlr-header-search__button")) {
  (function () {
    const el = document.querySelector(".rlr-header-search__button");

    el.onclick = function () {
      el.parentNode.classList.toggle("open");
    };
  })();
}

let rlrAutoCompleteItem = document.querySelectorAll(".rlr-js-autocomplete__item");

function rlrItemSearch() {
  let search_query = document.getElementById("rlrSearchBox").value;
  let rlrHeaderSearchContainer = document.querySelector(".rlr-header-search__results");

  for (var i = 0; i < rlrAutoCompleteItem.length; i++) {
    if (rlrAutoCompleteItem[i].textContent.toLowerCase().includes(search_query.toLowerCase())) {
      rlrAutoCompleteItem[i].classList.remove("is-hidden");
    } else {
      rlrAutoCompleteItem[i].classList.add("is-hidden");
    }
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest(".rlr-header-search__wrapper")) return;
    rlrHeaderSearchContainer.classList.add("is-hidden");
  });
}

let typingTimer;
let typeInterval = 50;
let searchInput = document.getElementById("rlrSearchBox");

if (document.querySelector(".rlr-header-search__button")) {
  searchInput.addEventListener("keyup", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(rlrItemSearch, typeInterval);
  });
}
