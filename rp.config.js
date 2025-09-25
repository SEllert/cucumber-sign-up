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
            value: "chromium"
        },
        {
            key: "environment",
            value: "local"
        }
    ],
    mode: "DEFAULT",
    debug: true,
    scenarioBasedStatistics: false,
    takeScreenshot: "onFailure"
};
