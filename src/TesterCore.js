"use strict";

module.exports = function() {
	let beforeEachFunction = function() {};
	let current_description = { name: '', tests: [] };

	function beforeEach(functionToRun) {
		const previousBeforeEach = beforeEachFunction;
		beforeEachFunction = function() {
			previousBeforeEach();
			functionToRun();
		};
	}

	function testThat(name, functionContainingTest) {
		let test = { name: name, passed: false };
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
		const previousBeforeEach = beforeEachFunction;
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