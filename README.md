# backthen

[![build status](https://api.travis-ci.org/ecman/backthen.png)](https://travis-ci.org/ecman/backthen) [![codecov](https://codecov.io/gh/ecman/backthen/branch/master/graph/badge.svg)](https://codecov.io/gh/ecman/backthen) [![Code Climate](https://codeclimate.com/github/ecman/backthen/badges/gpa.svg)](https://codeclimate.com/github/ecman/backthen)

Run a callback as a thenable

# Usage

```js
var backthen = require('backthen');
var fs = require('fs');

/*
 * @param {function} func - function to call
 * @param {object} scope - scope for func
 * @param {...any} params - parameters for the function
 *
 * @return {Promise} 
 */
backthen(fs.stat, null, 'file.txt')
  .then(statFulfilled)
  .catch(statRejected)

// Receives array if callback
// invoked with multiple params;
// otherwise a single value
function statFulfilled(stat) {
  // handle the fulfillment
}

function statRejected(err) {
  // handle the rejection
}
```
