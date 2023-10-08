import tippy from "tippy.js";
("use strict");

// Product Detail - Booking Form

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

var popoverTriggerBooking = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover-booking"]'));
popoverTriggerBooking.map(function (popoverTriggerEl) {
  const popoverId = popoverTriggerEl.getAttribute("data-content-id");
  const popoverButtonId = popoverTriggerEl.getAttribute("id");
  if (popoverId) {
    const contentEl = document.getElementById(popoverId);
    tippy("#" + popoverButtonId, {
      theme: "rlr-booking-tippy",
      trigger: "click",
      allowHTML: true,
      interactive: true,
      content: contentEl.innerHTML,
      maxWidth: 375,
      animation: "scale",
      onShow: function (instance) {
        contentEl.innerHTML = "";
        var closeButton = instance.popper.getElementsByClassName("rlr-js-booking-close");
        let myForm = instance.popper.querySelectorAll('[data-name="booking-form"]');
        closeButton[0].addEventListener("click", () => {
          let inputs = myForm[0].getElementsByTagName("input");

          let data = [];
          Array.from(inputs).forEach((i) => {
            if (i.getAttribute("type") == "checkbox" && !i.checked) {
              return false;
            } else {
              if (i.value) {
                if (i.getAttribute("data-name") && popoverButtonId == "rlr-js-booking-travellers-button") {
                  data.push({ key: i.getAttribute("data-name"), value: i.value });
                } else {
                  data.push(i.value);
                }
              }
            }
          });

          if (popoverButtonId == "rlr-js-booking-travellers-button") {
            let str = "";
            str = data
              .map(function (elem) {
                return elem.value + " " + elem.key;
              })
              .join(", ");
            let total = data.reduce(function (a, b) {
              return a + b.value;
            }, 0);

            document.getElementById(popoverButtonId).getElementsByClassName("rlr-js-counter")[0].textContent = total;

            document.getElementById(popoverButtonId).getElementsByTagName("input")[0].value = truncateString(str, 20);
          } else {
            document.getElementById(popoverButtonId).getElementsByTagName("input")[0].value = data.join(", ");
          }

          instance.hide();
        });
      },
      onHide: function (instance) {
        contentEl.append(instance.popper);
        let myForm = instance.popper.querySelectorAll('[data-name="booking-form"]');
        let inputs = myForm[0].getElementsByTagName("input");

        let data = [];
        Array.from(inputs).forEach((i) => {
          if (i.getAttribute("type") == "checkbox" && !i.checked) {
            return false;
          } else {
            if (i.value) {
              if (i.getAttribute("data-name")) {
                data.push({ key: i.getAttribute("data-name"), value: parseInt(i.value) });
              } else {
                data.push(i.value);
              }
            }
          }
        });

        if (popoverButtonId == "rlr-js-booking-travellers-button") {
          let str = "";
          str = data
            .map(function (elem) {
              return elem.value + " " + elem.key;
            })
            .join(", ");
          let total = data.reduce(function (a, b) {
            return a + b.value;
          }, 0);

          document.getElementById(popoverButtonId).getElementsByClassName("rlr-js-counter")[0].textContent = total;

          document.getElementById(popoverButtonId).getElementsByTagName("input")[0].value = truncateString(str, 20);
        } else {
          document.getElementById(popoverButtonId).getElementsByTagName("input")[0].value = data.join(", ");
        }
      }
    });
  }
});
