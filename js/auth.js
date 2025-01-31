import { fetchUsers, fetchAdmins } from "./api.js";
import { showToast } from "./toast.js";
import { showPopup } from "./popup.js";

export const login = async (email, password, isAdmin = false) => {
    const endpoint = isAdmin ? fetchAdmins : fetchUsers;
    const accounts = await endpoint();
    const account = accounts.find(a => a.email === email && a.password === password);

    if (account) {
        localStorage.setItem("currentUser", JSON.stringify(account));
        window.location.replace("products.html");
        showPopup("Welcome Back.", "success")
    } else {
        showToast("Invalid credentials!", "error");
    }
};

export const register = async (email, password, isAdmin = false) => {
    const endpoint = isAdmin ? fetchAdmins : fetchUsers;
    const accounts = await endpoint();
    const existingAccount = accounts.find(a => a.email === email);

    if (existingAccount) {
        showToast("Account already exists!", "error");
    } else {
        const newAccount = { email, password };
        accounts.push(newAccount);
        localStorage.setItem("currentUser", JSON.stringify(newAccount));
        showToast("Account created successfully!", "success");
        showPopup("loginPopup");
    }
}

export const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
};