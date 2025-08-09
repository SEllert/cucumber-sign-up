const os = require('os');
const git = require('git-rev-sync');

module.exports = {
  'os.platform': os.platform(),
  'os.release': os.release(),
  'node.version': process.version,
  'browser.name': process.env.BROWSER || 'chromium',
  'git.commit': git.short(),
  'git.branch': git.branch(),
  'run.timestamp': new Date().toISOString(),
  'run.user': os.userInfo().username,
};