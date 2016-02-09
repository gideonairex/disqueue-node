'use strict';

module.exports = {
	/*
	 * Command handler
	 *
	 */
	'handler' : function () {
		return [ 'HELLO' ];
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

			var parsedData     = {};
			parsedData.version = data[ 0 ];
			parsedData.nodeId  = data[ 1 ];
			parsedData.nodeIds = data[ 2 ];

			return callback( error, parsedData );
		};
	}
};
