const { default: Splide } = require("@splidejs/splide");

(function () {
  "use strict";
  /**
   * get dropregion DOM
   */
  var dropRegion = document.getElementsByClassName("js-rlr-drop-region");

  /**
   * function to prevent from external events
   * @param {Event} e
   */
  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * @params {File[]} files Array of files to add to the FileList
   * @return {FileList}
   */
  function FileListItems(files) {
    var b = new ClipboardEvent("").clipboardData || new DataTransfer();
    for (var i = 0, len = files.length; i < len; i++) b.items.add(files[i]);
    return b.files;
  }

  /**
   * callback function to handle drop event
   * @param {Event} e
   */
  function handleDrop(self, files, splide) {
    // input file update on drop image from source
    var input = self.getElementsByClassName("js-rlr-drop-input")[0];
    var obj1 = Object.values(files);
    var obj2 = Object.values(input.files);
    var obj = [...obj1, ...obj2];

    input.files = new FileListItems(obj);

    var sliderRegion = document.getElementsByClassName("splide");
    //sliderRegion.length && handleFiles(files, splide);
    if (sliderRegion.length) {
      return handleFiles(files, splide);
    }
  }

  /**
   * callback function to handle file after handledrop event
   * @param {FILE} files
   * @param {String} splide
   */

  function handleFiles(files, splide) {
    var validImageCount = [];
    for (var i = 0, len = files.length; i < len; i++) {
      if (validateImage(files[i])) {
        previewAnduploadImage(files[i], splide);
        validImageCount.push(files[i]);
      }
    }
    return validImageCount;
  }

  /**
   * callback function to write action button templates
   * @returns templates for action button i.e meatball
   */
  function actionButton() {
    var actionbutton = `<div class="rlr-view-region__action-button rlr-view-region__action-button--js-hide">
            <button type="button" class="btn rlr-button rlr-action-button__custom js-caption-view-region">
                <svg class="rlr-action-button__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 13.906v-3.718a.42.42 0 0 0-.84 0v3.718a1.26 1.26 0 0 1-1.262 1.256H2.102a1.26 1.26 0 0 1-1.261-1.256V2.995a1.26 1.26 0 0 1 1.261-1.256h3.733a.42.42 0 1 0 0-.838H2.102A2.1 2.1 0 0 0 0 2.995v10.911A2.1 2.1 0 0 0 2.102 16h11.796A2.1 2.1 0 0 0 16 13.906z" fill="#28B0A6" />
                    <path d="M12.705 1.418 6.576 7.546l1.977 1.977 6.128-6.129-1.976-1.976zM5.634 10.591l2.028-.624-1.466-1.629-.562 2.254zM15.695.793l-.488-.488A1.033 1.033 0 0 0 14.472 0c-.278 0-.539.108-.735.305l-.441.44 1.958 1.96.441-.442c.197-.196.305-.457.305-.735 0-.278-.108-.539-.305-.735z" fill="#28B0A6" />
                </svg>Caption
            </button> <button type="button" class="btn rlr-button rlr-action-button__custom js-delete-view-region">
                <svg class="rlr-action-button__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.667 12.667v-8A.691.691 0 0 0 10.001 4a.691.691 0 0 0-.667.667v8c0 .348.314.666.667.666a.691.691 0 0 0 .666-.666zm-3.333 0v-8A.691.691 0 0 0 6.667 4a.691.691 0 0 0-.666.667v8c0 .348.314.666.666.666a.691.691 0 0 0 .667-.666zm6-8.667a.691.691 0 0 0-.667.667V14c0 .255-.408.667-.666.667H4.667c-.259 0-.666-.412-.666-.667V4.667A.691.691 0 0 0 3.334 4a.691.691 0 0 0-.667.667V14c0 .95 1.038 2 2 2h7.334c.961 0 2-1.05 2-2V4.667A.691.691 0 0 0 13.334 4zm1.333-2h-2.666V.667A.691.691 0 0 0 11.334 0h-6a.691.691 0 0 0-.667.667V2H2.001a.691.691 0 0 0-.667.667c0 .347.314.666.667.666h12.666a.691.691 0 0 0 .667-.666.691.691 0 0 0-.667-.667zm-4 0H6.001v-.667h4.666V2z" fill="#28B0A6" />
                </svg>Delete
            </button>
        </div>`;
    return actionbutton;
  }

  /**
   * callback funciton to upload image and render
   * @param {Image} image
   * @param {String} splide
   */
  function previewAnduploadImage(image, splide) {
    // // read the image...
    var reader = new FileReader();

    reader.onload = function (e) {
      let src = e.target.result;
      e.preventDefault();
      splide.add(`<li class="splide__slide rlr-view-region__image-view"><img src="${src}"/>
                <div class="rlr-view-region__control">
                    <div class="rlr-view-region__captions">
                        <span class="js-caption-label isempty" onclick=""></span>
                    </div>
                    <div class="rlr-view-region__meatball js-rlr-meatball" onclick="handleclick(this);">
                        <span class="js-mball"></span>
                        <span class="js-mball"></span>
                        <span class="js-mball"></span>
                    </div>
                    ${actionButton()}
                </div>
            </li>`);
    };

    reader.readAsDataURL(image);
  }

  /**
   * Image validation callback
   * @param {Image} image
   * @returns
   */
  function validateImage(image) {
    // check the type
    var validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (validTypes.indexOf(image.type) === -1) {
      alert("Invalid File Type");
      return false;
    }

    // check the size
    var maxSizeInBytes = 10e6; // 10MB
    if (image.size > maxSizeInBytes) {
      alert("File too large");
      return false;
    }

    return true;
  }

  /**
   * hide action button callback
   * @param {String} selector
   */
  function hideActionButton(selector) {
    selector.classList.remove("rlr-view-region__action-button--js-show");
    selector.classList.add("rlr-view-region__action-button--js-hide");
  }

  /**
   * Show actionbutton callback
   * @param {String} selector
   */
  function showActionButton(selector) {
    selector.classList.remove("rlr-view-region__action-button--js-hide");
    selector.classList.add("rlr-view-region__action-button--js-show");
  }

  /**
   * Show/Hide Input field wrapper callback
   * @param {String} selector
   * @param {Boolean} show
   */
  function showhideInputWrapper(selector, show) {
    if (show) {
      selector.classList.remove("rlr-view-input--js-hide");
      selector.classList.add("rlr-view-input--js-show");
    } else {
      selector.classList.remove("rlr-view-input--js-show");
      selector.classList.add("rlr-view-input--js-hide");
    }
  }

  /**
   * callback to handle delete image card of slider
   * @param {DOM} d
   * @param {DOM} inputWrapper
   * @param {Splide} splide
   * @param {DOM} actionButton
   */
  function deleteImageCardHandler(d, inputWrapper, splide, actionButton) {
    var list = d.target.parentNode.parentNode.parentNode;
    if (list.classList.contains("splide__slide")) {
      list.remove();

      hideActionButton(actionButton);
      showhideInputWrapper(inputWrapper, false);

      if (inputWrapper.querySelector(".js-form-title")) {
        inputWrapper.querySelector(".js-form-title").remove();
      }
    }
    splide.refresh();
  }

  /**
   * add/edit callback for caption in image card on slider
   * @param {DOM} inputWrapper
   * @param {DOM} actionButton
   * @param {DOM} captionLabel
   */
  function captionImageCardHandler(inputWrapper, actionButton, captionLabel) {
    var input = document.createElement("input");
    input.type = "text";
    input.className = "rlr-view-input__form-control form-control js-form-title";
    input.placeholder = "Bungee jumping trip in Kathmandu";

    let inputSubmit = inputWrapper.getElementsByClassName("js-label-submit")[0];

    hideActionButton(actionButton);

    inputWrapper.getElementsByClassName("js-form-title").length && inputWrapper.getElementsByClassName("js-form-title")[0].remove();
    inputWrapper.appendChild(input);
    if (inputWrapper.classList.contains("rlr-view-input--js-hide")) {
      showhideInputWrapper(inputWrapper, true);
    }

    input.value = captionLabel.classList.contains("isempty") ? "" : captionLabel.textContent;
    input.focus();

    inputSubmit.addEventListener("click", () => {
      if (input.value) {
        captionLabel.classList.remove("isempty");
        captionLabel.classList.add("notempty");
      } else {
        captionLabel.classList.remove("notempty");
        captionLabel.classList.add("isempty");
      }
      captionLabel.textContent = input.value ? input.value : "";
      inputWrapper.classList.remove("rlr-view-input--js-show");
      inputWrapper.classList.add("rlr-view-input--js-hide");
    });

    input.addEventListener("keydown", function (evt) {
      if (evt.code === "Enter") {
        inputSubmit.click();
        preventDefault(evt);
      }
    });
  }

  if (dropRegion.length) {
    //loop on dropregion for multiple image uploader
    Array.from(dropRegion).forEach((d) => {
      //get dom for input for image upload
      let fakeInput = d.getElementsByClassName("js-rlr-drop-input")[0];
      fakeInput.multiple = true;

      //event listeners
      d.addEventListener("dragenter", preventDefault, false);
      d.addEventListener("dragleave", preventDefault, false);
      d.addEventListener("dragover", preventDefault, false);

      d.addEventListener("drop", preventDefault, false);

      //get dom for slider region
      let sliderSelector = d.nextElementSibling.getAttribute("id");

      //only execute if sliderregion is available

      if (document.getElementById(sliderSelector)) {
        //create instance of Splide plugins
        var splide = new Splide("#" + sliderSelector, {
          heightRatio: 0.2, //height ration i.e 0.2 for landscape
          pagination: false,
          perPage: 3, //number of slide on per page
          rewind: true,
          arrows: true,
          drag: "free",
          classes: {
            //custom class for arrows
            arrows: "splide__arrows",
            arrow: "splide__arrow",
            prev: "splide__arrow--prev",
            next: "splide__arrow--next"
          },
          gap: "0.5rem" //column gaps
        });

        //logic for visible region on selector
        var respondToVisibility = function (element, callback) {
          var options = {
            root: document.documentElement
          };

          var observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              callback(entry.intersectionRatio > 0);
            });
          }, options);

          observer.observe(element);
        };

        // splide.mount();

        respondToVisibility(document.getElementById(sliderSelector), (visible) => {
          if (visible) {
            // load slider
            splide.mount();
          }
        });

        fakeInput.addEventListener("change", function () {
          var files = fakeInput.files;
          var filesAddedCount = handleFiles(files, splide);
          filesAddedCount = filesAddedCount.length;
          typeof window.addImageBtn !== "undefined" && window.addImageBtn(filesAddedCount);
        });
        // on click drop region logic
        d.addEventListener("click", function () {
          fakeInput.click();
        });

        d.addEventListener(
          "drop",
          function (e) {
            var filesDroppedCount = handleDrop(this, e.dataTransfer.files, splide);
            filesDroppedCount = filesDroppedCount.length;
            typeof window.addImageBtn !== "undefined" && window.addImageBtn(filesDroppedCount);
          },
          false
        );

        //event listener on outside click
        document.addEventListener("click", (e) => {
          if (e.target.classList.contains("js-rlr-meatball")) return false;
          if (e.target.classList.contains("js-mball")) return false;
          var buttons = document.getElementsByClassName("rlr-view-region__action-button--js-show");
          if (buttons.length) {
            Array.from(buttons).forEach((el) => {
              // Do stuff here
              el.classList.remove("rlr-view-region__action-button--js-show");
              el.classList.add("rlr-view-region__action-button--js-hide");
            });
          }
        });

        window.handleclick = function (e) {
          e = e || window.event;
          var actionButton = e.nextElementSibling;
          var captionLabel = e.parentNode.getElementsByClassName("js-caption-label")[0];

          var actions = e.parentNode.parentNode.parentNode.parentNode.parentNode.nextElementSibling.getElementsByClassName("rlr-view-region__action-button--js-show");

          Array.from(actions).forEach((a) => {
            if (a !== actionButton && a.classList.contains("rlr-view-region__action-button--js-show")) {
              a.classList.remove("rlr-view-region__action-button--js-show");
              a.classList.add("rlr-view-region__action-button--js-hide");
            }
          });
          if (actionButton.classList.contains("rlr-view-region__action-button--js-hide")) {
            showActionButton(actionButton);
            let deleteProduct = actionButton.getElementsByClassName("js-delete-view-region")[0];
            let captionProduct = actionButton.getElementsByClassName("js-caption-view-region")[0];
            let inputWrapper = e.parentNode.parentNode.parentNode.parentNode.parentNode.nextElementSibling;
            deleteProduct.addEventListener("click", (d) => {
              deleteImageCardHandler(d, inputWrapper, splide, actionButton);
              typeof window.deleteImageBtn !== "undefined" && window.deleteImageBtn(d);
              return false;
            });

            captionProduct.addEventListener(
              "click",
              (evt) => {
                evt.preventDefault();
                captionImageCardHandler(inputWrapper, actionButton, captionLabel);
              },
              false
            );
          } else {
            hideActionButton(actionButton);
          }
        };
      }
    });
  }
})();
