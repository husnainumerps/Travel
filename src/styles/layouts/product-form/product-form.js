import Repeater from './product-form-repeater';
import Pristine from '../../../js/pristine';
import tippy from 'tippy.js';

(function () {
  'use strict';
  // import RrlRepeater from './product-form-repeater';
  new Repeater({ selector: 'js-repeater' });

  //validation and step form logic starts from here

  var rlrFieldset = document.getElementsByTagName('fieldset');

  var nextButton = document.querySelector('.jsNext');

  var prevButton = document.querySelector('.jsPrev');

  const RLR_PRODUCT_SHOW = 'rlr-product-form--show';
  const RLR_PRODUCT_HIDE = 'rlr-product-form--hide';
  const RLR_STEP_ICONNAME = 'rlr-step__icon';
  const RLR_STEP_TEXTNAME = 'rlr-step__text';
  const RLR_STEP_BULLETNAME = 'rlr-step__bullet';

  var isValid = true;

  // declaring the active fieldset & the total fieldset count
  var rlrCount = 0;
  if (rlrFieldset.length) {
    var fieldset = rlrFieldset[rlrCount];
    fieldset.className = RLR_PRODUCT_SHOW;

    var mainForm = document.querySelector('#jsForm');
    if (mainForm) {
      var pristine = new Pristine(mainForm);

      // A validator to check if the custom
      var titleinputs = mainForm.querySelector('input.js-form-title');

      var arr = [];
      let customValidation = function (inputs) {
        arr = [];
        pristine.addValidator(
          inputs,
          function (value) {
            // here `this` refers to the respective input element
            if (value.length && value.match(/^[A-Za-z0-9\d\-|&\s]+$/)) {
              arr.push(true);
              return true;
            } else {
              arr.push(false);
              return false;
            }
          },
          'Invalid Character',
          2,
          true
        ); // true to reset valid message
      };

      let checkBoolean = (arr) => arr.every((v) => v === true);

      customValidation(titleinputs);

      let rlrNextButton = function () {
        var selection = rlrFieldset[rlrCount];

        var pristine = new Pristine(selection);

        customValidation(titleinputs);

        isValid = pristine.validate();

        arr.push(isValid);

        isValid = checkBoolean(arr);

        if (isValid === true) {
          // goes to the next step
          prevButton.classList.contains('disabled') && prevButton.classList.remove('disabled');
          selection.classList.remove(RLR_PRODUCT_SHOW);
          selection.classList.add(RLR_PRODUCT_HIDE);
          rlrCount += 1;
          rlrFieldset[rlrCount].classList.remove(RLR_PRODUCT_HIDE);
          rlrFieldset[rlrCount].classList.add(RLR_PRODUCT_SHOW);
          if (rlrFieldset.length == rlrCount + 1) {
            nextButton.classList.add('disabled');
          }
          if (rlrFieldset[rlrCount].classList.contains('start')) {
            var dynamicIds = rlrFieldset[rlrCount].getAttribute('data-attr');
            var steps = document.querySelector('.' + dynamicIds + '.rlr-step');
            var bullets = steps.querySelector('.js-bullet');
            var titleText = steps.querySelector('.type-sub-title');
            var icon = steps.querySelector('.' + RLR_STEP_ICONNAME);
            icon.classList.remove(RLR_STEP_ICONNAME + '--inactive');
            icon.classList.add(RLR_STEP_ICONNAME + '--active');
            titleText.classList.remove(RLR_STEP_TEXTNAME + '--inactive');
            titleText.classList.add(RLR_STEP_TEXTNAME + '--active');
            bullets.classList.remove(RLR_STEP_BULLETNAME + '--inactive');
            bullets.classList.add(RLR_STEP_BULLETNAME + '--active');
          }
          typeof window.savingOnFormOnNext !== 'undefined' && window.savingOnFormOnNext(rlrCount);
        }
      };

      // goes one step back
      let rlrBackButton = function () {
        rlrFieldset[rlrCount].classList.remove(RLR_PRODUCT_SHOW);
        rlrFieldset[rlrCount].classList.add(RLR_PRODUCT_HIDE);
        rlrCount = rlrCount - 1;
        if (typeof rlrFieldset[rlrCount] !== 'undefined') {
          rlrFieldset[rlrCount].classList.remove(RLR_PRODUCT_HIDE);
          rlrFieldset[rlrCount].classList.add(RLR_PRODUCT_SHOW);
          nextButton.classList.remove('disabled');
          if (rlrCount == 0) {
            prevButton.classList.add('disabled');
          }
        }
        if (rlrFieldset[rlrCount].classList.contains('stop')) {
          var dynamicIds = rlrFieldset[rlrCount].getAttribute('data-attr');
          var steps = document.querySelector('.' + dynamicIds + '.rlr-step').nextElementSibling;
          var bullets = steps.querySelector('.js-bullet');
          var titleText = steps.querySelector('.type-sub-title');
          var icon = steps.querySelector('.' + RLR_STEP_ICONNAME);
          icon.classList.add(RLR_STEP_ICONNAME + '--inactive');
          icon.classList.remove(RLR_STEP_ICONNAME + '--active');
          titleText.classList.add(RLR_STEP_TEXTNAME + '--inactive');
          titleText.classList.remove(RLR_STEP_TEXTNAME + '--active');
          bullets.classList.add(RLR_STEP_BULLETNAME + '--inactive');
          bullets.classList.remove(RLR_STEP_BULLETNAME + '--active');
        }
      };

      //event listener for next button
      nextButton.addEventListener('click', function () {
        rlrNextButton();
      });

      //event listener for back button
      prevButton.addEventListener('click', rlrBackButton);
    }
  }
})();
var tooltip = document.getElementsByClassName('rlr-js-tooltip');
Array.from(tooltip).forEach((t) => {
  tippy(t, {
    content: "I'm a Tippy tooltip!"
  });
});
