const { createRPFormatterClass } = require('@reportportal/agent-js-cucumber');
const config = require('./rp.config.js');

// Debug configuration
console.log('[RP] ========================================');
console.log('[RP] ReportPortal Formatter Loading...');
console.log('[RP] Configuration loaded:', {
    endpoint: config.endpoint,
    project: config.project,
    apiKey: config.apiKey.substring(0, 20) + '...',
    launch: config.launch,
    debug: config.debug
});

const RPFormatterClass = createRPFormatterClass(config);
console.log('[RP] ReportPortal formatter class created successfully');
console.log('[RP] ========================================');

module.exports = RPFormatterClass;