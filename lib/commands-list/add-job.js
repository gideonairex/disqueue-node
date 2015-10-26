'use strict';

module.exports = function ( options ) {

	var defaultTimeout = 0;
	var command        = [ 'ADDJOB' ];

	if ( !options.queue ) {
		return new Error( 'Should have a queue' );
	}

	/**
	 * queue
	 *
	 */
	command.push( options.queue );

	if ( !options.job ) {
		return new Error( 'Should have a job' );
	}

	/**
	 * ms-timeout
	 *
	 */
	command.push( options.job );
	command.push( options.timeout || defaultTimeout );

	/**
	 * REPLICATE
	 *
	 */
	if ( options.replicate ) {
		command.push( 'REPLICATE' );
		command.push( options.replicate );
	}

	/**
	 * DELAY
	 *
	 */
	if ( options.delay ) {
		command.push( 'DELAY' );
		command.push( options.delay );
	}

	/**
	 * RETRY
	 *
	 */
	if ( options.retry ) {
		command.push( 'RETRY' );
		command.push( options.retry );
	}

	/**
	 * TTL
	 *
	 */
	if ( options.ttl ) {
		command.push( 'TTL' );
		command.push( options.ttl );
	}

	/**
	 * MAXLEN
	 *
	 */
	if ( options.maxlen ) {
		command.push( 'MAXLEN' );
		command.push( options.maxlen );
	}

	/**
	 * ASYNC
	 *
	 */
	if ( options.async ) {
		command.push( 'ASYNC' );
	}

	return command;

};
