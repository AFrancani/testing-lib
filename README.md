# testing-lib
This lib is a minimal testing lib which has been developed as an exercice. It has been developed in a TDD fashion, using the lib itself to test its new features.

## Installation
```shell
npm install
```

## Run the tests
```shell
npm test
```

## Test your own features
```javascript
require('./testing-lib.js');

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