'use strict';

/**
 * To do
 * 'slowlog',
 * 'debug',
 * 'monitor',
 * 'info',
 * 'jscan',
 * 'time',
 * 'latency',
 * 'qscan',
 * 'qpeek',
 * 'config',
 * 'loadjob',
 * 'shutdown',
 * 'client',
 * 'command'
 */

module.exports = [

	{
		'command' : 'addJob',
		'handler' : require( './commands-list/add-job' )
	},

	{
		'command' : 'ackJob',
		'handler' : require( './commands-list/ack-job' )
	},

	{
		'command' : 'dequeue',
		'handler' : require( './commands-list/dequeue' )
	},

	{
		'command' : 'delJob',
		'handler' : require( './commands-list/del-job' )
	},

	{
		'command' : 'auth',
		'handler' : require( './commands-list/auth' )
	},

	{
		'command'   : 'hello',
		'handler'   : require( './commands-list/hello' ).handler,
		'decorator' : require( './commands-list/hello' ).decorator
	},

	{
		'command' : 'enqueue',
		'handler' : require( './commands-list/enqueue' )
	},

	{
		'command'   : 'getJob',
		'handler'   : require( './commands-list/get-job' ).handler,
		'decorator' : require( './commands-list/get-job' ).decorator
	},

	{
		'command' : 'nack',
		'handler' : require( './commands-list/nack' )
	},

	{
		'command' : 'fastAck',
		'handler' : require( './commands-list/fast-ack' )
	},

	{
		'command'   : 'info',
		'handler'   : require( './commands-list/info' ).handler,
		'decorator' : require( './commands-list/info' ).decorator
	},

	{
		'command' : 'qlen',
		'handler' : require( './commands-list/qlen' )
	},

	{
		'command'   : 'show',
		'handler'   : require( './commands-list/show' ).handler,
		'decorator' : require( './commands-list/show' ).decorator
	},

	{
		'command' : 'working',
		'handler' : require( './commands-list/working' )
	}

];
