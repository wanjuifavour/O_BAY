export const addToCart = (productId, quantity) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    cart[productId] = (cart[productId] || 0) + quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    delete cart[productId];
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = () => JSON.parse(localStorage.getItem("cart") || "{}");