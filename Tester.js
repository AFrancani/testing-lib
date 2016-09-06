module.exports = function(logger) {
	var colors = require('colors');

	var beforeEachFunction = function() {};
	var prefixe = '';

	function beforeEach(functionToRun) {
		var previousBeforeEach = beforeEachFunction;
		beforeEachFunction = function() {
			previousBeforeEach();
			functionToRun();
		};
	}

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
		var testResult = runTest(name, functionContainingTest);

		log(testResult.name + (testResult.passed ? ' passed!'.green : ' failed!'.red));
		if(!testResult.passed) {
			log('  ' + testResult.message);
		}

		return testResult.passed;
	}

	function runTest(name, functionContainingTest) {
		beforeEachFunction();
		try {
			functionContainingTest();
			return { name: name, passed: true };
		} catch (e) {
			return { name: name, passed: false, message: e.message };
		}
	}

	function describe(name, functionContainingTests) {
		var previousBeforeEach = beforeEachFunction;
		log(' ');
		log(name.bold);
		addPrefixeSize(2);
		functionContainingTests();
		addPrefixeSize(-2);
		log(' ');
		beforeEachFunction = previousBeforeEach;
	}

	return {
		beforeEach: beforeEach,
		testThat: testThat,
		describe: describe
	};

}