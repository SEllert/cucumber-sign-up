// generate-report.js
const path = require('path');
const reporter = require('multiple-cucumber-html-reporter');
const environmentInfo = require('./environment-info');

reporter.generate({
  jsonDir: path.resolve(__dirname, '../../reports'), // always points to the reports dir at project root
  reportPath: path.resolve(__dirname, '../../reports/html'),
  metadata: {
    browser: {
      name: environmentInfo['browser.name'],
      version: environmentInfo['node.version'] // or use a real browser version if available
    },
    device: 'Local test machine',
    platform: {
      name: environmentInfo['os.platform'],
      version: environmentInfo['os.release']
    }
  },
  customData: {
    title: 'Run Info',
    data: Object.entries(environmentInfo).map(([key, value]) => ({ label: key, value: value }))
  }
});