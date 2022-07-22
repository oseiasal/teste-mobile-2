const { join } = require('path')
const allure = require('allure-commandline')

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
        timeout: 40000
    },
    capabilities: [{
        "platformName": "Android",
        "platformVersion": "8.1",
        "deviceName": "emulator-5558",
        "automationName": "UiAutomator2",
        "app": join(process.cwd(), "./app/android/loja-ebac.apk"),
        "appWaitActivity": "com.woocommerce.android.ui.login.LoginActivity",
        "appWaitPackage": "com.woocommerce.android",
    }], reporters: ['spec', ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
    }]],
    onComplete: function () {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
    afterStep: async function (step, scenario, { error, duration, passed }, context) {
        if (error) {
            await browser.takeScreenshot();
        }
    }
}