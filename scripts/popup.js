export const openPopup = (product) => {
  document.body.style.overflow = "hidden";
  const sizes = Object.entries(product.sizes);
  let prevSizePrice = 0;
  let sumPrice = Number(product.price);

  const createButton = (className, dataPrice, innerHTML) => {
    return `<button class="${className}" data-price=${dataPrice}>${innerHTML}</button>`;
  };
  
  const createSizeButtons = (sizes) => {
    return sizes.map((size, index) => {
      const className = index === 0 ? "sizes-button active" : "sizes-button";
      const innerHTML = `<div class="size">${size[0].toLocaleUpperCase()}</div>${size[1].size}`;
      return createButton(className, size[1]["add-price"], innerHTML);
    }).join("");
  };
  
  const createAdditivesButtons = (additives) => {
    return additives.map((additive, index) => {
      const innerHTML = `<div class="additive">${index + 1}</div>${additive.name}`;
      return createButton("additives-button", additive["add-price"], innerHTML);
    }).join("");
  };
  
  let popupContainer = document.createElement("div");
  popupContainer.className = "popup-container";
  popupContainer.innerHTML = `
    <div class="popup">
      <div class="popup-window">
        <img class="popup-img" src=${product.link} alt="image of product">
        <div class="popup-content">
          <h3 class="popup-title">${product.name}</h3>
          <p class="popup-description">${product.description}</p>
          <div>
            <span class="sizes-title">Size</span>
            <div class="sizes-buttons">
              ${createSizeButtons(sizes)}
            </div>
          </div>
          <div class="additives">
            <span class="additives-title">Additives</span>
            <div class="additives-buttons">
              ${createAdditivesButtons(product.additives)}
            </div>
          </div>
          <div class="popup-price">
            <span>Total:</span>
            <span class="popup-price-num">$${product.price}</span>
          </div>
          <div class="popup-info">
            <img class="popup-info-icon" src="../../assets/icons/info-empty.svg" alt="information icon">
            <span>The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</span>
          </div>
          <button class="popup-button">Close</button>
        </div>
      </div>
    </div>`;
  document.body.append(popupContainer);

  const sizesButtons = document.querySelectorAll(".sizes-button");

  sizesButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sizesButtons.forEach((elem) => elem.classList.remove("active"));
      button.classList.add("active");
      sumPrice += Number(button.dataset.price) - prevSizePrice;
      prevSizePrice = Number(button.dataset.price);
      document.querySelector(
        ".popup-price-num"
      ).textContent = `$${sumPrice.toFixed(2)}`;
    });
  });

  const additivesButtons = document.querySelectorAll(".additives-button");

  additivesButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      const nextPrice = Number(button.dataset.price);
      sumPrice += button.classList.contains("active") ? nextPrice : -nextPrice;
      document.querySelector(
        ".popup-price-num"
      ).textContent = `$${sumPrice.toFixed(2)}`;
    });
  });

  const closeButton = document.querySelector(".popup-button");
  closeButton.addEventListener("click", () => {
    document.body.style.overflow = "";
    popupContainer.remove();
  });
};

document.addEventListener("click", (event) => {
  const popupContainer = document.querySelector(".popup-container");
  if (event.target === popupContainer) {
    document.body.style.overflow = "";
    popupContainer.remove();
  }
});
