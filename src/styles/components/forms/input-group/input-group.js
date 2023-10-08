let addBtn = document.querySelector("#increment");
let subBtn = document.querySelector("#decrement");
let el = document.querySelector(".rlr-js-input-counter");

if (el) {
  let num = 0;
  subBtn.disabled = true;

  let increment = () => {
    subBtn.disabled = false;
    num += 1;
    el.innerHTML = num;
  };

  let decrement = () => {
    num -= 1;
    if (num < 0) {
      num = 0;
      alert("Decrement button has been disabled.");
      subBtn.disabled = true;
    } else {
      el.innerHTML = num;
    }
  };
  addBtn.addEventListener("click", increment);
  subBtn.addEventListener("click", decrement);
}
