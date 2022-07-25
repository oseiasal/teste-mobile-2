const { join } = require('path')
const allure = require('allure-commandline')
const video = require('wdio-video-reporter');

exports.config = {
    // hostname: 'localhost',
    // port: 3005,
    // path: '/wd/hub',
    user: 'osiasnascimento_kT7VCy',
    key: 'GyemdjZx9dL7V86sdQwq',
    services: [
        ['browserstack']
    ],
    specs: [
        './test/specs/**/*.spec.js'
    ],
    framework: "mocha",
    waitforTimeout: 20000,
    mochaOpts: {
        timeout: 40000
    },
    capabilities: [{
        'app': 'bs://80c016dd7f5b4c35b59b5cb4b37f76c39bb0623a',
        'device': 'Google Pixel 3',
        'os_version': '9.0',
        'project': 'Primeiro projeto em device farm',
        'build': '2',
        'name': 'first_test'

        // "platformName": "Android",
        // "platformVersion": "8.1",
        // "deviceName": "emulator-5558",
        // "automationName": "UiAutomator2",
        // "app": join(process.cwd(), "./app/android/loja-ebac.apk"),
        // "appWaitActivity": "com.woocommerce.android.ui.login.LoginActivity",
        // "appWaitPackage": "com.woocommerce.android",
    }], reporters: ['spec', ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
    }], [video, {
        saveAllVideos: false,       // If true, also saves videos for successful test cases
        videoSlowdownMultiplier: 50, // Higher to get slower videos, lower for faster videos [Value 1-100]
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