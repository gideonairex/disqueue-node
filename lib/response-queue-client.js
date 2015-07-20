'use strict';

var uuid     = require( 'node-uuid' );
var Disqueue = require( './disqueue-client' );

function ResponseQueueClient ( port, host, options ) {

	this.replyQueue = [ 'response:queue:', uuid.v4() ].join( '' );

	this.disqueue = new Disqueue( port, host, options );

	return this.disqueue
		.then( function ( disqueueClient ) {

			this.disqueueClient = disqueueClient;
			return this;

		}.bind( this ) );

}

module.exports = ResponseQueueClient;
