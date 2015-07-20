'use strict';

var Disqueue = require( '../lib' );
var colors   = require( 'colors' );

new Disqueue()
	.then( function( disqueue ) {

		process.stdin.on( 'data', function () {

			for ( var i = 0 ; i< 10; i++ ) {

				disqueue.request( 'v1.users.get', 'HELLO ' + i, 0 )
					.then( function ( user ) {

						return user;

					} )
					.then( function ( user ) {

						return disqueue.request( 'v1.users.save', user, 0 );

					} )
					.then( function( result ) {
						console.log( result );
					} )
					.catch( function ( error ) {

						console.log( error.message );

					} );

				disqueue.request( 'v1.users.get', 'YAmii' + i , 0 )
					.then( function( yami ) {
						console.log( yami );
					} );

			}

		} );

	} );
