'use strict';

var Disqueue = require( '../../' );

require( 'should' );

describe( '"ACKJOB"', function () {

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
				'queue' : 'ack-job-test',
				'job'   : 'Hello world'
			}, function ( error, result ) {

				disqueue.ackJob( result, function ( errorAckJob, resultAckJob ) {
					data = resultAckJob;
					done();
				} );

			} );

		} );

		it( 'should return true', function () {
			data.should.equal( 1 );
		} );

	} );

} );
