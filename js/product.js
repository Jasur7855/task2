// Elements
const addToCart = document.getElementById("addToCart");
const productPopUp = document.querySelector(".productPopUp");
const productPopUpTitle = document.querySelector(".productPopUp div h4");

// Buttons
const confirmProductBtn = document.querySelector(".productPopUp button");

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  if (addToCart) {
    addToCart.addEventListener("click", addCart);
  }
  if (confirmProductBtn) {
    confirmProductBtn.addEventListener("click", confirmCart);
  }
});

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
