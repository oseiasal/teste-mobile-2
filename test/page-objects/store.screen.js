class StoreScreen {
    get #siteTitle() { return $('id:toolbar_subtitle') }

    async getSiteTitles() {
        await this.#siteTitle.waitForExist()
        return await this.#siteTitle.getText()
    }
}
module.exports = new StoreScreen()