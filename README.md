# backthen

Run a callback as a thenable

# Usage

```js
var backthen = require('backthen');
var fs = require('fs');

/*
 * @param {function} func - function to call
 * @param {object} scope - optional scope
 * @param {...any} params - parameters for the function
 *
 * @return {Promise} 
 */
backthen(fs.stat, null, 'file.txt')
  .then(statFulfilled)
  .catch(statRejected)

// Fulfillment receives array if callback
// invokes with multiple params;
// otherwise a single value
function statFulfilled(stat) {
  // handle the stat
}

// 
function statRejected(err) {
  // handle the error
}
```
