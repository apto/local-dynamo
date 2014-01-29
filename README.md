# dynamo-local

Local dynamodb instance that you can start and stop via node.
For use in development with node programs that use dynamodb.

## Installation

```shell
npm install -g dynamo-local
```

## Usage

### Command Line

```shell
dynamo-local start [--port=8000] [--dbPath=.] [--inMemory]
```

Options are passed directly to the dynamodb java program.  Available
options include:

* --port - defaults to 8000
* --dbPath - directory where dynamodb will write its database sqlite file.  Defaults to current directory.
* --inMemory - run in memory.  No data will be saved.

### From Node.js Program

```js
var dynamoLocal = require('dynamo-local');
var options = { port: 8000 };
dynamoLocal({port: 8000, dbPath: '.'}, function (err) { /* ... */ });
```

Options are passed as command line arguments to the local dynamodb Java program.
See 'Command Line' section above for available options.

Dynamo is started as a child process and dies when the parent
process dies.
