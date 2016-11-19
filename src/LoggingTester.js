"use strict";

module.exports = function(logger, testerCore) {
	const colors = require('colors');

	let prefixe = '';

	function addPrefixeSize(value) {
		const size = prefixe.length + value;
		prefixe = '';
		for(let i = 0; i < size; i++) {
			prefixe += ' ';
		}
	}

	function log(message) {
		logger.log(prefixe + message);
	}

	function testThat(name, functionContainingTest) {
		const testResult = testerCore.testThat(name, functionContainingTest);

		log((testResult.passed ? 'V'.green : 'X'.red) + ' ' + testResult.name);
		if(!testResult.passed) {
			log('  ' + testResult.message);
		}

		return testResult.passed;
	}

	function logHeader(name) {
		log(' ');
		log(name.bold);
	}

	function logResults(description) {
		log(' ');

		const number_of_passing_tests = description.tests.filter(test => test.passed).length;
		if (number_of_passing_tests) log(`${number_of_passing_tests} passing`.green);

		const number_of_failing_tests = description.tests.filter(test => !test.passed).length;
		if (number_of_failing_tests) log(`${number_of_failing_tests} failing`.red);
	}

	function describe(name, functionContainingTests) {
		logHeader(name);

		addPrefixeSize(2);

		logResults(testerCore.describe(name, functionContainingTests));

		addPrefixeSize(-2);
	}

	return {
		beforeEach: testerCore.beforeEach,
		testThat: testThat,
		describe: describe
	};

};