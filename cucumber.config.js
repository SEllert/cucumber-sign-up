const fs = require('fs');
const path = require('path');
const environmentInfo = require('./src/support/environment-info');

module.exports = {
    default: {
        require: [
            "src/support/**/*.ts",
            "src/steps/**/*.ts",
        ],
        paths: ["src/features/**/*.feature"],
        requireModule: ["ts-node/register"],
        format: [
            "progress",
            "html:reports/cucumber-report.html",
            "json:reports/cucumber-report.json",
            "summary"
        ],
        formatOptions: {
            snippetInterface: "async-await"
        }
    }
};

// Write environment.properties
const envProps = Object.entries(environmentInfo)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
fs.writeFileSync(path.join('reports', 'environment.properties'), envProps);