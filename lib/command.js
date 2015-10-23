'use strict';

module.exports = function ( commandMeta, args, callback ) {

	this.commandMeta = commandMeta;
	this.args        = args;
	this.callback    = callback;

	this.collate = function ( cb ) {
		var command = commandMeta.handler( args );
		if ( command instanceof Error ) {
			return cb( command );
		}

		cb( null, command );
	};

};
