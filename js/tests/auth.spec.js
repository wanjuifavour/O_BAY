/**
 * @jest-environment jsdom
 */
import { describe, test, expect, beforeEach } from "@jest/globals";
import { login, register } from "../auth";
import { showToast } from "../toast";
import { showPopup } from "../popup";
import fetchMock from 'jest-fetch-mock';

jest.mock("../toast", () => ({
    showToast: jest.fn()
}));

jest.mock("../popup", () => ({
    showPopup: jest.fn()
}));

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
    
    document.body.innerHTML = `
        <div id="toast-container"></div>
        <div id="loginPopup"></div>
    `;

    Object.defineProperty(window, 'localStorage', {
        value: {
            setItem: jest.fn(),
            getItem: jest.fn(),
            removeItem: jest.fn()
        },
        writable: true
    });

    delete window.location;
    window.location = {
        href: '',
        assign: jest.fn()
    };

    showToast.mockClear();
    showPopup.mockClear();
});

describe("Testing the authentication module", () => {
    test("should login the user", async () => {
        const email = "test@example.com";
        const password = "password";
        const isAdmin = false;
        const accounts = [{ email, password }];

        fetchMock.mockResponseOnce(JSON.stringify(accounts));

        await login(email, password, isAdmin);

        expect(fetchMock).toHaveBeenCalled();
        expect(window.localStorage.setItem).toHaveBeenCalled();
        expect(window.location.assign).toHaveBeenCalledWith("products.html");
    });

    test("should register a new user", async () => {
        const email = "newuser@example.com";
        const password = "newpassword";
        const isAdmin = false;
        const accounts = [];

        fetchMock.mockResponseOnce(JSON.stringify(accounts));

        await register(email, password, isAdmin);

        expect(fetchMock).toHaveBeenCalled();
        expect(window.localStorage.setItem).toHaveBeenCalled();
        expect(showToast).toHaveBeenCalledWith("Account created successfully!", "success");
        expect(showPopup).toHaveBeenCalledWith("loginPopup");
    });
});