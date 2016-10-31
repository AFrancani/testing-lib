module.exports = function() {
	var beforeEachFunction = function() {};
	var current_description = { name: '', tests: [] };

	function beforeEach(functionToRun) {
		var previousBeforeEach = beforeEachFunction;
		beforeEachFunction = function() {
			previousBeforeEach();
			functionToRun();
		};
	}

	function testThat(name, functionContainingTest) {
		var test = { name: name, passed: false };
		beforeEachFunction();
		try {
			functionContainingTest();
			test.passed = true;
		} catch (e) {
			test.message = e.message;
		} finally {
			current_description.tests.push(test);
			return test;
		}
	}

	function describe(name, functionContainingTests) {
		current_description = { name: name, tests: [] };
		var previousBeforeEach = beforeEachFunction;
		functionContainingTests();
		beforeEachFunction = previousBeforeEach;
		return current_description;
	}

	return {
		beforeEach: beforeEach,
		testThat: testThat,
		describe: describe
	};
};