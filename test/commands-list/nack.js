'use strict';

var Disqueue = require( '../../' );

require( 'should' );

describe( '"NACK"', function () {
	describe( 'successful nack', function () {
		var disqueue;
		var data;

		before( function ( done ) {
			disqueue = new Disqueue();
			disqueue.on( 'connected', function () {
				done();
			} );
		} );

		before( function ( done ) {
			disqueue.addJob( {
				'queue' : 'ack-job-test',
				'job'   : 'Hello world'
			}, function ( error, result ) {
				disqueue.dequeue( result, function () {
					disqueue.nack( result, function ( errorAckJob, resultNackJob ) {
						data = resultNackJob;
						done();
					} );
				} );
			} );
		} );

		it( 'should return true', function () {
			data.should.equal( 1 );
		} );
	} );
} );
