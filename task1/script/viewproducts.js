document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const category = params.get("category");

  if (!id || !category) {
    document.querySelector("main").innerHTML =
      "<h2>Invalid product details!</h2>";
    return;
  }

  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await response.json();
    const product = data.products.find((p) => p.id == id);

    if (!product) {
      document.querySelector("main").innerHTML = "<h2>Product not found!</h2>";
      return;
    }

    document.querySelector(".product-image").src = product.thumbnail;
    document.querySelector(".product-image").alt = product.title;

    document.querySelector(".view-product-details h1").textContent =
      product.title;
    document.querySelector(".product-description").textContent =
      product.description;
    document.querySelector(
      ".product-price"
    ).innerHTML = `$${product.price} <del>${product.discountPercentage}%</del>`;

    const ratingElement = document.querySelector(".rating");
    const rating = Math.round(product.rating);
    ratingElement.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("i");
      star.classList.add("fa-star", "fas");
      if (i <= rating) {
        star.classList.add("filled");
      }
      ratingElement.appendChild(star);
    }

    document.querySelector(".rating-count").textContent = `(${product.rating})`;
    document.querySelectorAll(
      ".rating-count"
    )[1].textContent = `${product.stock}+ Ratings`;

    document.querySelector(".product-descriptions p").textContent =
      product.description;
    document
      .querySelector(".add-to-cart-btn")
      .addEventListener("click", function () {
        addToCart(product);
      });
  } catch (err) {
    console.error("Error loading product:", err);
    document.querySelector("main").innerHTML =
      "<h2>Error loading product!</h2>";
  }
});

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((p) => p.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}
