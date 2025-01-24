import { fetchProducts } from "./api.js";
import { showPopup, closePopup } from "./popup.js";
import { addToCart } from "./cart.js";
import { showToast } from "./toast.js";

export const loadProducts = async () => {
    const products = await fetchProducts();
    displayProducts(products);
};

const displayProducts = (products) => {
    const container = document.querySelector(".products-page");
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.imageUrl}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <button class="rg-btn view-product-btn" data-id="${product.id}">View</button>
        </div>
    `).join("");

    document.querySelectorAll('.view-product-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            viewProduct(productId);
        });
    });
};

export const viewProduct = async (id) => {
    try {
        if (!checkProductElements()) {
            throw new Error('Required product elements not found');
        }

        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const product = await response.json();

        const nameElement = document.getElementById('productNamePopup');
        const imageElement = document.getElementById('productImagePopup');
        const descriptionElement = document.getElementById('productDescriptionPopup');
        const priceElement = document.getElementById('productPricePopup');
        const stockElement = document.getElementById('productStockPopup');
        const categoryElement = document.getElementById('productCategoryPopup');

        if (nameElement) nameElement.textContent = product.name;
        if (imageElement) imageElement.src = product.imageUrl;
        if (descriptionElement) descriptionElement.textContent = product.description;
        if (priceElement) priceElement.textContent = product.price;
        if (stockElement) stockElement.textContent = product.stock;
        if (categoryElement) categoryElement.textContent = product.category;

        currentProductId = product.id;

        if (adminControls) {
            adminControls.style.display = isAdmin() ? "block" : "none";
        }

        const cartControlsElement = document.querySelector('.cart-controls');
        if (cartControlsElement) {
            cartControlsElement.style.display = isAdmin() ? "none" : "block";
        }

        if (!isAdmin()) {
            updateCartUI();
        }

        openPopup(productDetailsPopup);
    } catch (error) {
        console.error("Error loading product:", error);
        showToast("Failed to load product details. Please try again.", "error");
    }
}

const setupAddToCartButton = (productId) => {
    const addToCartBtn = document.getElementById("addToCartBtn");
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById("productQuantity").value, 10);
            addToCart(productId, quantity);
            showToast("Product added to cart!", "success");
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("click", (event) => {
        if (event.target.classList.contains("popup")) {
            closePopup();
        }
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePopup();
        }
    });
    loadProducts();
});