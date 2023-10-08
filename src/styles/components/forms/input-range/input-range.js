'use strict';
(function () {
  var parent = document.querySelector('.rlr-range-slider');
  if (!parent) return;

  var rlrRangeSlide = parent.querySelectorAll('input[type=range]'),
    numberS = parent.querySelectorAll('input[type=number]');

  rlrRangeSlide.forEach(function (el) {
    el.oninput = function () {
      var slide1 = parseFloat(rlrRangeSlide[0].value),
        slide2 = parseFloat(rlrRangeSlide[1].value);

      if (slide1 > slide2) {
        [slide1, slide2] = [slide2, slide1];
      }

      numberS[0].value = slide1;
      numberS[1].value = slide2;
    };
  });

  numberS.forEach(function (el) {
    el.oninput = function () {
      var number1 = parseFloat(numberS[0].value),
        number2 = parseFloat(numberS[1].value);

      if (number1 > number2) {
        var tmp = number1;
        numberS[0].value = number2;
        numberS[1].value = tmp;
      }

      rlrRangeSlide[0].value = number1;
      rlrRangeSlide[1].value = number2;
    };
  });
})();
