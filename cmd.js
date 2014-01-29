#!/usr/bin/env node

var dynamoLocal = require('./index');
var args = process.argv.slice(2);

var options = {};
for (var i = 0; i < args.length; i += 2) {
  options[args[i]] = args[i + 1];
}

dynamoLocal(options);
