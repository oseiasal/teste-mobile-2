class LoginScreen {


    get #inputEnterAddress() {
        return $("id:input");
    }

    get #loginStoreCredsButton() {
        return $("id:login_site_creds");
    }

    get #userInput() {
        return $(`android=new UiSelector().text("Username").className("android.widget.EditText")`);
    }

    get #passwordInput() {
        return $(`android=new UiSelector().text("Password").className("android.widget.EditText")`);
    }

    get #continue() {
        return $("id:bottom_button");
    }

    get #continueWithPasswordButton() {
        return $("id:login_enter_password");
    }





    async typeAddress(address) {
        await this.#inputEnterAddress.addValue(address);
        await this.#continue.click();
    }

    async continueToStoreCreds() {
        await this.#loginStoreCredsButton.click()
    }


    async tryLogin(user, pass) {
        await this.#userInput.addValue(user);
        await this.#passwordInput.addValue(pass);
        await this.#continue.click();
    }

    async continueWithPassword(pass) {
        await this.#continueWithPasswordButton.click()
        await this.#passwordInput.addValue(pass);
        await this.#continue.click()
    }


}

module.exports = new LoginScreen();
