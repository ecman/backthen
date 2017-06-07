var backthen = require('../');
var assert = require('assert');
var fs = require('fs');
var util = require('util');

var scoped = {
  'cb': function (weekday, meridian, callback) {
    if (typeof(weekday) !== 'string' ||
        typeof(meridian) !== 'string')
      return callback(new TypeError(
        'weekday and meridian must be strings'));
    return callback(null, weekday, meridian);
  }
};

function basicCallback(callback) {
  callback(null);
}

process.on('unhandledRejection', function (err, promise) {
  throw err;
});

backthen(fs.stat, null, __filename)
  .then(function (stat) {
    assert.strictEqual(
      true, stat instanceof fs.Stats,
      'fs.stat() should have given a stat');
    console.log('then() OK');
  });

backthen(fs.stat, null, new String(Math.random()))
  .then(function (stat) {
    assert.fail(stat, null, 
      'fs.stat() should have rejected');
  })
  .catch(function (err) {
    assert.strictEqual(
      util.isError(err), true,
      'fs.stat() should have given an error');
    console.log('catch() OK');
  });

backthen(scoped.cb, scoped, 'sunday', 'anti') 
  .then(function (results) {
    assert.strictEqual(
      true, Array.isArray(results),
      'results should be an array');
    assert.strictEqual(
      results.join(' '), ['sunday', 'anti'].join(' '),
      'scoped callback should have fulfilled'
      + ' with an array');
    console.log('fulfill with array OK');
  })
  .catch(function (err) {
    console.log('err:', err.message, err.stack);
    process.exit(1);
  });
  
backthen(scoped.cb, scoped, null, null)
  .then(function (results) {
    assert.fail(results.length, null, 
      'Rejections should give an error');
  })
  .catch(function (err) {
    assert.strictEqual(util.isError(err), true,
      'Rejections should give an error');
    assert.strictEqual(err instanceof TypeError, true,
      'scoped callback jejections should have a TypeError');
    console.log('reject with error OK');
  });

backthen(basicCallback, null)
  .then(function (results) {
    assert.strictEqual(
      results, undefined, 'A callback invocation with'
        + ' no args should have no results');
  });
