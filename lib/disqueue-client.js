'use strict';

/*eslint-disable no-constant-condition*/

var redis        = require('redis');
var Parser       = require( 'redis-parser' );
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

function DisqueClient ( netOptions, options ) {

	debug( 'Construct disqueClient' );

	var self = this;

	this.options = options || {};
	this.initRetry();

	this.connection = netOptions;
	this.connection.retry_strategy = function retry_strategy(strategyOptions) {
		if (strategyOptions.attempt > self.retryMax) {
			var e = new Error('retryMax exceeded');
			self.onError(e);
			return e;
		}

		return self.retryDelay;
	};

	this.address = [ netOptions.host, netOptions.port ].join(':');
	this.commandQueue = new Queue();

	this.redisClient = redis.createClient(this.connection);
	this.netStream = this.redisClient.stream;
	this.attachStreams();

}

util.inherits( DisqueClient, EventEmitter );

/**
 * Retry configurations
 *
 */
DisqueClient.prototype.initRetry = function () {
	this.retryMax   = this.options.retryMax || 5;
	this.retryDelay = this.options.retryDelay || 200;
};

/**
 * Attach streams
 *
 */
DisqueClient.prototype.attachStreams = function () {

	var self = this;

	this.redisClient.on( 'ready', function () {
		self.onConnect();
	});

	this.redisClient.on('error', function (error) {
		self.onError( error );
	});

	this.redisClient.on( 'end', function () {
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

	var self = this;

	self.initParser();

	self.connected = true;
	self.emit('connected');

	if ( self.options.auth ) {

		debug( 'Authenticating' );

		self.auth( {
			'password' : self.options.auth.password
		}, function ( error ) {

			if ( error ) {
				throw ( error );
			}

			self.onReady();

		} );

	} else {

		self.onReady();

	}
};

/**
 * 'ready'
 *
 *
 */
DisqueClient.prototype.onReady = function () {

	this.ready      = true;
	this.emit( 'ready' );

};

/**
 * Initialize redis-parser
 *
 */
DisqueClient.prototype.initParser = function () {

	debug( 'Initialize parser' );

	var self = this;

	self.parser = new Parser( {
		'return_buffers' : self.returnBuffers || false,
		'returnReply' : function (reply) {
			self.sendReply(reply);
		},
		'returnError' : function (error) {
			self.sendError(error);
		}
	} );

	self.redisClient.reply_parser = self.parser;
};

/**
 * redis-parser error and reply handlers
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
var bufStar = Buffer.from('*', 'ascii');
var bufDollar = Buffer.from('$', 'ascii');
var bufCrlf = Buffer.from('\r\n', 'ascii');
DisqueClient.prototype.write = function (collatedCommand) {
	var bufLen = Buffer.from(String(collatedCommand.length), 'ascii');
	var parts = [ bufStar, bufLen, bufCrlf ];
	var size = 3 + bufLen.length;

	for (var i = 0; i < collatedCommand.length; i++) {
		var arg = collatedCommand[ i ];
		if (!Buffer.isBuffer(arg)) {
			arg = Buffer.from(String(arg));
		}

		bufLen = Buffer.from(String(arg.length), 'ascii');
		parts = parts.concat([ bufDollar, bufLen, bufCrlf, arg, bufCrlf ]);
		size += 5 + bufLen.length + arg.length;
	}

	this.netStream.write.apply( this.netStream, [ Buffer.concat(parts, size) ]);
};

/**
 * 'error'
 *
 */
DisqueClient.prototype.onError = function ( error ) {

	debug( error );
	this.emit('error', error);

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

} );

/**
 * 'retry'
 *
 */
var retry = function ( self ) {

	self.redisClient = redis.createClient(self.connection);
	self.netStream = self.redisClient.stream;
	self.attachStreams();

};

/**
 * 'close' or 'end'
 *
 */
DisqueClient.prototype.connectionGone = function ( reason ) {

	debug( [ 'Connection gone reason:', reason ].join( ' ' ) );

	this.connected = false;
	this.ready     = false;

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

	var disqueClient = new DisqueClient( netOptions, options );

	return disqueClient;

}

module.exports = createConnection;
