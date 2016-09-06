module.exports = function(logger) {
	var colors = require('colors');

	var TesterCore = function() {
		var beforeEachFunction = function() {};

		function beforeEach(functionToRun) {
			var previousBeforeEach = beforeEachFunction;
			beforeEachFunction = function() {
				previousBeforeEach();
				functionToRun();
			};
		}

		function testThat(name, functionContainingTest) {
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
			functionContainingTests();
			beforeEachFunction = previousBeforeEach;
		}

		return {
			beforeEach: beforeEach,
			testThat: testThat,
			describe: describe
		};
	};

	var testerCore = new TesterCore();

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

	function describe(name, functionContainingTests) {
		log(' ');
		log(name.bold);
		addPrefixeSize(2);

		testerCore.describe(name, functionContainingTests);

		addPrefixeSize(-2);
		log(' ');
	}

	return {
		beforeEach: testerCore.beforeEach,
		testThat: testThat,
		describe: describe
	};

}