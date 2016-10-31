require('../testing-lib.js');

describe('Assertion', function() {

	describe('fail', function() {
		testThat('it should fail', function() {
			try {
				fail();
				throw '';
			} catch (e) {
				if(!(e instanceof FailException)) {
					throw new FailException();
				}
			}
		});
	});

	describe('isTrue', function() {
		testThat('it should pass if value is true', function() {
			isTrue(true);
		});

		testThat('it should fail if value is false', function() {
			try {
				isTrue(false);
				fail();
			} catch (e) {
				if(!(e instanceof TrueException)) {
					fail();
				}
			}
		});
	});

	describe('isFalse', function() {
		testThat('it should pass if value is false', function() {
			isFalse(false);
		});

		testThat('it should fail if value is true', function() {
			try {
				isFalse(true);
				fail();
			} catch (e) {
				if(!(e instanceof FalseException)) {
					fail();
				}
			}
		});
	});
});