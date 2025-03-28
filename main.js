// Elements
const cardInfoBtns = document.querySelector(".infoBtns");
const productPopUp = document.querySelector(".productPopUp");
const productPopUpTitle = document.querySelector(".productPopUp div h4");
const isDefaultAddressSelected = document.querySelector(
  ".selectWrapper .custom-checkbox"
);
const deliverAddress = document.getElementById("deliveryAdressWrapper");
// Buttons
const confirmProductBtn = document.querySelector(".productPopUp button");
const placingBtn = document.getElementById("placingLocationBtn");
// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  const eventListeners = [
    { element: cardInfoBtns, event: "click", handler: a },
    { element: placingBtn, event: "click", handler: deliveryAddressForm },
    {element: isDefaultAddressSelected,event: "input",handler: deliveryAddressChecked,},
  ];
  // AddEventListener
  eventListeners.forEach(({ element, event, handler }) => {
    if (element) {
      element.addEventListener(event, handler);
    } else {
      console.warn(`Элемент не найден: ${event}`);
    }
  });
});
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
if (deliverAddress) {
  if (addressData.length > 0) {
    addressData.forEach((elem) => {
      const a = `<label
        ><input type="radio" name="deliveryAddress" required /><span
          class="custom-radio"
        ></span
        >${elem.city} г.${elem.region}, ${elem.address}</label
      >`;
      deliverAddress.innerHTML += a;
    });
  }
} else {
  console.error("Элемент deliverAddress не найден!");
}
