export default class Repeater {
  constructor(config) {
    this.config = config;
    this.wrapper = '';
    this.cloneWrapper = '';
    this.cloneClassName = 'rlr-fieldrow__clone';
    this.init();
    this.wrapperHeight = 0;
    this.cloneCounter = 0;
  }

  init() {
    var self = this;
    var selector = document.querySelectorAll('.' + this.config.selector);

    selector &&
      selector.forEach((s) => {
        s.addEventListener('click', (e) => {
          self.wrapper = e.target.previousElementSibling;
          self.cloneCounter++;
          self.cloneWrapper = self.cloneElement(self.wrapper);

          self.insertAfter(self.wrapper, self.cloneWrapper);

          if (self.cloneWrapper.querySelector('.rlr-js-delete-repeater')) {
            self.cloneWrapper.querySelector('.rlr-js-delete-repeater').remove();
          }

          self.cloneWrapper.appendChild(self.deletbutton());
        });
      });
  }

  deletbutton() {
    var rlrBut = document.createElement('button');
    rlrBut.className =
      'btn rlr-button text-button rlr-button--product-form-repeater rlr-js-delete-repeater rlr-button--small rlr-button--rounded rlr-button__color--delete rlr-button--transparent';
    rlrBut.innerHTML = '- delete';

    rlrBut &&
      rlrBut.addEventListener('click', (e) => {
        let parentDom = e.target.parentNode;
        if (parentDom) {
          parentDom.remove();

          typeof window.deleteProductThemeCallback !== 'undefined' && window.deleteProductThemeCallback(e);
        }
      });
    return rlrBut;
  }

  cloneElement(selector) {
    let self = this;
    let cloneElem = selector.cloneNode(true);
    let inputs = cloneElem.querySelectorAll('input[type="checkbox"');
    let selects = cloneElem.querySelectorAll('select');
    let textinputs = cloneElem.querySelectorAll("input[type='text']");
    let textareas = cloneElem.querySelectorAll('textarea');
    let imageInputs = cloneElem.querySelectorAll("input[type='file'");
    let radioInputs = cloneElem.querySelectorAll('.rlr-radios');
    let numberInputs = cloneElem.querySelectorAll("input[type='number']");
    let dateInputs = cloneElem.querySelectorAll('input.flatpickr-input');

    let tooltips = cloneElem.querySelectorAll('.col-xl-2');
    if (tooltips !== null) {
      // tooltips.remove();
      tooltips.forEach((tt) => {
        tt.remove();
      });
    }

    selects.forEach((s) => {
      s.value = '';
    });

    inputs.forEach((i) => {
      if (i.parentNode.parentNode.parentNode) {
        i.parentNode.parentNode.parentNode.className = 'rlr_js_product_theme';
        i.parentNode.parentNode.parentNode.innerHTML = '';
      }
    });

    radioInputs.forEach((r) => {
      let t = r.querySelectorAll('.form-check');
      t.forEach((i) => {
        let input = i.getElementsByTagName('input')[0];
        let label = i.getElementsByTagName('label')[0];
        input.id = input.id.split('_')[0] + `_cloned-${self.cloneCounter}`;
        input.checked = false;
        input.name = input.name.split('_')[0] + `_cloned-${self.cloneCounter}`;
        label.setAttribute('for', input.id);
      });
    });

    textinputs.forEach((t) => {
      t.value = '';
      t.previousElementSibling &&
        t.previousElementSibling.getAttribute('for') == t.id &&
        t.previousElementSibling.setAttribute('for', t.id.split('_')[0] + `_cloned-${self.cloneCounter}`);
      t.id = t.id.split('_')[0] + `_cloned-${self.cloneCounter}`;
    });

    textareas.forEach((t) => {
      t.value = '';
      t.previousElementSibling.getAttribute('for') == t.id && t.previousElementSibling.setAttribute('for', t.id.split('_')[0] + `_cloned-${self.cloneCounter}`);
      t.id = t.id.split('_')[0] + `_cloned-${self.cloneCounter}`;
    });

    imageInputs.forEach((i) => {
      i.value = '';
    });

    numberInputs.forEach((n) => {
      n.value = '';
      if (n.parentNode.classList.contains('rlr-js-linked')) {
        n.parentNode.classList.add('rlr-js-input-groups__hide');
      }
    });

    dateInputs.forEach((d) => {
      d.value = '';

      //   new window.flatpickr(d.parentNode.parentNode, {
      //     mode: 'range',
      //     minDate: 'today',
      //     altInput: true,
      //     altFormat: 'F j, Y',
      //     dateFormat: 'Y-m-d',
      //     allowInput: true
      //   });
      //   if (d.parentNode.classList.contains('rlr-js-linked')) {
      //     d.parentNode.parentNode.classList.add('rlr-js-input-groups__hide');
      //   }
      // });

      new window.flatpickr(d.parentNode.children[1], {
        mode: 'range',
        minDate: 'today',
        altInput: true,
        altFormat: 'F j, Y',
        dateFormat: 'Y-m-d',
        allowInput: true,
        showMonths: 2
      });
      d.parentNode.children[0].remove();
    });

    cloneElem.classList.add(this.cloneClassName + '--expand');

    return cloneElem;
  }

  insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
}
