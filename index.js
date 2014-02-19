var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var net = require('net');

var DYNAMO_JAR = 'DynamoDBLocal.jar';
var DYNAMO_DIR = path.resolve(__dirname, './dynamo');

function optsToArgs(opts) {
  if (typeof opts === 'Array') return opts;

  var args = [];
  Object.keys(opts).forEach(function (key) {
    args.push("--" + key);
    args.push(opts[key]);
  });
  return args;
}

module.exports = function startDynamo(options, cb) {
  options = options || {};
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var args = ['-Djava.library.path=./DynamoDBLocal_lib/', '-jar', DYNAMO_JAR];
  args = args.concat(optsToArgs(options));

  var child = spawn('java', args, {cwd: DYNAMO_DIR});
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  process.on('exit', function () {
    child.kill();
  });

  var tryConnect = function (cb) {
    var client = net.connect({port: options.port || 8000}, cb);

    client.on('error', function (err) {
      setTimeout(function () {
        tryConnect(cb);
      }, 10);
    });
  };

  if (typeof cb === 'function') {
    tryConnect(cb);
  }

  return child;
};