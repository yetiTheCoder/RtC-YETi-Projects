// script.js

const products = [
  {
    id: 1,
    model: "Forum Buckle",
    brand: "Adidas",
    price: 100,
    image: "./assets/adidas-forum_buckle-blue.png",
  },
  {
    id: 2,
    model: "Campus",
    brand: "Adidas",
    price: 120,
    image: "./assets/adidas_campus-green.png",
  },
  {
    id: 3,
    model: "Gazelle",
    brand: "Adidas",
    price: 100,
    image: "./assets/adidas-gazelle-pink.png",
  },
  {
    id: 4,
    model: "Handball Spezial",
    brand: "Adidas",
    price: 100,
    image: "./assets/adidas-handball_spezial-black_pink.png",
  },
  {
    id: 5,
    model: "Handball Spezial",
    brand: "Adidas",
    price: 100,
    image: "./assets/adidas-handball_spezial-grey_red.png",
  },
  {
    id: 6,
    model: "NB 9060",
    brand: "New Balance",
    price: 80,
    image: "./assets/newBalance-NB_9060-grey.png",
  },
  {
    id: 7,
    model: "NB 327",
    brand: "New Balance",
    price: 120,
    image: "./assets/newBalance-NB_327-white_green.png",
  },
  {
    id: 8,
    model: "NB 9060",
    brand: "New Balance",
    price: 100,
    image: "./assets/newBalance-NB_9060-brown_pink.png",
  },
  {
    id: 9,
    model: "NB 480",
    brand: "New Balance",
    price: 150,
    image: "./assets/newBalance-NB_480-white_red.png",
  },
  {
    id: 10,
    model: "Air Max 1",
    brand: "Nike",
    price: 120,
    image: "./assets/nike-air_max_1-white_green.png",
  },
  {
    id: 11,
    model: "Nike Revolution",
    brand: "Nike",
    price: 90,
    image: "./assets/nike-revolution-blue.png",
  },
  {
    id: 12,
    model: "Dunk Low",
    brand: "Nike",
    price: 100,
    image: "./assets/nike-dunk_low-green_white.png",
  },
  {
    id: 13,
    model: "Air Max SC",
    brand: "Nike",
    price: 150,
    image: "./assets/nike-air_max_sc-green.png",
  },
  {
    id: 14,
    model: "Air Force",
    brand: "Nike",
    price: 130,
    image: "./assets/nike-air_force-red_white.png",
  },
  {
    id: 15,
    model: "Full Force Low",
    brand: "Nike",
    price: 70,
    image: "./assets/nike-full_force_low-white_blue.png",
  },
  {
    id: 16,
    model: "Air Max SC",
    brand: "Nike",
    price: 160,
    image: "./assets/nike-air_max_sc-grey.png",
  },
];

