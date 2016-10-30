const Assertion = require('./Assertion.js'),
	TesterCore = require('./TesterCore.js'),
	LoggingTester = require('./LoggingTester.js');

const t = new LoggingTester(console, new TesterCore()),
	testThat = t.testThat,
	beforeEach = t.beforeEach,
	describe = t.describe;

const fail = Assertion.fail,
	FailException = Assertion.FailException,
	isTrue = Assertion.isTrue,
	TrueException = Assertion.TrueException,
	assertThat = Assertion.assertThat,
	isFalse = Assertion.isFalse,
	equals = Assertion.equals;

testThat('testThat should pass if nothing fails', function() {
	var testPassed = false,
		tester = new TesterCore();

	tester.testThat('something', function() {
		testPassed = true;
	});

	if(!testPassed) {
		fail();
	}
});

testThat('beforeEach should be run before each test', function() {
	var step = 1,
		steps = '',
		tester = new TesterCore();
	tester.beforeEach(function() {
		steps += step.toString();
		step++;
	});

	['a', 'b', 'c'].forEach(function(letter) {
		tester.testThat('something', function() {
			steps += letter;
		});
	});
	
	if(steps !== '1a2b3c') {
		fail();
	}
});

var tester;

beforeEach(function() {
	tester = new TesterCore();
});

testThat('assertThat should pass if assertion is true', function() {
	var testPassed = false;

	tester.testThat('something', function() {
		assertThat(true, isTrue);
		testPassed = true;
	});

	if(!testPassed) {
		fail();
	}
});

testThat('assertThat should fail test if assertion failed', function() {
	var testFailed = false;

	tester.testThat('something', function() {
		assertThat(false, isTrue);
		testFailed = true;
	});

	if(testFailed) {
		fail();
	}
});

testThat('testThat should be true if nothing fails', function() {
	assertThat(
		tester.testThat('something', function() {}).passed,
		isTrue
	);
});

testThat('testThat should be false if something fails', function() {
	assertThat(
		tester.testThat('something', fail).passed,
		isFalse
	);
});

testThat('describe should run the tests it contains', function() {
	var numberOfRunTests = 0;

	tester.describe('a feature', function() {
		tester.testThat('a 1st test', function() {
			numberOfRunTests++;
		});

		tester.testThat('a 2nd test', function() {
			numberOfRunTests++;
		})
	});

	assertThat(numberOfRunTests, equals(2));
});

testThat('describe should reset the beforeEach function after it is done', function() {
	var steps = '';

	tester.beforeEach(function() {
		steps += 'a';
	});

	tester.testThat('', function() {});

	tester.describe('b', function() {
		tester.beforeEach(function() {
			steps += 'b';
		});
	});

	tester.testThat('', function() {});

	assertThat(steps, equals('aa'));
});

testThat('describe should call the previous beforeEach function before its own', function() {
	var steps = '';

	tester.beforeEach(function() {
		steps += 'a';
	});

	tester.testThat('', function() {});

	tester.describe('b', function() {
		tester.beforeEach(function() {
			steps += 'b';
		});

		tester.testThat('', function() {});
	});

	tester.testThat('', function() {});

	assertThat(steps, equals('aaba'));
});

testThat('testThat should return the name of the test', function() {
	assertThat(
		tester.testThat('the name of the test', function() {}).name,
		equals('the name of the test'));

	assertThat(
		tester.testThat('the name of the test', function() { fail(); }).name,
		equals('the name of the test'));
});