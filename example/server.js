'use strict';

var Disqueue = require( '../lib/disqueue-client' );

var disque = new Disqueue( {
	//'auth' : {
		//'password' : 'gideonairex'
	//}
} );

disque.on( 'error', function ( error ) {
	console.log( error );
} );

function getJob () {

	disque.getJob( {
		'count' : 10,
		'queue' : [ 'test', 'test2' ]
	}, function ( error, data ) {

		console.log( data );
		var jobIds = [];

		if ( data ) {

			data.forEach( function ( job ) {
				jobIds.push( job[ 1 ] );
			} );

			//disque.show( jobIds, function ( error, nack ) {

				//console.log( nack );

			//} );

			disque.nack( jobIds, function ( errorNack, nack ) {

				console.log( nack );

			} );

			disque.fastAck( jobIds, function ( errorFastAck, ack ) {

				console.log( ack );

			} );

			getJob();
		} else {
			getJob();
		}

	} );

}

getJob();
