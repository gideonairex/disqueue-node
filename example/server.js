'use strict';

var Disqueue = require( '../lib' );

new Disqueue( 7711, 'localhost', {
	'auth' : {
		'password' : 'gideonairex'
	}
} )
	.then( function ( disqueue ) {

		disqueue.registerListeners( [ 'v1.users.get', 'v1.users.save', 'v1.users.list' ] );

		disqueue.respond( 'v1.users.save', function ( message, send ) {

			return disqueue.request( 'v1.users.list', 'HI', 0 )
				.then( function ( d ) {
					send( null, message + ' Gideonairex' + d );
				} );

		} );

		disqueue.respond( 'v1.users.get', function ( message, send ) {

			setTimeout( function () {
				send( null, message );
			}, Math.random() * 1000 );

		} );

		disqueue.respond( 'v1.users.list', function ( message, send ) {

			setTimeout( function () {
				send( null, message + ' and BYE' );
			}, Math.random() * 1000 );

		} );

	} );
