# disqueue-node client
[![Build Status](https://travis-ci.org/gideonairex/disqueue-node.svg?branch=master)](https://travis-ci.org/gideonairex/disqueue-node)[![Dependency Status](https://david-dm.org/gideonairex/disqueue-node.svg)](https://david-dm.org/gideonairex/disqueue-node)[![Code Climate](https://codeclimate.com/github/gideonairex/disqueue-node/badges/gpa.svg)](https://codeclimate.com/github/gideonairex/disqueue-node)[![Stories in Ready](https://badge.waffle.io/gideonairex/disqueue-node.png?label=ready&title=Ready)](https://waffle.io/gideonairex/disqueue-node)

This is a Disqueue client using node.js.

## Setup
Install [Disque](https://github.com/antirez/disque)

## How to use
Connect to disqueue then you can use the connected disqueue( [examples](https://github.com/gideonairex/disqueue-node/tree/master/example) )

## Options
```javascript
var options = {
 'host' : <host>, // defaults to '127.0.0.1'
 'port' : <port>, // defaults to 7777
 'auth' : {
  'password' : 'gideonairex'
 },
 'retryMax'   : <count>, // defaults to 5
 'retryCount' : <ms>     // defaults to 200 ms
};

var disqueue = new Disqueue( options );
```

## API

__ACKJOB__
```javascript
disqueue.ackJob( <ARRAY of IDS|STRING of the ID>, callback );
```

__ADDJOB__
```javascript
disqueue.addJob( {
 'queue'     : <queue>,
 'job'       : <job>,
 'timeout'   : <ms-seconds>, // optional defaults to 0
 'replicate' : <count>,      // optional
 'delay'     : <seconds>,    // optional
 'retry'     : <seconds>,    // optional
 'ttl'       : <seconds>,    // optional
 'maxlen'    : <count>,      // optional
 'async'     : <true>        // optional defaults to false
}, callback )
```

__AUTH__
```javascript
disqueue.auth( {
	'password' : <password>
}. callback );
```

__DEL__
```javascript
disqueue.delJob( <ARRAY of IDS|STRING of the ID>, callback );
```

__DEQUEUE__
```javascript
disqueue.dequeue( <ARRAY of IDS|STRING of the ID>, callback );
```

__ENQUEUE__
```javascript
disqueue.enqueue( <ARRAY of IDS|STRING of the ID>, callback );
```

__FASTACK__
```javascript
disqueue.fastAck( <ARRAY of IDS|STRING of the ID>, callback );
```

__GETJOB__
```javascript
disqueue.getJob( {
 'queue'        : <queue>, // can be a string or an array of queues
 'count'        : <count>,
 'withcounters' : <true>,  // optional defaults to false
 'nohang'       : <true>   // optional defaults to false
}, callback )
```

__HELLO__
```javascript
disqueue.hello( {}, callback );
```

__INFO__
```javascript
disqueue.info( {}, callback );
```

__NACK__
```javascript
disqueue.nack( <ARRAY of IDS|STRING of the ID>, callback );
```

__QLEN__
```javascript
disqueue.qlen( <queue-name>, callback );
```

__SHOW__
```javascript
disqueue.show( <job-id>, callback );
```

__WORKING__
```javascript
disqueue.working( <job-id>, callback );
```

## Authentication
To connect to disque just add password
```javascript
var options = {
 'auth' : {
  'password' : 'gideonairex'
 }
};
var disqueue = new Disqueue( options );

diqueue.on( 'connected', function () {} );
```
Or you just add options and use the default port and host
```javascript
var options = {
 'host' : '127.0.0.1',
 'port' : 7777,
 'auth' : {
  'password' : 'gideonairex'
 }
};
var disqueue = new Disqueue( options );

diqueue.on( 'connected', function () {} );
```

## Usage
```javascript
var Disqueue = require( 'disqueue-node' );
var disqueue = new Disqueue();
diqueue.on( 'connected', function () {
 disqueue.addJob( {
  'queue' : 'test',
  'job'   : 'hello world'
 }, function ( error, addJobResult ) {
 } );
} );
```

## Test
```
npm test
npm run lint
```

## Todo
1. Complete all commands
2. Benchmark
