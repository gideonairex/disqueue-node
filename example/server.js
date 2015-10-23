'use strict';

var Disqueue = require( '../lib/disqueue-client' );

var disque = new Disqueue( {
	//'auth' : {
		//'password' : 'gideonairex'
	//}
} );

function getJob () {

	disque.getJob( {
		'count' : 10,
		'queue' : 'test'
	}, function ( error, data ) {

		var jobIds = [];

		if ( data ) {

			data.forEach( function ( job ) {
				jobIds.push( job[ 1 ] );
			} );

			//disque.show( jobIds, function ( error, nack ) {

				//console.log( nack );

			//} );

			disque.nack( jobIds, function ( error, nack ) {

				console.log( nack );

			} );

			disque.fastAck( jobIds, function ( error, ack ) {

				console.log( ack );

			} );

			getJob();
		} else {
			getJob();
		}

	} );

}

getJob();
