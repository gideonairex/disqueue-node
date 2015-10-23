'use strict';

module.exports = function ( jobIds ) {

	var command = [ 'ENQUEUE' ];

	if ( typeof jobIds === 'object' ) {
		command = command.concat( jobIds );
	} else {
		command.push( jobIds );
	}

	return command;

};
