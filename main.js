// Elements
const offerCheck = document.querySelector(".custom-checkbox input");
const offerBtn = document.getElementById("offerBtn");
const offerModal = document.querySelector(".offerCheckboxModalWrapper");
const cardInfoBtns = document.querySelector(".infoBtns");

const offerStatus = localStorage.getItem("hidden") === "true";
if (offerStatus && offerModal) {
  offerModal.classList.add("hidden");
}

if (offerCheck && offerBtn && offerModal) {
  offerCheck.addEventListener("input", toggleOffer);
  offerBtn.addEventListener("click", closeOffer);

  function toggleOffer() {
    offerBtn.disabled = !offerCheck.checked;
    offerBtn.classList.toggle("active", offerCheck.checked);
  }

  function closeOffer() {
    offerModal.classList.add("hidden");
    localStorage.setItem("hidden", "true");
  }
}
if (cardInfoBtns) {
  cardInfoBtns.addEventListener("click", a);
}

function a(event) {
  const target = event.target;

  // Добавляем класс 'active' к нажатой кнопке
  target.classList.add("active");
  const charactText = document.querySelector(".characterText");
  const desctext = document.querySelector(".descriptionText");

  if (target.classList.contains("descBtn")) {
    const charactBtn = document.querySelector(".charactBtn");
    if (charactBtn) {
      charactBtn.classList.remove("active");
    }
    if (charactText && desctext) {
      charactText.style.display = "none";
      desctext.style.display = "block";
    }
  } else if (target.classList.contains("charactBtn")) {
    const descBtn = document.querySelector(".descBtn");
    if (descBtn) {
      descBtn.classList.remove("active");
    }
    if (charactText && desctext) {
      desctext.style.display = "none";
      charactText.style.display = "block";
    }
  }
}
