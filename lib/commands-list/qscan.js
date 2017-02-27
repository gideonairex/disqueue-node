'use strict';

module.exports = {
	/*
	 * Command handler
	 *
	 */
	'handler'   : function ( options ) {
		var queue;
		var defaultCount = 10;
		var command      = [ 'QSCAN' ];

		/**
		 * Attach count
		 */
		command.push( 'COUNT' );
		command.push( options.count || defaultCount );

		if ( options.busyloop ) {
			command.push( 'BUSYLOOP' );
		}

		if ( options.minlen ) {
			command.push( 'MINLEN' );
			command.push( parseInt( options.minlen ) );
		}

		if ( options.maxlen ) {
			command.push( 'MAXLEN' );
			command.push( parseInt( options.maxlen ) );
		}

		if ( options.importrate ) {
			command.push( 'IMPORTRATE' );
			command.push( parseInt( options.importrate ) );
		}

		command.push( options.cursor || 0 );

		return command;
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

			var queues = {};

			if ( !data ) {
				return callback( error, queues );
			}

			queues.cursor = parseInt( data[ 0 ] );
			queues.queues = data[ 1 ];

			return callback( error, queues );
		};
	}
};
