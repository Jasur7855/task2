const offerStatus = localStorage.getItem("hidden") === "true";
const offerModal = document.querySelector(".offerCheckboxModalWrapper");
const offerCheck = document.querySelector(".custom-checkbox input");
const goodsCards = document.querySelectorAll(".goodsCards");
const offerBtn = document.getElementById("offerBtn");

offerBtn.addEventListener("click", closeOffer);
if (offerStatus && offerModal) {
  offerModal.classList.add("hidden");
}
offerCheck.addEventListener("input", toggleOffer);
if (offerCheck && offerBtn) {
  toggleOffer();
}
function toggleOffer() {
  if (!offerBtn || !offerCheck) return;
  offerBtn.disabled = !offerCheck.checked;
  offerBtn.classList.toggle("active", offerCheck.checked);
}
function closeOffer() {
  if (!offerModal) return;
  offerModal.classList.add("hidden");
  localStorage.setItem("hidden", "true");
}

[...goodsCards].forEach((elem) => {
  addGoodsCard(elem);
});
async function addGoodsCard(elem) {
  try {
    const response = await fetch("./store/product.json");
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных!");
    }
    const data = await response.json();
    data.forEach((e) => {
      elem.innerHTML += `<a href="../pages/productCard.html" class="card">
        <div>
        <div class="badge ${e.statusClass}">${e.statusText}</div>
        <img src=${e.img} alt="" />
        </div>
        <div>
        <h4>${e.title}</h4>
        <div class="price">от ${e.price} сум</div>
        <div class="cardBtns">
          <button class="addtoBasketBtn" data-id ="${e.id}">В корзину</button>
          <button>Купить</button>
        </div>
        </div>
      </a>`;
      addClickListeners();
    });
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
}
function addClickListeners() {
  const addToBasketBtn = document.querySelectorAll(".addtoBasketBtn");
  addToBasketBtn.forEach((elem) => {
    elem.addEventListener("click", addToBasket);
  });
}
function addToBasket(event) {
  const target = event.target;
  event.preventDefault();
  let basketStore = JSON.parse(localStorage.getItem("basket")) || [];

  const productId = target.dataset.id;

  const productIndex = basketStore.findIndex((item) => item.id === productId);

  if (target.innerHTML === "В корзину") {
    if (productIndex === -1) {
      const card = target.closest(".card");
      const product = {
        id: productId,
        title: card.querySelector("h4").innerText,
        price: card.querySelector(".price").innerText.replace("от ", ""),
        img: card.querySelector("img").src,
      };

      basketStore.push(product);
      localStorage.setItem("basket", JSON.stringify(basketStore));
    }

    target.innerHTML = "Убрать";
    target.style.backgroundColor = "red";
  } else {
    // Если товар уже в корзине, удаляем его
    if (productIndex !== -1) {
      basketStore.splice(productIndex, 1);
      localStorage.setItem("basket", JSON.stringify(basketStore));
    }

    target.innerHTML = "В корзину";
    target.style.backgroundColor = "#0077ff";
  }
}
