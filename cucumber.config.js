const os = require('os');
const git = require('git-rev-sync');

module.exports = {
    default: {
        require: [
            "src/support/**/*.ts",    // Load world and support files first
            "src/steps/**/*.ts",       // Then load step definitions
        ],
        paths: ["src/features/**/*.feature"],
        requireModule: ["ts-node/register"],
        format: [
            "allure-cucumberjs/reporter",
            "html:reports/cucumber-report.html",
           "json:reports/cucumber-report.json",
            "summary"
        ],
        formatOptions: {
            snippetInterface: "async-await",
            resultsDir: "allure-results",
            environmentInfo: {
                os_platform: os.platform(),
                os_release: os.release(),
                node_version: process.version,
                cucumber_version: require('@cucumber/cucumber/package.json').version,
                browser_name: process.env.BROWSER || 'chromium', // or dynamically detect
                browser_version: require('playwright/package.json').version,
                git_commit: git.short(),
                git_branch: git.branch(),
                run_timestamp: new Date().toISOString(),
                run_user: os.userInfo().username,
                hostname: os.hostname(),
                cpu_arch: os.arch(),
                total_memory_gb: (os.totalmem() / (1024 ** 3)).toFixed(2),
            }
        }
    }
};