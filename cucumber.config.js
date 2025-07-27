const os = require('os');

module.exports = {
    default: {
        require: [
            "src/support/**/*.ts",    // Load world and support files first
            "src/steps/**/*.ts"       // Then load step definitions
        ],
        paths: ["src/features/**/*.feature"],
        requireModule: ["ts-node/register"],
        format: ["allure-cucumberjs/reporter"],
        formatOptions: {
            snippetInterface: "async-await",
            resultsDir: "allure-results",
            environmentInfo: {
                os_platform: os.platform(),
                os_release: os.release(),
                node_version: process.version,
                cucumber_version: require('@cucumber/cucumber/package.json').version
            }
        }
    }
};