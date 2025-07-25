import * as os from "node:os";
import * as process from "node:process";

module.exports = {
    default: {
        require: ["src/steps/**/*.ts"],
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
                cucumber_version: require('@cucumber/cucumber/package.json').version,
                allure_cucumberjs_version: require('allure-cucumberjs/package.json').version,
                allure_results_dir: "allure-results"
            }
        }
    }
};