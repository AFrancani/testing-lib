const Assertion = require('./Assertion.js'),
	LoggingTester = require('./LoggingTester.js'),
	FakeLogger =  require('./FakeLogger.js');

const t = new LoggingTester(console),
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
		tester = new LoggingTester(new FakeLogger());

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
		tester = new LoggingTester(new FakeLogger());
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

var tester, logger;

beforeEach(function() {
	logger = new FakeLogger();
	tester = new LoggingTester(logger);
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
		tester.testThat('something', function() {}),
		isTrue
	);
});

testThat('testThat should be false if something fails', function() {
	assertThat(
		tester.testThat('something', fail),
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