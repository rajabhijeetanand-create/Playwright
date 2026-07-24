export default class CommonActions {

    constructor(page) {
        this.page = page;
    }

    async click(locator) {
        await locator.click();
    }

    async fill(locator, value) {
        await locator.fill(value);
    }

    async getText(locator) {
        return await locator.textContent();
    }

    async isVisible(locator) {
        return await locator.isVisible();
    }

    async waitForVisible(locator) {
        await locator.waitFor({
            state: 'visible'
        });
    }
}