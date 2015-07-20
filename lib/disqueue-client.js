'use strict';

var hiredis      = require( 'hiredis' );
var Promise      = require( 'bluebird' );
var colors       = require( 'colors' );
var EventEmitter = require( 'events' ).EventEmitter;
var util         = require( 'util' );
var _            = require( 'lodash' );
var Queue        = require( './operations-queue' );

function DisqueueNode( port, host, options ) {

	this.operationsQueue = new Queue( options.name );

	var maxTries   = 5;
	var retryDelay = 2000;

	port = port || 7711;
	host = host || 'localhost';

	return new Promise( function ( resolve, reject ) {

		var tries = 1;

		function createConnection( disqueueNode ) {

			disqueueNode.client = hiredis.createConnection( port, host );

			disqueueNode.client.on( 'connect', function () {

				console.log( [ colors.green( 'Connected to disqueue.' ),
										colors.blue( '\n  host:' ), host,
										colors.blue( '\n  port:' ), port ].join( ' ' ) );

				// Reset tries every time its connected.
				tries = 1;
				resolve( disqueueNode );

			} );

			disqueueNode.client.on( 'reply', function ( data ) {

				if ( data instanceof Error ) {
					disqueueNode.operationsQueue.dequeue( data );
				} else {
					disqueueNode.operationsQueue.dequeue( null, data );
				}

			} );

			disqueueNode.client.on( 'error', function ( error ) {
				console.log( [ colors.red( 'ERROR:' ), '\n ',error.message ].join( ' ' ) );
				reject( error );
			} );

			disqueueNode.client.on( 'close', function () {

				console.log( [ colors.red( 'CLOSE:' ), '\n  disqueue suddenly disconnected' ].join( ' ' ) );

				// Try to reconnect
				if ( tries <= maxTries ) {

					console.log( [ 'Reconnecting for', tries, 'time....' ].join( ' ' ) );

					setTimeout( function() {
						createConnection( disqueueNode );
						++tries;
					}, retryDelay );

				}

				reject( new Error ( 'Connection closed' ) );

			} );

		}

		// Create connection
		createConnection( this );

	}.bind( this ) );

}

util.inherits( DisqueueNode, EventEmitter );

DisqueueNode.prototype.addJob = function ( queue, job, timeout, cb ) {

	this.operationsQueue.enqueue( [ 'ADDJOB', queue, job, timeout ].join( ' ' ), cb );
	this.client.write.apply( this.client, [ 'ADDJOB', queue, job, timeout ] );

};

DisqueueNode.prototype.getJob = function ( queue, cb ) {

	var command = [ 'GETJOB', 'COUNT', 10, 'FROM' ];

	if ( typeof queue === 'string' ) {
		command.push( queue );
	} else {
		command = command.concat( queue );
	}

	this.operationsQueue.enqueue( command.join( ' ' ), cb );

	this.client.write.apply( this.client, command );

};

DisqueueNode.prototype.ackJob = function ( jobsIds, cb ) {

	var command = [ 'FASTACK' ];
	command = command.concat( jobsIds );
	this.operationsQueue.enqueue( command.join( ' ' ), cb );
	this.client.write.apply( this.client, command );

};

DisqueueNode.prototype.createQueue = function ( requestClient, replyQueue ) {

	function createJobEmitter( disqueue, requester, bindQueue ) {

		disqueue.getJob( bindQueue, function( error, message ) {

			var jobsIds = [];

			_( message ).forEach( function( job ) {

				var event = job[ 0 ];
				jobsIds.push( job[ 1 ] );
				var body  = JSON.parse( job[ 2 ] );

				disqueue.emit( event, body.body, function( error, emitMessage ) {

					/*
					 * TODO:
					 * Handle errors
					 */
					var wrapMessage = {
						'error'     : error && error.message,
						'body'      : emitMessage,
						'messageId' : body.messageId
					};

					requester.addJob( body.replyQueue, JSON.stringify( wrapMessage ), 1, function ( addJobError, addJobResponse ) {} );

				} );

			} ).value();

			requester.ackJob( jobsIds, function() { } );
			createJobEmitter( disqueue, requester, bindQueue );

		} );

	}

	createJobEmitter( this, requestClient, replyQueue );

};

DisqueueNode.prototype.createReplyQueue = function ( requesterClient, replyQueue ) {

	function createJobEmitter( disqueue, requester, bindQueue ) {

		disqueue.getJob( bindQueue, function( error, message ) {

			var jobsIds = [];

			_( message ).forEach( function( job ) {

				jobsIds.push( job[ 1 ] );
				var body  = JSON.parse( job[ 2 ] );

				/* Todo
				 * Handle errors
				 */
				// Emit handler
				disqueue.emit( body.messageId, body.error, body.body );
				requester.ackJob( jobsIds, function() { } );

			} ).value();

			// Acknowledge
			createJobEmitter( disqueue, requester, bindQueue );

		} );

	}

	createJobEmitter( this, requesterClient, replyQueue );

};
module.exports = DisqueueNode;
