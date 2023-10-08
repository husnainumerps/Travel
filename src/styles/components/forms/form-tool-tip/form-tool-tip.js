import tippy from "tippy.js";
("use strict");
// Global config for all tooltip <button>
(function () {
  const productFormTooltip = document.getElementsByClassName("rlr-js-tool-tip");

  tippy(".rlr-js-tool-tip", {
    content: productFormTooltip.innerHTML,
    theme: "light",
    placement: "top-end",
    allowHTML: true
    // trigger: 'click'
  });
})();
