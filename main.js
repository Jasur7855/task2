import { orderData } from "./store/orderData.js";
// Elements
const offerCheck = document.querySelector(".custom-checkbox input");
const offerBtn = document.getElementById("offerBtn");
const offerModal = document.querySelector(".offerCheckboxModalWrapper");
const cardInfoBtns = document.querySelector(".infoBtns");
const addToCart = document.getElementById("addToCart");
const confirmProductBtn = document.querySelector(".productPopUp button");
const productPopUp = document.querySelector(".productPopUp");
const productPopUpTitle = document.querySelector(".productPopUp div h4");
const orderBtns = document.querySelector(".orderStatusButtons");
// Offer status check
const offerStatus = localStorage.getItem("hidden") === "true";
if (offerStatus && offerModal) {
  offerModal.classList.add("hidden");
}

// Event listeners
const eventListeners = [
  { element: offerCheck, event: "input", handler: toggleOffer },
  { element: offerBtn, event: "click", handler: closeOffer },
  { element: cardInfoBtns, event: "click", handler: a },
  { element: addToCart, event: "click", handler: addCart },
  { element: confirmProductBtn, event: "click", handler: confirmCart },
  { element: orderBtns, event: "click", handler: orderBtnActive },
];

// Добавляем события, если элемент существует
document.addEventListener("DOMContentLoaded", () => {
  eventListeners.forEach(({ element, event, handler }) => {
    if (element) {
      element.addEventListener(event, handler);
    }
  });
});

// Toggle offer
function toggleOffer() {
  offerBtn.disabled = !offerCheck.checked;
  offerBtn.classList.toggle("active", offerCheck.checked);
}

// Close offer modal
function closeOffer() {
  offerModal.classList.add("hidden");
  localStorage.setItem("hidden", "true");
}

// Handle button click (desc/charact)
function a(event) {
  const target = event.target;

  target.classList.add("active");

  const charactText = document.querySelector(".characterText");
  const desctext = document.querySelector(".descriptionText");

  const isDescBtn = target.classList.contains("descBtn");
  const targetBtn = document.querySelector(
    isDescBtn ? ".charactBtn" : ".descBtn"
  );

  if (targetBtn) {
    targetBtn.classList.remove("active");
  }

  if (charactText && desctext) {
    charactText.style.display = isDescBtn ? "none" : "block";
    desctext.style.display = isDescBtn ? "block" : "none";
  }
}

// Show product pop-up
function addCart() {
  if (productPopUp) {
    productPopUp.style.display = "flex";
  }
}

// Update cart button
function updateCartButton(isInCart) {
  addToCart.innerHTML = isInCart ? "Убрать из корзины" : "В корзину";
  productPopUpTitle.innerHTML = isInCart
    ? "Товар удален из корзины"
    : "Товар добавлен в корзину";
  addToCart.style.backgroundColor = isInCart ? "red" : "#0077ff";
}

// Confirm cart
function confirmCart() {
  if (productPopUp) {
    productPopUp.style.display = "none";
  }
  const isInCart = addToCart.innerHTML === "В корзину";
  updateCartButton(isInCart);
}

function orderBtnActive(event) {
  const target = event.target;
  const orderCards = document.querySelector(".orderCards");
  const statusBtns = document.querySelectorAll(".status-btn"); // Используем querySelectorAll

  // Убираем класс 'active' у всех кнопок
  statusBtns.forEach((btn) => btn.classList.remove("active"));

  console.log("Клик по кнопке:", target);
  console.log("orderData:", orderData);

  // Проверяем, существует ли orderData и является ли он массивом
  if (!Array.isArray(orderData)) {
    console.error("❌ orderData не является массивом:", orderData);
    return;
  }

  target.classList.add("active");
}

function orderFilter(btnText) {
  if (target.textContent.trim() === btnText) {
    const data = orderData.filter((elem) => elem.orderStatus === btnText);
    if (orderCards) {
      orderCards.innerHTML = data
        .map(
          (order) =>
            `<div class="orderCard">${order.id} - ${order.orderStatus}</div>`
        )
        .join("");
    }
  }
}
