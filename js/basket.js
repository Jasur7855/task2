const basketCards = document.querySelector(".basketCardWrapper");
function renderAddBasketCards() {
  const data = JSON.parse(localStorage.getItem("basket")) || [];

  if (data.length > 0) {
    basketCards.innerHTML = ""; // Очищаем перед добавлением новых карточек
    data.forEach((elem) => {
      basketCards.innerHTML += `<div class="basketCard">
          <img src="${elem.img}" alt="" id="basketProductImg" />
          <div class="basketDesc">
            <h4>${elem.title}</h4>
            <div class="basketDescPrice">
              <div class="countBtns">
                <button class="basketPlus" data-id="${elem.id}"></button>
                <span class="count">1</span>
                <button class="basketMinus" data-id="${elem.id}"></button>
              </div>
              <div class="price">${elem.price} сум</div>
            </div>
          </div>
          <div class="basketProductDelete" data-id="${elem.id}">
            <img src="../img/svg/delete.svg" alt="" />
          </div>
        </div>`;
    });
  } else {
    document.querySelector(
      ".basketMain"
    ).innerHTML = `<div class="basketEmptyWrapper">
        <img src="../img/svg/noOredderImg.svg" alt="" />
        <h5>В корзине пока ничего нет</h5>
        <p>
          Нажмите на странице товара кнопку <br />“В корзину” и товары появятся
          здесь
        </p>
        <p>
          Далее вы сможете выбрать способ доставки <br />
          и оплатить заказ
        </p>
      </div>`;
  }
}
renderAddBasketCards();
