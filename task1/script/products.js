const Laptopurl = "https://dummyjson.com/products/category/laptops";
const Smartphoneurl = "https://dummyjson.com/products/category/smartphones";
const Furnitureurl = "https://dummyjson.com/products/category/furniture";
const Lightingurl = "https://dummyjson.com/products/category/home-decoration";
const Mensurl = "https://dummyjson.com/products/category/mens-shirts";
const Womensurl = "https://dummyjson.com/products/category/womens-dresses";
const Fragrancesurl = "https://dummyjson.com/products/category/fragrances";
const Shoesurl = "https://dummyjson.com/products/category/mens-shoes";

let allProducts = [];

async function fetchProducts() {
  try {
    const [
      laptops,
      smartphones,
      furniture,
      lighting,
      mens,
      womens,
      fragrances,
      shoes,
    ] = await Promise.all([
      fetch(Laptopurl).then((res) => res.json()),
      fetch(Smartphoneurl).then((res) => res.json()),
      fetch(Furnitureurl).then((res) => res.json()),
      fetch(Lightingurl).then((res) => res.json()),
      fetch(Mensurl).then((res) => res.json()),
      fetch(Womensurl).then((res) => res.json()),
      fetch(Fragrancesurl).then((res) => res.json()),
      fetch(Shoesurl).then((res) => res.json()),
    ]);

    allProducts = [
      ...laptops.products,
      ...smartphones.products,
      ...furniture.products,
      ...lighting.products,
      ...mens.products,
      ...womens.products,
      ...fragrances.products,
      ...shoes.products,
    ];

    displayProducts(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProducts(products) {
  const listproducts = document.getElementById("productList");
  listproducts.innerHTML = "";

  if (products.length === 0) {
    listproducts.innerHTML = `<p>No products found.</p>`;
    return;
  }

  products.forEach((product) => {
    const productCard = `
      <div class="list-products-card">
        <img src="${product.thumbnail}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>
          <span>$${product.price}</span> 
          ${
            product.discountPercentage
              ? `<del>$${(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}</del>`
              : ""
          }
        </p>
        <h3>${
          product.availabilityStatus ||
          (product.stock > 0 ? "IN STOCK" : "OUT OF STOCK")
        }</h3>
        <div class="product-buttons">
          <button type="button" class="add-to-cart" onclick="addToCart(${product.id})">
            <i class="fa fa-cart-plus" aria-hidden="true"></i>
          </button>
          <button type="button" class="view-details" onclick="viewProductDetails(${product.id}, '${product.category}')">View Details</button>
        </div>
      </div>
    `;
    listproducts.innerHTML += productCard;
  });
}

document.getElementById("searchButton").addEventListener("click", function () {
  applyFilters();
});

document.getElementById("searchInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    applyFilters();
  }
});

document.getElementById("filterButton").addEventListener("click", function () {
  applyFilters();
});

function applyFilters() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const selectedCategory = document.getElementById("categoryFilter").value;
  const selectedPrice = document.getElementById("priceFilter").value;

  let filtered = [...allProducts];

  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by category
  if (selectedCategory) {
    filtered = filtered.filter((product) => {
      const categoryMap = {
        laptops: "laptops",
        smartphones: "smartphones",
        furniture: "furniture",
        lighting: "home-decoration",
        mens: "mens-shirts",
        womens: "womens-dresses",
        fragrances: "fragrances",
        shoes: "mens-shoes",
      };
      return product.category === categoryMap[selectedCategory];
    });
  }

  // Filter by price range
  if (selectedPrice === "low-to-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (selectedPrice === "high-to-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

function viewProductDetails(id, category) {
  const url = `./view-product.html?id=${id}&category=${encodeURIComponent(category)}`;
  window.location.href = url;
}

function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = allProducts.find((p) => p.id === productId);

  if (product) {
    const existingProduct = cart.find((p) => p.id === productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  } else {
    alert("Product not found!");
  }
}

document.addEventListener("DOMContentLoaded", fetchProducts);