function renderMainContent() {
  
  const mainContent = document.getElementById("main-content");
  const filterMenu = document.createElement("section");

  filterMenu.className = "filter-menu";
  filterMenu.innerHTML = `
        <div class="filters" style="display: none;">
            <div>
                <label for="brand"></label>
                <select class="filter-width button-like" id="brand">
                    <option value="all">Todo</option>
                    <option value="Adidas">Adidas</option>
                    <option value="New Balance">New Balance</option>
                    <option value="Nike">Nike</option>
                </select>
            </div>
            <div>
                <label for="price"></label>
                <input class="filter-width" type="range" id="price" min="0" max="250" value="250" oninput="updatePriceLabel(this.value)">
                <span id="price-label">250€</span> 
            </div>
            <button class="filter-width button-like" class="clear-filters" onclick="clearFilters()">Todo</button>
        </div>

        <div class="space-divider"></div>
        
        <div class="filter-icon">
          <input type="checkbox" id="down-up" onclick="toggleFilterMenu()">
          <label for="down-up" class="flipping-svg">
            <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="77" height="77" viewBox="0 0 75 75" fill="none">
              <path d="M38.5008 51.3335C37.7512 51.3349 37.0247 51.0738 36.4475 50.5955L17.1975 34.5539C16.5423 34.0093 16.1302 33.2267 16.052 32.3784C15.9738 31.53 16.2358 30.6853 16.7804 30.0301C17.325 29.3749 18.1075 28.9629 18.9559 28.8847C19.8042 28.8065 20.6489 29.0684 21.3041 29.613L38.5008 43.9864L55.6975 30.1264C56.0256 29.8599 56.4033 29.6608 56.8086 29.5407C57.2139 29.4207 57.639 29.3819 58.0594 29.4266C58.4798 29.4713 58.8872 29.5987 59.2582 29.8013C59.6292 30.004 59.9565 30.278 60.2212 30.6076C60.515 30.9375 60.7376 31.3245 60.8749 31.7444C61.0121 32.1643 61.0612 32.608 61.0191 33.0477C60.9769 33.4875 60.8444 33.9138 60.6298 34.2999C60.4152 34.6861 60.1232 35.0237 59.772 35.2918L40.5221 50.788C39.9282 51.1907 39.2166 51.3828 38.5008 51.3335Z" fill="var(--yeti-p2-light-filter-arrow-color)"/>
            </svg>
          </label>
        </div>
    `;
  mainContent.appendChild(filterMenu);

  const productContainer = document.createElement("section");
  productContainer.className = "product-cards";
  productContainer.id = "product-container";
  mainContent.appendChild(productContainer);

  renderProducts(products);
}



function renderProducts(filteredProducts) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  if (filteredProducts.length === 0) {
    const message = document.createElement("p");
    message.innerText =
      "No queda nada con las opciones que buscas, pero ¡Mira estas sugerencias para tí!";
    productContainer.appendChild(message);

    const suggestions = getRandomAlternatives();
    renderSuggestionProducts(suggestions, productContainer);
    return;
  }

  filteredProducts.forEach((product) => {
    const card = createProductCard(product);
    productContainer.appendChild(card);
  });
}

function renderSuggestionProducts(suggestions, container) {
  suggestions.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
        <div class="card-image">
          <img src="${product.image}" alt="${product.model}">
        </div>
        <div class="card-text">
          <h2 class="brand-name">${product.brand}</h2>
          <div class="model">
            <h3>${product.model}</h3>
            <p>${product.price}€</p>
          </div>
          <div class="buy-product">
            <button class="buy-button" onclick="buyProduct(${product.id})">Comprar</button>
          </div>
        </div>
    `;
  return card;
}

function filterProducts() {
  const brandFilter = document.getElementById("brand").value;
  const priceFilter = document.getElementById("price").value;

  let filteredProducts = products;

  if (brandFilter !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand === brandFilter
    );
  }

  filteredProducts = filteredProducts.filter(
    (product) => product.price <= priceFilter
  );

  renderProducts(filteredProducts);
}

function updatePriceLabel(value) {
  const priceLabel = document.getElementById("price-label");
  priceLabel.innerText = `${value}€`;
}

function clearFilters() {
  document.getElementById("brand").value = "all";
  document.getElementById("price").value = 250;
  updatePriceLabel(250);
  renderProducts(products);
}

function toggleFilterMenu() {
  const filterMenu = document.querySelector(".filters");
  filterMenu.style.display =
    filterMenu.style.display === "none" ? "flex" : "none";
}


function toggleMenu() {
  const menu = document.querySelector(".menu ul");
  menu.style.display = menu.style.display === "none" ? "flex" : "none";
}

function getRandomAlternatives() {
  // const randomProducts = [];
  const shuffled = [...products].sort(() => 0.5 - Math.random()).slice(0, 3);
  return shuffled;
}

function buyProduct(id) {
  const productOnCart = products.find((product) => product.id === id);
  alert(`Zapatillas ${productOnCart.brand} ${productOnCart.model} ya son tuyas!`);
}

renderMainContent();

document.getElementById("brand").addEventListener("change", filterProducts);
document.getElementById("price").addEventListener("input", filterProducts);
