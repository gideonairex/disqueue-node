'use strict';

module.exports = function ( options ) {

	var queue;

	var defaultCount = 10;
	var command      = [ 'GETJOB' ];

	if ( options.nohang ) {
		command.push( 'NOHANG' );
	}

	/**
	 * Attach count
	 *
	 */
	command.push( 'COUNT' );
	command.push( options.count || defaultCount );
	command.push( 'FROM' );

	if ( typeof options.queue === 'object' ) {
		queue = options.queue;
	} else {
		queue = [ options.queue ];
	}

	return command.concat( queue );

};
