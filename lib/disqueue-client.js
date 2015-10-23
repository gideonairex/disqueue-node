'use strict';

/*eslint-disable no-constant-condition*/

var hiredis      = require( 'hiredis' );
var Queue        = require( 'double-ended-queue' );
var _            = require( 'lodash' );
var EventEmitter = require( 'events' ).EventEmitter;
var util         = require( 'util' );

var CommandObj = require( './command' );
var commands   = require( './commands' );

/*
 * Default config
 *
 */
var defaultPort = 7711;
var defaultHost = '127.0.0.1';

/*
 * Debugger
 *
 */
function debug ( message ) {

	if ( exports.debugMode ) {
		console.log( message );
	}

}

exports.debugMode = /\bdisque\b/i.test( process.env.NODE_DEBUG );

function DisqueClient ( netStream, options ) {

	debug( 'Construct disqueClient' );

	this.netStream = netStream;
	this.options = options || {};

	this.commandQueue = new Queue();

	this.initRetry();
	this.attachStreams();

}

util.inherits( DisqueClient, EventEmitter );

/**
 * Retry configurations
 *
 */
DisqueClient.prototype.initRetry = function () {

	this.retryTimer = null;
	this.retryCount = 0;
	this.retryMax   = 5;
	this.retryDelay = 200;

};

/**
 * Attach streams
 *
 */
DisqueClient.prototype.attachStreams = function () {

	var self = this;

	this.netStream.on( 'connect', function () {
		self.onConnect();
	} );

	this.netStream.on( 'data', function ( buffer ) {
		self.parser.execute( buffer );
	} );

	this.netStream.on( 'error', function ( error ) {
		self.onError( error );
	} );

	this.netStream.on( 'close', function () {
		self.connectionGone( 'close' );
	} );

	this.netStream.on( 'end', function () {
		self.connectionGone( 'end' );
	} );

	this.netStream.on( 'drain', function () {
		self.drain();
	} );

};

/**
 * 'connect'
 *
 */
DisqueClient.prototype.onConnect = function () {

	debug( 'Connected' );

	var self       = this;
	self.connected = true;
	self.emit( 'connected' );

	self.initParser();

	if ( self.options.auth ) {

		debug( 'Authenticating' );

		self.auth( {
			'password' : self.options.auth.password
		}, function ( error ) {

			if ( error ) {
				return self.emit( 'error', error );
			}

			self.ready = true;
			self.emit( 'ready' );

		} );

	} else {

		self.ready = true;
		self.emit( 'ready' );

	}

};

/**
 * Initialize hiredis parser
 *
 */
DisqueClient.prototype.initParser = function () {

	debug( 'Initialize parser' );

	var self = this;

	self.parser = new hiredis.Reader( {
		'return_buffers' : self.returnBuffers || false
	} );

	self.parser.execute = function ( data ) {

		var reply;
		self.parser.feed( data );

		while ( true ) {

			try {

				reply = self.parser.get();

			} catch ( error ) {

				self.sendError( error );
				break;

			}

			if ( reply === undefined ) {
				break;
			}

			if ( reply && reply.constructor === Error ) {
				self.sendError( reply );
			} else {
				self.sendReply( reply );
			}

		}

	};

};

/**
 * Hiredis error and reply handlers
 *
 */
DisqueClient.prototype.sendError = function ( error ) {

	var commandCreated = this.commandQueue.shift();
	commandCreated.callback( error );

};

DisqueClient.prototype.sendReply = function ( reply ) {

	var commandCreated = this.commandQueue.shift();
	commandCreated.callback( null, reply );

};

/**
 * send command
 *
 */
DisqueClient.prototype.sendCommand = function ( commandCreated ) {

	var self = this;

	commandCreated.collate( function ( error, collatedCommand ) {

		if ( error ) {
			return commandCreated.callback( error );
		}

		self.commandQueue.push( commandCreated );
		self.write( collatedCommand );

	} );

};

/**
 * write
 *
 */
DisqueClient.prototype.write = function ( collatedCommand ) {
	this.netStream.write.apply( this.netStream, collatedCommand );
};

/**
 * 'error'
 *
 */
DisqueClient.prototype.onError = function ( error ) {

	debug( error );

};

/**
 * create commands
 *
 */
_( commands ).forEach( function ( commandMeta ) {

	DisqueClient.prototype[ commandMeta.command ] = function ( options, callback ) {
		var commandCreated = new CommandObj( commandMeta, options, callback );
		this.sendCommand( commandCreated );
	};

} ).value();

/**
 * 'retry'
 *
 */
var retry = function ( self ) {

	self.retryCount = self.retryCount + 1;
	self.netStream = hiredis.createConnection( self.connection );
	self.attachStreams();

	self.retryTimer = null;

};

/**
 * 'close' or 'end'
 *
 */
DisqueClient.prototype.connectionGone = function ( reason ) {

	if ( this.retryTimer ) {
		return;
	}

	debug( [ 'Connection gone reason:', reason ].join( ' ' ) );

	this.connected = false;
	this.ready     = false;

	if ( this.retryMax > this.retryCount ) {
		debug( [ 'Retry:', this.retryCount, 'out of', this.retryMax, 'will restart after', this.retryDelay, 'ms' ].join( ' ' ) );
		this.retryTimer = setTimeout( retry, this.retryDelay, this );
	} else {
		this.emit( 'error', new Error( 'Connection timeout' ) );
	}

};

/**
 * 'drain'
 *
 */
DisqueClient.prototype.drain = function () {
	this.emit( 'drain' );
};

/*
 * Create TCP connection
 *
 */
function createConnection ( options ) {

	debug( 'Create connection' );

	options = options || {};

	var netOptions = {
		'port' : options.port || defaultPort,
		'host' : options.host || defaultHost
	};

	var netStream = hiredis.createConnection( netOptions );
	var disqueClient = new DisqueClient( netStream, options );

	disqueClient.connection = netOptions;
	disqueClient.address = [ netOptions.port, netOptions ].join( ':' );

	return disqueClient;

}

module.exports = createConnection;
