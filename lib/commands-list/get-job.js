'use strict';

module.exports = function ( options ) {

	return [ 'GETJOB', 'COUNT',  options.count, 'FROM', options.queue ];

};
