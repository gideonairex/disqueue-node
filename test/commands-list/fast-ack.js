'use strict';

var Disqueue = require( '../../' );

require( 'should' );

describe( '"FASTACK"', function () {

	describe( 'successful ackJob', function () {

		var disqueue;

		before( function ( done ) {

			disqueue = new Disqueue();
			disqueue.on( 'connected', function () {
				done();
			} );

		} );

		var data;

		before( function ( done ) {

			disqueue.addJob( {
				'queue' : 'fast-ack-job-test',
				'job'   : 'Hello world'
			}, function ( error, result ) {

				disqueue.fastAck( result, function ( errorFastAckJob, resultFastAckJob ) {
					data = resultFastAckJob;
					done();
				} );

			} );

		} );

		it( 'should return true', function () {
			data.should.equal( 1 );
		} );

	} );

} );
