require('../testing-lib.js');

const FakeLogger =  require('./FakeLogger.js')
	TesterFactory = require('../src/TesterFactory.js');

var tester, logger;

beforeEach(function() {
	logger = new FakeLogger();
	tester = TesterFactory.createLoggingTester({logger: logger});
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