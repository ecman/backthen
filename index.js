var util = require('util');

module.exports = backthen;

function backthen() {
  var args = arguments;
  var what = Array.prototype.splice.call(args, 0, 2);
  return new Promise(function (ful, rej) {
    Array.prototype.push.call(args,
      function () {
        if (util.isError(arguments[0])) {
          return rej(err);
        }
        Array.prototype.splice.call(arguments, 0, 1);
        var len = arguments.length;
        switch (len) {
          case 0:
            return ful();
          case 1:
            return ful(arguments[0]);
          default:
            return ful(Array.apply(null, arguments));
        }
      }
    );
    return what[0].apply(what[1], args);
  });
}
