import { login } from "./auth.js";
import { showPopup, closePopup } from "./popup.js";

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

    const userLoginForm = document.getElementById('loginForm');
    if (userLoginForm) {
        userLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Form submitted'); // Add this
            const email = document.querySelector('#loginEmail').value;
            const password = document.querySelector('#loginPassword').value;
            await login(email, password);
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

};

document.addEventListener("DOMContentLoaded", async () => {
    await fetch('./components/Popups.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('popups').innerHTML = html;
            setupEventListeners(); // Move this here
        });
});
