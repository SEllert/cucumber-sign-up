// ReportPortal configuration with dynamic environment attributes
// Integrates system information from environment-info.js for better traceability
const environmentInfo = require('./src/support/environment-info');

module.exports = {
    apiKey: "cucumber-sign-up_zLBgSvAbQn6j5EKXaONiQ9CgesZBz4X8ci3-FapAre9jAPnLI6q2iOJEM5YLRF4o",
    endpoint: "http://localhost:8080/api/v1",
    launch: "Cucumber Sign-up Tests",
    project: "cucumber-sign-up",
    description: "Automated tests for the petition signup process with multi-language support and visual regression testing",
    attributes: [
        {
            key: "framework",
            value: "cucumber"
        },
        {
            key: "browser", 
            value: environmentInfo['browser.name']
        },
        {
            key: "environment",
            value: process.env.TEST_ENV || "local"
        },
        {
            key: "os.platform",
            value: environmentInfo['os.platform']
        },
        {
            key: "os.release",
            value: environmentInfo['os.release']
        },
        {
            key: "node.version",
            value: environmentInfo['node.version']
        },
        {
            key: "git.branch",
            value: environmentInfo['git.branch']
        },
        {
            key: "git.commit",
            value: environmentInfo['git.commit']
        },
        {
            key: "run.user",
            value: environmentInfo['run.user']
        }
    ],
    mode: "DEFAULT",
    debug: true,
    scenarioBasedStatistics: false,
    takeScreenshot: "onFailure"
};
