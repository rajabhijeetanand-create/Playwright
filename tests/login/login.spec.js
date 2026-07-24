import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/LoginPage.js";
import loginData from "../../test-data/loginData.js";

test.describe("Login Feature", () => {

    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test("Verify user can login with valid credentials", async ({ page }) => {

        // Act
        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

        // Assert
        await expect(page).toHaveURL(/secure/);

        expect(await loginPage.isUserLoggedIn()).toBeTruthy();

        expect(await loginPage.getSuccessMessage())
            .toContain("You logged into a secure area!");

    });

    test("Verify login fails with invalid username", async ({ page }) => {

        // Act
        await loginPage.login(
            loginData.invalidUser.username,
            loginData.validUser.password
        );

        // Assert
        await expect(page).toHaveURL(/login/);

        expect(await loginPage.getErrorMessage())
            .toContain("Your username is invalid!");

    });

    test("Verify login fails with invalid password", async ({ page }) => {

        // Act
        await loginPage.login(
            loginData.validUser.username,
            loginData.invalidUser.password
        );

        // Assert
        await expect(page).toHaveURL(/login/);

        expect(await loginPage.getErrorMessage())
            .toContain("Your password is invalid!");

    });

    test("Verify login fails with blank username", async ({ page }) => {

        // Act
        await loginPage.login(
            loginData.blankUser.username,
            loginData.blankUser.password
        );

        // Assert
        await expect(page).toHaveURL(/login/);

        expect(await loginPage.getErrorMessage())
            .toContain("Your username is invalid!");

    });

    test("Verify login fails with blank password", async ({ page }) => {

        // Act
        await loginPage.login(
            loginData.blankPassword.username,
            loginData.blankPassword.password
        );

        // Assert
        await expect(page).toHaveURL(/login/);

        expect(await loginPage.getErrorMessage())
            .toContain("Your password is invalid!");

    });

});