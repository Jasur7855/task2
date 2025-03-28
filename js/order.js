import { orderData } from "../store/orderData.js";

const orderCards = document.querySelector(".orderCards");
const orderBtns = document.querySelector(".orderStatusButtons");

orderBtns.addEventListener("click", orderBtnActive);

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
          <h3 class="orderDate">Заказ №${elem.orderNumber} <span>03.08.2024 г.</span></h3>
          <h3 class="orderStatus"><span class="${elem.status}">${elem.orderStatus}</span> I 3 товара</h3>
          <h3 class="deliveryMethod">${elem.deliveryMethod}</h3>
          <h3 class="orderPrice blue">${elem.orderPrice} сум</h3>
        </div>
        <img class="orderArr" src="../img/svg/arrBlueRight.svg">
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
