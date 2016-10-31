var TesterCore = require('./TesterCore.js'),
	LoggingTester = require('./LoggingTester.js');

function createLoggingTester(options) {
	options = options || {};
	return new LoggingTester(options.logger || console, options.tester || new TesterCore());
}

module.exports = {
	createLoggingTester: createLoggingTester
};