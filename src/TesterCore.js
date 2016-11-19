"use strict";

module.exports = function() {
	const last = arr => arr.slice(-1)[0];
	let beforeEachFunction = function() {};
	let test_suite = { name: '', tests: [], describe: []}

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
			test_suite.tests.push(test);
			return test;
		}
	}

	function describe(name, functionContainingTests) {
		const previousBeforeEach = beforeEachFunction;
		const previous_test_suite = test_suite;

		test_suite = { name: name, tests: [], describe: []};
		previous_test_suite.describe.push(test_suite);

		functionContainingTests();

		beforeEachFunction = previousBeforeEach;
		test_suite = previous_test_suite;

		return last(test_suite.describe);
	}

	return {
		beforeEach: beforeEach,
		testThat: testThat,
		describe: describe
	};
};