const os = require('os');
const git = require('git-rev-sync');
const fs = require('fs');
const path = require('path');

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


// Create environment.properties for Allure
const environmentInfo = {
    'os.platform': os.platform(),
    'os.release': os.release(),
    'node.version': process.version,
    'browser.name': process.env.BROWSER || 'chromium',
    'git.commit': git.short(),
    'git.branch': git.branch(),
    'run.timestamp': new Date().toISOString(),
    'run.user': os.userInfo().username,
};

const envProps = Object.entries(environmentInfo)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

// Write environment.properties
fs.writeFileSync(path.join('reports', 'environment.properties'), envProps);