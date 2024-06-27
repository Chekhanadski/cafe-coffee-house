import data from "./products.json" with { type: "json" };
import { openPopup } from "./popup.js";

const tabs = document.querySelector(".tabs");
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));
const visibilityButton = document.querySelector(".button-visibility");
const refreshButton = document.querySelector(".refresh-button");
let currentTab = "coffee";
let currentCategoryProducts;
let allProductsLoaded = false;

function updateButtonVisibility() {
  if (window.innerWidth <= 768) {
    if (currentCategoryProducts.length > 4 && !allProductsLoaded) {
      visibilityButton.classList.add('show');
    } else {
      visibilityButton.classList.remove('show');
    }
  }
}

function updateProductVisibility() {
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.product-grid-container').forEach((item, index) => {
      if (index >= 4) {
        item.classList.add('hide');
      }
    });
  } else {
    document.querySelectorAll('.product-grid-container').forEach((item) => {
      item.classList.remove('hide');
    });
  }
}

export function initProducts() {
  currentCategoryProducts = data.filter(
    (product) => product.category === currentTab
  );

  const containerCards = document.querySelector(".container-cards");
  const gridContainer = document.createElement("div");
  gridContainer.className = "grid-container";

  currentCategoryProducts.forEach((product, index) => {
    const productElement = document.createElement("div");
    productElement.className = "product-grid-container fade";
    if (index >= 4 && window.innerWidth <= 768) {
      productElement.classList.add('hide');
    }

    productElement.innerHTML = `
      <div class="img-grid-container">
        <img class="img-grid" src="${product.link}" alt="${product.name}" />
      </div>
      <div class="description-product">
        <div class="container-content">
          <h3 class="heading-3-dark">${product.name}</h3>
          <div class="text">${product.description}</div>
        </div>
        <div class="product-price">$${product.price}</div>
      </div>
    `;

    productElement.addEventListener("click", () => openPopup(product));
    gridContainer.append(productElement);
  });

  containerCards.innerHTML = "";
  containerCards.appendChild(gridContainer);

  setTimeout(() => {
    document.querySelectorAll(".product-grid-container").forEach((item) => {
      item.classList.add("show");
    });
  }, 50);

  updateButtonVisibility();
  updateProductVisibility();
}

export function handleTabClick(e) {
  tabPanels.forEach((panel) => {
    panel.hidden = true;
  });

  tabButtons.forEach((tab) => {
    tab.setAttribute("aria-selected", false);
  });

  e.currentTarget.setAttribute("aria-selected", true);

  const { id } = e.currentTarget;
  currentTab = id;

  allProductsLoaded = false;
  initProducts();
}

refreshButton.addEventListener('click', () => {
  document.querySelectorAll('.product-grid-container.hide').forEach((item) => {
    item.classList.remove('hide');
  });
  allProductsLoaded = true;
  visibilityButton.classList.remove('show');
});

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateButtonVisibility();
    updateProductVisibility();
  }, 200);
});

window.addEventListener("load", initProducts);

tabButtons.forEach((button) => {
  button.addEventListener("click", handleTabClick);
});
