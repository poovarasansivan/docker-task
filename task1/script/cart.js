const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

const cartContainer = document.querySelector('.cart-items');
const billingItemsContainer = document.querySelector('.cart-product-items');
const subtotalContainer = document.querySelectorAll('.cart-product-total h3')[1];
const taxContainer = document.querySelectorAll('.cart-product-total h3')[3];
const totalContainer = document.querySelectorAll('.cart-product-total h3')[5];

function formatCurrency(num) {
    return `$${num.toFixed(2)}`;
}

function renderCart() {
    cartContainer.innerHTML = ''; 
    billingItemsContainer.innerHTML = ''; 

    let subtotal = 0;

    cartItems.forEach(item => {
        const itemTotal = item.price * (item.quantity || 1);
        subtotal += itemTotal;

        // Cart Item Display
        const itemHTML = `
            <div class="cart-item-products">
                <div class="cart-item-thumbnail">
                    <img src="${item.thumbnail}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <h3>${formatCurrency(item.price)}</h3>
                    <button class="remove-button" onclick="removeItem(${item.id})">Remove</button>
                    <button class="buy-button">Buy Now</button>
                </div>
            </div>
        `;
        cartContainer.innerHTML += itemHTML;

        billingItemsContainer.innerHTML += `
            <div class="cart-product-item-name">
                <h4>${item.title}</h4>
                <h4>${formatCurrency(itemTotal)}</h4>
            </div>
        `;
    });

    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    subtotalContainer.textContent = formatCurrency(subtotal);
    taxContainer.textContent = `18% x ${formatCurrency(subtotal)} = ${formatCurrency(tax)}`;
    totalContainer.textContent = formatCurrency(total);
}

function removeItem(id) {
    const updatedCart = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    location.reload(); 
}

renderCart();