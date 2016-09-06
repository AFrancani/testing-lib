module.exports = function(logger) {
	var colors = require('colors');

	var beforeEachFunction = function() {};
	var prefixe = '';

	function beforeEach(functionToRun) {
		beforeEachFunction = functionToRun;
	}

	function addPrefixeSize(value) {
		var size = prefixe.length + value;
		prefixe = '';
		for(var i = 0; i < size; i++) {
			prefixe += ' ';
		}
	}

	function log(message) {
		logger.log(prefixe + message);
	}

	function testThat(name, functionToTest) {
		try {
			beforeEachFunction();
			functionToTest();
			log(name + ' passed!'.green);
			return true;
		} catch (e) {
			log(name + ' failed!'.red);
			log('  ' + e.message);
		}
	}

	function describe(name, functionContainingTests) {
		var previousBeforeEach = beforeEachFunction;
		log(' ');
		log(name.bold);
		addPrefixeSize(2);
		functionContainingTests();
		addPrefixeSize(-2);
		log(' ');
		beforeEachFunction = previousBeforeEach;
	}

	return {
		beforeEach: beforeEach,
		testThat: testThat,
		describe: describe
	};

}