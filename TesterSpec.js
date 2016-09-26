const Assertion = require('./Assertion.js'),
	Tester = require('./LoggingTester.js'),
	FakeLogger =  require('./FakeLogger.js');

const t = new Tester(console),
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

testThat('fail should fail', function() {
	try {
		fail();
		throw '';
	} catch (e) {
		if(!(e instanceof FailException)) {
			throw new FailException();
		}
	}
});

testThat('isTrue should pass if value is true', function() {
	isTrue(true);
});

testThat('isTrue should fail if value is false', function() {
	try {
		isTrue(false);
		fail();
	} catch (e) {
		if(!(e instanceof TrueException)) {
			fail();
		}
	}
});

testThat('testThat should pass if nothing fails', function() {
	var testPassed = false,
		tester = new Tester(new FakeLogger());

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
		tester = new Tester(new FakeLogger());
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
	tester = new Tester(logger);
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

testThat('isFalse should pass if value is false', function() {
	isFalse(false);
});

testThat('isFalse should fail if value is true', function() {
	try {
		isFalse(true);
		fail();
	} catch (e) {
		if(!(e instanceof Assertion.FalseException)) {
			fail();
		}
	}
});

testThat('testThat should be false if something fails', function() {
	assertThat(
		tester.testThat('something', fail),
		isFalse
	);
});

var colors = require('colors');

testThat('testThat should log when test pass', function() {
	tester.testThat('some test', function() {});

	assertThat(logger.logged('some test' + ' passed!'.green), isTrue);
});

testThat('testThat should log when test fails', function() {
	tester.testThat('some test', fail);

	assertThat(logger.logged('some test' + ' failed!'.red), isTrue);
});

testThat('testThat should log when fail assertion fails', function() {
	tester.testThat('some test', fail);

	assertThat(logger.logged('  Test failed!'), isTrue);
});

testThat('testThat should log when true assertion fails', function() {
	tester.testThat('some test', function() {
		isTrue(false);
	});

	assertThat(logger.logged('  Given value is not true!'), isTrue);
});

testThat('testThat should log when false assertion fails', function() {
	tester.testThat('some test', function() {
		isFalse(true);
	});

	assertThat(logger.logged('  Given value is not false!'), isTrue);
});

testThat('testThat should log when equals assertion fails', function() {
	tester.testThat('some test', function() {
		equals('some text')(42);
	});

	assertThat(logger.logged('  42 does not equal some text'), isTrue);
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

testThat('describe should log the feature it describes', function() {
	tester.describe('a feature', function() {
		tester.testThat('some test', function() {});
	});

	assertThat(logger.logged('a feature'.bold), isTrue);
});

testThat('describe should add some space for the logger', function() {
	tester.describe('a feature', function() {
		tester.testThat('some test', function() {});
	});

	assertThat(logger.logged('  some test' + ' passed!'.green), isTrue);
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