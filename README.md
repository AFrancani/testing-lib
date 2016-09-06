# testing-lib
This lib is a minimal testing lib which has been developed as an exercice. It has been developed in a TDD fashion, using the lib itself to test its new features.

## Installation
```shell
npm install
```

## Run the tests
```shell
node TesterSpec.js
```

## Test your own features
```javascript
const Assertion = require('./Assertion.js'),
	Tester = require('./Tester.js');

// create the Tester and expose its methods
const t = new Tester(console),
	testThat = t.testThat,
	beforeEach = t.beforeEach,
	describe = t.describe;

// expose the Assertion functions
const fail = Assertion.fail,
	isTrue = Assertion.isTrue,
	assertThat = Assertion.assertThat,
	isFalse = Assertion.isFalse,
	equals = Assertion.equals;

// import your code
const MyAwesomeFeature = require(...);

describe('my awesome feature', function() {

	var myAwesomeFeature;

	// gets run before each test
	beforeEach(function() {
		myAwesomeFeature = new MyAwesomeFeature();
	});

	// creates a test
	testThat('it should be awesome', function() {
		assertThat(myAwesomeFeature.isAwesome(), isTrue);
	});
});
```