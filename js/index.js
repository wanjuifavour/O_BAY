import { login } from "./auth.js";
import { showPopup, closePopup } from "./popup.js";
import { showToast } from "./toast.js";

const setupEventListeners = () => {
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const adminLoginBtn = document.getElementById("adminLoginBtn");

    // Event listeners
    if (loginBtn) {
        loginBtn.addEventListener("click", () => showPopup("loginPopup"));
    }

    if (registerBtn) {
        registerBtn.addEventListener("click", () => showPopup("regPopup"));
    }

    if (adminLoginBtn) {
        adminLoginBtn.addEventListener("click", async () => {
            const email = document.querySelector("#adminEmail").value;
            const password = document.querySelector("#adminPassword").value;
            await login(email, password, true);
        });
    }

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

    showToast("Welcome to O-BAY!", "success");
};

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById('popups').innerHTML = await (await fetch('./components/Popups.html')).text();
    setupEventListeners();
});
