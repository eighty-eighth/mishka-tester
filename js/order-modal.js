var button = document.querySelector(".hit__order-button, .catalog-item__to-cart");
var order_modal = document.querySelector(".order-modal");
var overlay = document.querySelector(".page__overlay");

button.addEventListener("click", function(event) {
  event.preventDefault();
  order_modal.classList.add("order-modal--enable");
  overlay.classList.add("page__overlay--enable");
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (order_modal.classList.contains("order-modal--enable")) {
      order_modal.classList.remove("order-modal--enable");
      overlay.classList.remove("page__overlay--enable");
    }
  }
});
