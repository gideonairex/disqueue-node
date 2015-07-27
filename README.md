# disqueue-node client
[![Build Status](https://travis-ci.org/gideonairex/disqueue-node.svg?branch=master)](https://travis-ci.org/gideonairex/disqueue-node)[![Dependency Status](https://david-dm.org/gideonairex/disqueue-node.svg)](https://david-dm.org/gideonairex/disqueue-node)[![Code Climate](https://codeclimate.com/github/gideonairex/disqueue-node/badges/gpa.svg)](https://codeclimate.com/github/gideonairex/disqueue-node)

This is a Disqueue client using node.js. This can handle **RPC**.

## Setup
Install [Disque](https://github.com/antirez/disque)

## How to use
Connect to disqueue then you can use the connected disqueue( [examples](https://github.com/gideonairex/disqueue-node/tree/master/example) )

## API
* ```disqueue.request( <queue>, <job>, <timeout> )``` - This returns a Promise object. [bluebird](https://github.com/petkaantonov/bluebird)
* ```disqueue.respond( <queue>, <cb> )```
  * ```<queue>``` - queue to respond to.
  * ```<cb>``` - callback contains ```(<message>,<send>)```
    * ```<message>``` - message from the requester.
    * ```<send>``` - send object that returns for error or result.
      * ```send( null, result )```

## Authentication
To connect to disque just add password
```javascript
'use strict';

var options = {
 'auth' : {
  'password' : 'gideonairex'
 }
};

new Disqueue( 7711, 'localhost', options )
  .then( function( disqueue ) {
   // Do something
  } )

```
Or you just add options and use the default port and host
```javascript
'use strict';

var options = {
 'auth' : {
  'password' : 'gideonairex'
 }
};

new Disqueue( options )
  .then( function( disqueue ) {
   // Do something
  } )

```

## Client
```javascript
'use strict'

var Disqueue = require( 'disqueue-node' );

new Disqueue( 7711, 'localhost' )
  .then( function( disqueue ) {

    disqueue.request( 'job', 'Job 1 request', <timeout> )
      .then( function( jobResult ) {
        // Do something
      } )
      .catch( function( jobError ) {
        // Do some error handling
      } )

    disqueue.request( 'job2', 'Job 2 request', <timeout> )
      .then( function( jobResult ) {
        // Do something
      } )
      .catch( function( jobError ) {
        // Do some error handling
      } )

  } )
  .catch( function( error ) {
  } );
```

## Server

```javascript
'use strict'

var Disqueue = require( 'disqueue-node' );

new Disqueue( 7711, 'localhost' )
  .then( function( disqueue ) {

    disqueue.respond( 'job', function ( message, send ) {
      send( null, 'Hello world' );
    } );

    // You can also request inside the respond
     disqueue.respond( 'job2', function ( message, send ) {

      disqueue.request( 'job', 'Nested job', 0 )
        .then( function ( jobResult ) {
          send( null, 'Hello world' );
        } );

    } );

  } )
```
## Test
```
npm test
npm run lint
```

## Todo
1. Add an option to just use 1 tcp and use NOHANGUP
2. Benchmark
