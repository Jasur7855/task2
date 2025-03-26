import { orderData } from "./store/orderData.js";

// Elements
const offerCheck = document.querySelector(".custom-checkbox input");
const offerModal = document.querySelector(".offerCheckboxModalWrapper");
const cardInfoBtns = document.querySelector(".infoBtns");
const addToCart = document.getElementById("addToCart");
const productPopUp = document.querySelector(".productPopUp");
const productPopUpTitle = document.querySelector(".productPopUp div h4");
const orderBtns = document.querySelector(".orderStatusButtons");
const orderCards = document.querySelector(".orderCards");
const isDefaultAddressSelected = document.querySelector(
  ".selectWrapper .custom-checkbox"
);
const deliverAddress = document.getElementById("deliveryAdressWrapper");
const deliveryPopUpWrapper = document.querySelector(".deliveryPopUp");

// Buttons
const confirmProductBtn = document.querySelector(".productPopUp button");
const offerBtn = document.getElementById("offerBtn");
const placingBtn = document.getElementById("placingLocationBtn");
const addDeliveryAddressBtn = document.querySelector(".selectWrapper button");
const deliveryPopUpBtn = document.querySelector("deliveryPopUp div button");

// Offer status check
const offerStatus = localStorage.getItem("hidden") === "true";
if (offerStatus && offerModal) {
  offerModal.classList.add("hidden");
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  const eventListeners = [
    { element: offerCheck, event: "input", handler: toggleOffer },
    { element: offerBtn, event: "click", handler: closeOffer },
    { element: cardInfoBtns, event: "click", handler: a },
    { element: addToCart, event: "click", handler: addCart },
    { element: confirmProductBtn, event: "click", handler: confirmCart },
    { element: orderBtns, event: "click", handler: orderBtnActive },
    { element: placingBtn, event: "click", handler: deliveryAddressForm },
    {
      element: isDefaultAddressSelected,
      event: "input",
      handler: deliveryAddressChecked,
    },
    {
      element: addDeliveryAddressBtn,
      event: "click",
      handler: addDeliveryAddress,
    },
    { element: deliveryPopUpBtn, event: "click", handler: closeDeliveryPopUp },
  ];

  eventListeners.forEach(({ element, event, handler }) => {
    if (element) {
      element.addEventListener(event, handler);
    } else {
      console.warn(`Элемент не найден: ${event}`);
    }
  });

  if (offerCheck && offerBtn) {
    toggleOffer(); // Устанавливаем начальное состояние кнопки
  }
});

// Toggle offer
function toggleOffer() {
  if (!offerBtn || !offerCheck) return;
  offerBtn.disabled = !offerCheck.checked;
  offerBtn.classList.toggle("active", offerCheck.checked);
}

// Close offer modal
function closeOffer() {
  if (!offerModal) return;
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
  if (!addToCart || !productPopUpTitle) return;

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
  if (!addToCart) return;

  const isInCart = addToCart.innerHTML === "В корзину";
  updateCartButton(isInCart);
}

// Render order cards
function renderOrderCards(array) {
  if (!orderCards) {
    console.error("Элемент .orderCards не найден");
    return;
  }
  if (!Array.isArray(array)) {
    console.error("Переданный аргумент не массив:", array);
    return;
  }

  orderCards.innerHTML = array
    .map(
      (elem, index) => `
    <a href="orderDetails.html?id=${index}" class="card">
      <img class="orderImg" src="${elem.img}" alt="" />
      <div class="orderDescription">
        <h3 class="orderDate">Заказ №1245 <span>03.08.2024 г.</span></h3>
        <h3 class="orderStatus"><span class="${elem.status}">${elem.orderStatus}</span> I 3 товара</h3>
        <h3 class="deliveryMethod">${elem.deliveryMethod}</h3>
        <h3 class="orderPrice blue">${elem.orderPrice} сум</h3>
      </div>
      <img class="orderArr" src="./img/svg/arrBlueRight.svg">
    </a>`
    )
    .join("");
}

// Initialize order cards
if (orderCards && Array.isArray(orderData)) {
  renderOrderCards(orderData);
}

// Order button activation
function orderBtnActive(event) {
  const target = event.target;
  const statusBtns = document.querySelectorAll(".status-btn");

  statusBtns.forEach((btn) => btn.classList.remove("active"));

  if (!Array.isArray(orderData)) {
    console.error("orderData не является массивом:", orderData);
    return;
  }

  target.classList.add("active");

  switch (target.innerHTML) {
    case "Новые":
      return renderOrderCards(orderData.filter((elem) => elem.status == "new"));
    case "В процессе":
      return renderOrderCards(
        orderData.filter((elem) => elem.status == "accepted")
      );
    case "Готовые":
      return renderOrderCards(
        orderData.filter((elem) => elem.status == "completed")
      );
    default:
      renderOrderCards(orderData);
  }
}
// Delivery Address Modal
function deliveryAddressForm() {
  const addressWrapper = document.querySelector(".deliverAddressWrapper");
  if (addressWrapper) {
    addressWrapper.classList.add("active");
  }
}
// Checkbox event
function deliveryAddressChecked() {
  const checkBox = document.querySelector(
    ".selectWrapper .custom-checkbox input"
  );
  const button = document.querySelector(".selectWrapper button");
  if (!checkBox || !button) return;

  button.disabled = !checkBox.checked;
}
const addressData =
  JSON.parse(localStorage.getItem("addAddressDelivery")) || [];
if (addressData.length > 0) {
  addressData.map((elem) => {
    const a = `<label
    ><input type="radio" name="deliveryAddress" required /><span
      class="custom-radio"
    ></span
    >${elem.city} г.${elem.region}, ${elem.address}</label
  >`;
    deliverAddress.innerHTML += a;
  });
}
function addDeliveryAddress() {
  const deliveryAddressForm = document.querySelector(".deliverAddressWrapper");
  const cityInput = document.getElementById("city");
  const regionInput = document.getElementById("region");
  const addressInput = document.getElementById("address");
  const deliverAddress = document.getElementById("deliveryAdressWrapper");

  const city = cityInput.value.trim();
  const region = regionInput.value.trim();
  const address = addressInput.value.trim();

  if (!city || !region || !address) {
    alert("Пожалуйста, заполните все поля адреса!");
    return;
  }

  deliveryAddressForm.classList.remove("active");

  // Получаем массив адресов из localStorage или создаём новый
  let addressData =
    JSON.parse(localStorage.getItem("addAddressDelivery")) || [];

  if (addressData.length >= 5) {
    addressData.shift();
  }

  addressData.push({ city, region, address });

  localStorage.setItem("addAddressDelivery", JSON.stringify(addressData));

  deliverAddress.innerHTML = "";

  addressData.forEach((elem) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="deliveryAddress" required />
      <span class="custom-radio"></span>
      ${elem.city}, г.${elem.region}, ${elem.address}
    `;
    deliverAddress.appendChild(label);
  });

  cityInput.value = "";
  regionInput.value = "";
  addressInput.value = "";
  deliveryPopUpWrapper.classList.add("active");
}
function closeDeliveryPopUp() {
  deliveryPopUpWrapper.classList.remove("active");
}
