require('../testing-lib.js');

describe('Logging tester', function() {
	const FakeLogger =  require('./FakeLogger.js')
		TesterFactory = require('../src/TesterFactory.js');
		colors = require('colors');

	var tester, logger;

	beforeEach(function() {
		logger = new FakeLogger();
		tester = TesterFactory.createLoggingTester({logger: logger});
	});

	describe('testThat', function() {
		testThat('it should log when test pass', function() {
			tester.testThat('some test', function() {});

			assertThat(logger.logged('V'.green + ' some test'), isTrue);
		});

		testThat('it should log when test fails', function() {
			tester.testThat('some test', fail);

			assertThat(logger.logged('X'.red + ' some test'), isTrue);
		});

		testThat('it should log when fail assertion fails', function() {
			tester.testThat('some test', fail);

			assertThat(logger.logged('  Test failed!'), isTrue);
		});

		testThat('it should log when true assertion fails', function() {
			tester.testThat('some test', function() {
				isTrue(false);
			});

			assertThat(logger.logged('  Given value is not true!'), isTrue);
		});

		testThat('it should log when false assertion fails', function() {
			tester.testThat('some test', function() {
				isFalse(true);
			});

			assertThat(logger.logged('  Given value is not false!'), isTrue);
		});

		testThat('it should log when equals assertion fails', function() {
			tester.testThat('some test', function() {
				equals('some text')(42);
			});

			assertThat(logger.logged('  42 does not equal some text'), isTrue);
		});
	});

	describe('describe', function() {
		testThat('it should log the feature it describes', function() {
			tester.describe('a feature', function() {
				tester.testThat('some test', function() {});
			});

			assertThat(logger.logged('a feature'.bold), isTrue);
		});

		testThat('it should add some space for the logger', function() {
			tester.describe('a feature', function() {
				tester.testThat('some test', function() {});
			});

			assertThat(logger.logged('  ' + 'V'.green + ' some test'), isTrue);
		});

		testThat('it should log the number of passed tests', function() {
			tester.describe('a feature', function() {
				tester.testThat('a test', function() {});
				tester.testThat('a second test', function() {});
				tester.testThat('a third test', function() {});
			});

			assertThat(logger.logged('  ' + '3 passing'.green), isTrue);
		});

		testThat('it should log the number of failed tests', function() {
			tester.describe('a feature', function() {
				tester.testThat('a test', fail);
				tester.testThat('a second test', fail);
			});

			assertThat(logger.logged('  ' + '2 failing'.red), isTrue);
		});
	});
});