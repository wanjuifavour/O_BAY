const API_URL = "http://localhost:3000";

export const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    return response.json();
};

export const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
};

export const fetchAdmins = async () => {
    const response = await fetch(`${API_URL}/admins`);
    return response.json();
};