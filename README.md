# disqueue-node client
[![Build Status](https://travis-ci.org/gideonairex/disqueue-node.svg?branch=master)](https://travis-ci.org/gideonairex/disqueue-node)[![Dependency Status](https://david-dm.org/gideonairex/disqueue-node.svg)](https://david-dm.org/gideonairex/disqueue-node)[![Code Climate](https://codeclimate.com/github/gideonairex/disqueue-node/badges/gpa.svg)](https://codeclimate.com/github/gideonairex/disqueue-node)[![Stories in Ready](https://badge.waffle.io/gideonairex/disqueue-node.png?label=ready&title=Ready)](https://waffle.io/gideonairex/disqueue-node)

This is a Disqueue client using node.js.

## Setup
Install [Disque](https://github.com/antirez/disque)

## How to use
Connect to disqueue then you can use the connected disqueue( [examples](https://github.com/gideonairex/disqueue-node/tree/master/example) )

## API
__ADDJOB__
```javascript
disqueue.addJob( {
 'queue', <queue>,
 'job' : <job>,
 'timeout' : 10
}, callback )
```
__GETJOB__
```javascript
disqueue.getJob( {
 'queue', <queue>,
 'count' : <count>
}, callback )
```
__FASTACK__
```javascript
disqueue.fastAck( <ARRAY of IDS|STRING of the ID>, callback );
```
__ACKJOB__
```javascript
disqueue.ackJob( <ARRAY of IDS|STRING of the ID>, callback );
```


## Authentication
To connect to disque just add password
```javascript
'use strict';

var options = {
 'auth' : {
  'password' : 'gideonairex'
 }
};

var disqueue = new Disqueue( options );

diqueue.on( 'connected', function () {
} );

```
Or you just add options and use the default port and host
```javascript
'use strict';

var options = {
 'host' : '127.0.0.1',
 'port' : 7777,
 'auth' : {
  'password' : 'gideonairex'
 }
};

var disqueue = new Disqueue( options );

diqueue.on( 'connected', function () {
} );
```

## Usage
```javascript
'use strict'

var Disqueue = require( 'disqueue-node' );
var disqueue = new Disqueue();
diqueue.on( 'connected', function () {
 disqueue.addJob( {
  'queue' : 'test',
  'job' : 'hello world'
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
