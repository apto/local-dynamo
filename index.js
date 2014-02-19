var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

var DYNAMO_JAR = 'DynamoDBLocal.jar';
var DYNAMO_DIR = path.resolve(__dirname, './dynamo');

function optsToArgs(opts) {
  if (typeof opts === 'Array') return opts;

  var args = [];
  Object.keys(opts).forEach(function (key) {
    args.push(key);
    args.push(opts[key]);
  });
  return args;
}

module.exports = function startDynamo(options) {
  options = options || {};

  var args = ['-Djava.library.path=./DynamoDBLocal_lib/', '-jar', DYNAMO_JAR];
  args = args.concat(optsToArgs(options));

  var child = spawn('java', args, {cwd: DYNAMO_DIR});
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  process.on('exit', function () {
    child.kill();
  });

  return child;
};