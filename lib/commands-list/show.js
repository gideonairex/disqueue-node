'use strict';

module.exports = {
	/*
	 * Command handler
	 *
	 */
	'handler' : function ( jobId ) {
		return [ 'SHOW', jobId ];
	},
	/*
	 * Decorate result
	 *
	 */
	'decorator' : function ( callback ) {
		return function ( error, data ) {
			if ( error ) {
				return callback( error );
			} else if ( !data ) {
				return callback( error, null );
			}
			var parsedResult = {};

			for ( var i = 0; i < data.length; i += 2 ) {
				var key             = data[ i ];
				var value           = data[ i + 1 ];
				parsedResult[ key ] = value;
			}
			return callback( error, parsedResult );
		};
	}
};
