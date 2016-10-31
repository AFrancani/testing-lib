module.exports = function(logger, testerCore) {
	var colors = require('colors');

	var prefixe = '';

	function addPrefixeSize(value) {
		var size = prefixe.length + value;
		prefixe = '';
		for(var i = 0; i < size; i++) {
			prefixe += ' ';
		}
	}

	function log(message) {
		logger.log(prefixe + message);
	}

	function testThat(name, functionContainingTest) {
		var testResult = testerCore.testThat(name, functionContainingTest);

		log(testResult.name + (testResult.passed ? ' passed!'.green : ' failed!'.red));
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

		var number_of_passing_tests = description.tests.filter(test => test.passed).length;
		if(number_of_passing_tests) log(`${number_of_passing_tests} tests passed`.green);

		var number_of_failing_tests = description.tests.filter(test => !test.passed).length;
		if(number_of_failing_tests) log(`${number_of_failing_tests} tests failed`.red);
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

}