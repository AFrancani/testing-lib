module.exports = function() {
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