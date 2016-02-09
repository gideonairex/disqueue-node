'use strict';

module.exports = {
	/*
	 * Command handler
	 *
	 */
	'handler' : function () {
		return [ 'INFO' ];
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

			var parsedStatus = {};
			var statuses = data.split( '#' );
			statuses.shift();

			for ( var i = 0; i < statuses.length; ++i ) {
				var status = statuses[ i ];
				var statusBody = status.split( '\r\n' );

				// Remove excess
				statusBody.pop();
				statusBody.pop();
				var statusType = statusBody.shift().trim().toLowerCase();
				parsedStatus[ statusType ] = {};

				for ( var j = 0; j < statusBody.length; ++j ) {
					var statusTypeSub = statusBody[ j ].split( ':' );
					parsedStatus[ statusType ][ statusTypeSub[ 0 ] ] = statusTypeSub[ 1 ];
				}
			}

			return callback( error, parsedStatus );
		};
	}
};
