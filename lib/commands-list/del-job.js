'use strict';

module.exports = function ( jobIds ) {

	var command = [ 'DELJOB' ];

	if ( typeof jobIds === 'object' ) {
		command = command.concat( jobIds );
	} else {
		command.push( jobIds );
	}

	return command;

};
