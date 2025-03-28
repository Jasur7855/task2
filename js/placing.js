const deliveryPopUpBtn = document.querySelector(".deliveryPopUp div button");
const deliveryPopUpWrapper = document.querySelector(".deliveryPopUp");
const addDeliveryAddressBtn = document.querySelector(".selectWrapper button");

addDeliveryAddressBtn.addEventListener("click", addDeliveryAddress);

deliveryPopUpBtn.addEventListener("click", closeDeliveryPopUp);

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
