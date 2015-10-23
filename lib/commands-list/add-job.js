'use strict';

module.exports = function ( options ) {

	if ( !options.queue ) {
		return new Error( 'Should have a queue' );
	}

	if ( !options.job ) {
		return new Error( 'Should have a job' );
	}

	return [ 'ADDJOB', options.queue, options.job, options.timeout || 0 ];

};
