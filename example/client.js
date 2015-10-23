'use strict';

var http = require( 'http' );
var Disqueue = require( '../lib/disqueue-client' );

var disque = new Disqueue( {
	//'auth' : {
		//'password' : 'gideonairex'
	//}
} );

disque.on( 'error', function ( error ) {
	console.log( error );
} );

disque.on( 'connected', function () {

	var server = http.createServer( function ( request, reply ) {

		disque.addJob( {
			'queue' : 'test',
			'job'   : 'Hello world'
		}, function ( error, data ) {

			reply.end( data );

		} );

	} );

	server.listen( 9991 );

} );
