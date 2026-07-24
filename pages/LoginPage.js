export default class LoginPage extends CommonActions {

    #usernameTxt;
    #passwordTxt;
    #loginBtn;
    #logoutLnk;
    #successMsg;
    #errorMsg;

    constructor(page) {
        super(page);

        this.#usernameTxt = page.locator("#username");
        this.#passwordTxt = page.locator("#password");
        this.#loginBtn = page.getByRole("button", { name: "Login" });
        this.#logoutLnk = page.getByRole("link", { name: "Logout" });
        this.#successMsg = page.locator(".flash.success");
        this.#errorMsg = page.locator(".flash.error");
    }

    async navigate() {
        await this.page.goto("/login");
    }

    async login(username, password) {
        await this.fill(this.#usernameTxt, username);
        await this.fill(this.#passwordTxt, password);
        await this.click(this.#loginBtn);
    }

    async logout() {
        await this.click(this.#logoutLnk);
    }

    async isUserLoggedIn() {
        return await this.isVisible(this.#logoutLnk);
    }

    async getSuccessMessage() {
        return await this.getText(this.#successMsg);
    }

    async getErrorMessage() {
        return await this.getText(this.#errorMsg);
    }
}