require('../testing-lib.js');

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

testThat('isFalse should pass if value is false', function() {
	isFalse(false);
});

testThat('isFalse should fail if value is true', function() {
	try {
		isFalse(true);
		fail();
	} catch (e) {
		if(!(e instanceof FalseException)) {
			fail();
		}
	}
});