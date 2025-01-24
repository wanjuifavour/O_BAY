import { fetchUsers, fetchProducts, fetchAdmins } from "../api";
import { describe, test, expect, beforeEach } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
});

describe("Testing the API endpoint", () => {
    test("should fetch products", async () => {
        fetch.mockResponseOnce(JSON.stringify([{ id: "prod_001", name: "Ultra HD Smart TV" }]));
        const products = await fetchProducts();
        expect(products).toBeDefined();
        expect(products.length).toBeGreaterThan(0);
    });

    test("should fetch users", async () => {
        fetch.mockResponseOnce(JSON.stringify([{ id: "1", name: "John Smith" }]));
        const users = await fetchUsers();
        expect(users).toBeDefined();
        expect(users.length).toBeGreaterThan(0);
    });

    test("should fetch admins", async () => {
        fetch.mockResponseOnce(JSON.stringify([{ id: "1", name: "Admin User" }]));
        const admins = await fetchAdmins();
        expect(admins).toBeDefined();
        expect(admins.length).toBeGreaterThan(0);
    });
});