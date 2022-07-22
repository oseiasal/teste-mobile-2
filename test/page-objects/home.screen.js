class HomeScreen {
    get #buttonEnterAddress() {
        return $("id:button_login_store");
    }

    async openEnterAddress() {
        await this.#buttonEnterAddress.click();
    }
}

module.exports = new HomeScreen()