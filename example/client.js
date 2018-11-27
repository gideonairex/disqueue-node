'use strict';

var http = require( 'http' );
var Disqueue = require( '../lib/disqueue-client' );

var disque = new Disqueue( {
	//'auth' : {
		//'password' : 'gideonairex'
	//}
	'retryMax'   : 5,
	'retryDelay' : 2000
} );

disque.on( 'error', function ( error ) {
	console.log( error );
} );

disque.on( 'connected', function () {
	console.log( 'connected' );
} );

var server = http.createServer( function ( request, reply ) {
	disque.addJob( {
		'queue' : 'test',
		'job'   : 'Hello world',
		'delay' : 2,
		'ttl'   : 3
	}, function ( error, data ) {

		console.log( error );
		reply.end( data );

	} );

} );

server.listen( 9991 );
