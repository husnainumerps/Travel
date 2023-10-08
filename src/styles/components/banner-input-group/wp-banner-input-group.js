var inputs = document.querySelectorAll('.rlr-banner-input-group__input');

Array.from(inputs).forEach((input) => {
  input.setAttribute('size', input.getAttribute('placeholder').length + 3);
});
