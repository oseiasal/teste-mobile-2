const { join } = require('path')

exports.config = {
    hostname: 'localhost',
    port: 3005,
    path: '/wd/hub',
    specs: [
        './test/specs/**/*.spec.js'
    ],
    framework: "mocha",
    waitforTimeout: 20000,
    mochaOpts: {
        timeout: 30000
    },
    capabilities: [{
        "platformName": "Android",
        "platformVersion": "8.1",
        "deviceName": "emulator-5558",
        "automationName": "UiAutomator2",
        "app": join(process.cwd(), "./app/android/loja-ebac.apk"),
        "appWaitActivity": "com.woocommerce.android.ui.login.LoginActivity",
        "appWaitPackage": "com.woocommerce.android",
    }]
}