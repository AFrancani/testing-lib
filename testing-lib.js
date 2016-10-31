const Assertion = require('./Assertion.js'),
	TesterFactory = require('./TesterFactory.js');

const t = TesterFactory.createLoggingTester();

function expose(obj, elements) {
	elements.forEach(elem => global[elem] = obj[elem]);
}

expose(t, ['testThat', 'beforeEach', 'describe']);
expose(Assertion, ['fail', 'FailException', 'isTrue', 'TrueException', 'assertThat', 'isFalse', 'equals', 'FalseException', 'EqualsException'])