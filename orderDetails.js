import { orderData } from "./store/orderData.js";

// Элементы
const headerTitle = document.querySelector(".header-top h2");
const mainOrderDetail = document.querySelector(".mainOrderDetail");
const btnsContainer = document.querySelector(".btns"); // Добавил проверку перед изменением

// Получаем id из URL и приводим к числу
const urlParams = new URLSearchParams(window.location.search);
const orderIndx = Number(urlParams.get("id"));

// Находим заказ
const orderDetailCard = orderData[orderIndx];

if (!orderDetailCard) {
  console.error(" Заказ с таким ID не найден:", orderIndx);
} else {
  if (headerTitle) {
    headerTitle.textContent = `Заказ №${orderDetailCard.orderNumber}`;
  }

  const imgSrc =
    orderDetailCard.status === "new" || orderDetailCard.status === "cancel"
      ? "./img/svg/orderInfo.svg"
      : "./img/svg/orderSuccses.svg";

  renderOrderDetailCard(orderDetailCard, imgSrc);

  // Добавляем кнопку "Отменить заказ" только если блок `.btns` существует
  if (
    btnsContainer &&
    (orderDetailCard.status === "new" || orderDetailCard.status === "cancel")
  ) {
    btnsContainer.innerHTML = `<button>Отменить заказ</button>`;
  }
}

function renderOrderDetailCard(card, imgSrc) {
  const statusImg = document.getElementById("statusIMG");
  const orderNumber = document.getElementById("orderNumber");
  const deliveryType = document.getElementById("deliveryType");

  if (statusImg) statusImg.src = imgSrc;
  if (orderNumber) orderNumber.textContent = card.orderNumber;
  if (deliveryType) deliveryType.textContent = card.deliveryMethod;
}
