function EqualsException(something, somethingElse) {
	this.message = something + ' does not equal ' + somethingElse;
}

function FailException() {
	this.message = 'Test failed!';
}

function TrueException() {
	this.message = 'Given value is not true!';
}

function FalseException() {
	this.message = 'Given value is not false!';
}

module.exports = {
	fail: function() {
		throw new FailException();
	},
	isTrue: function (value) {
		if(!value) {
			throw new TrueException();
		}
	},
	isFalse: function(value) {
		if(value) {
			throw new FalseException();
		}
	},
	equals: function(somethingElse) {
		return function(something) {
			if (something !== somethingElse)
				throw new EqualsException(something, somethingElse);
		}
	},
	assertThat: function(something, assertion) {
		return assertion(something);
	},
	EqualsException: EqualsException,
	FailException: FailException,
	TrueException: TrueException,
	FalseException: FalseException
}