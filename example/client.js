'use strict';

var Disqueue = require( '../lib' );

new Disqueue( 7711, 'localhost', {
	'auth' : {
		'password' : 'gideonairex'
	}
} )
	.then( function ( disqueue ) {

		process.stdin.on( 'data', function () {

			disqueue.request( 'v1.users.get', 'HELLO ', 0 )
				.then( function ( user ) {

					return user;

				} )
				.then( function ( user ) {

					return disqueue.request( 'v1.users.save', user, 0 );

				} )
				.then( function ( result ) {
					console.log( result );
				} )
				.catch( function ( error ) {

					console.log( error.message );

				} );

			disqueue.request( 'v1.users.get', 'YAmii', 0 )
				.then( function ( yami ) {
					console.log( yami );
				} );

		} );

	} );
