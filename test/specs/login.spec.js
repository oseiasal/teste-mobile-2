const loginScreen = require("../page-objects/login.screen");
const HomeScreen = require("../page-objects/home.screen");
const StoreScreen = require("../page-objects/store.screen");

describe('Login de usuário', () => {
    const url = 'http://lojaebac.ebaconline.art.br'
    const user = "lojaebacqe@gmail.com"
    const pass = "GD*peToHNJ1#c$sgk08EaYJQ"

    it('Tentando fazer o login', async () => {
        await HomeScreen.openEnterAddress()
        await loginScreen.typeAddress(url)
        await loginScreen.continueToStoreCreds()
        await loginScreen.tryLogin(user, pass)
        await loginScreen.continueWithPassword(pass)

        expect(await StoreScreen.getSiteTitles()).toBe("EBAC - Shop");

    });
});