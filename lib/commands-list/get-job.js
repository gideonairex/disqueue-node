'use strict';

module.exports = {
	/*
	 * Command handler
	 *
	 */
	'handler' : function ( options ) {
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
	},
	/*
	 * Decorate result
	 *
	 */
	'decorator' : function ( callback ) {
		return function ( error, data ) {
			if ( error ) {
				return callback( error );
			}

			var jobs = [];
			for ( var i = 0; i < data.length; ++i ) {
				var job = {
					'queue' : data[ i ][ 0 ],
					'jobId' : data[ i ][ 1 ],
					'body'  : data[ i ][ 2 ]
				};
				jobs.push( job );
			}

			return callback( error, jobs );
		};
	}
};
