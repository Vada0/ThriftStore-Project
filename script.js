const search = document.querySelector("#search");
const shopSearch = document.querySelector("#shop-search");
const sortSelect = document.querySelector("#sort-products");
const cards = [...document.querySelectorAll(".shop-products .card")];
const filterButtons = [...document.querySelectorAll(".filters button")];
const cart = document.querySelector("#cart");
const cartCount = document.querySelector("#cart-count");
let selectedFilter = "all";
let cartItems = 0;

function updateCart() {
  if (!cartCount) return;
  cartCount.textContent = cartItems;
  if (cart) {
    cart.setAttribute(
      "aria-label",
      `Shopping bag, ${cartItems} ${cartItems === 1 ? "item" : "items"}`,
    );
  }
}

function filterProducts() {
  if (cards.length === 0) return;
  const query = (shopSearch || search).value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesSearch = card.dataset.search.toLowerCase().includes(query);
    const matchesFilter =
      selectedFilter === "all" || card.dataset.category === selectedFilter;
    card.hidden = !(matchesSearch && matchesFilter);
    if (!card.hidden) visibleCount++;
  });

  document.querySelector("#total").textContent =
    `${visibleCount} ${visibleCount === 1 ? "piece" : "pieces"}`;
  document.querySelector("#empty").hidden = visibleCount > 0;
}

function sortProducts() {
  if (!sortSelect) return;

  const compare = {
    newest: (a, b) => Date.parse(b.dataset.added) - Date.parse(a.dataset.added),
    "price-low": (a, b) => Number(a.dataset.price) - Number(b.dataset.price),
    "price-high": (a, b) => Number(b.dataset.price) - Number(a.dataset.price),
    bestseller: (a, b) =>
      Number(a.dataset.bestseller) - Number(b.dataset.bestseller),
    alphabetical: (a, b) =>
      a
        .querySelector("h3")
        .textContent.localeCompare(b.querySelector("h3").textContent),
  };

  cards.sort(compare[sortSelect.value]);
  document.querySelector(".shop-products").append(...cards);
}

if (search) {
  search.addEventListener("input", () => {
    if (!cards.length && search.value.trim()) {
      window.location.href = "shop.html";
      return;
    }
    if (shopSearch) shopSearch.value = search.value;
    filterProducts();
  });
}

if (shopSearch) {
  shopSearch.addEventListener("input", () => {
    if (search) search.value = shopSearch.value;
    filterProducts();
  });
}

if (sortSelect) {
  sortSelect.addEventListener("change", sortProducts);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedFilter = button.dataset.filter;
    filterButtons.forEach((item) =>
      item.classList.toggle("selected", item === button),
    );
    filterProducts();
  });
});

document.querySelectorAll(".add").forEach((button) => {
  button.addEventListener("click", () => {
    cartItems++;
    updateCart();
  });
});

const authForm = document.querySelector("#auth-form");
if (authForm) {
  authForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!authForm.reportValidity()) return;
    authForm.querySelector(".auth-result").hidden = false;
  });
}

document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const password = document.getElementById(
      button.getAttribute("aria-controls"),
    );
    const isVisible = password.type === "text";
    password.type = isVisible ? "password" : "text";
    button.textContent = isVisible ? "Show" : "Hide";
    button.setAttribute("aria-pressed", String(!isVisible));
  });
});

sortProducts();
updateCart();
filterProducts();
