'use strict';

var Disqueue = require( './disqueue-client' );

function ResponderClient ( port, host, options ) {

	this.disqueue = new Disqueue( port, host, options );

	return this.disqueue
		.then( function ( disqueueClient ) {

			this.disqueueClient = disqueueClient;
			return this;

		}.bind( this ) );

}

module.exports = ResponderClient;
