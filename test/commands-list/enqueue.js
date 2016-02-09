'use strict';

var Disqueue = require( '../../' );

require( 'should' );

describe( '"ENQUEUE"', function () {
	describe( 'successful enqueue', function () {
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
				'queue' : 'enqueue-job-test',
				'job'   : 'Hello world 1'
			}, function ( error, result1 ) {
				disqueue.dequeue( [ result1 ], function () {
					disqueue.enqueue( [ result1 ], function ( errorEnqueue, resultEnqueueJob ) {
						data = resultEnqueueJob;
						done();
					} );
				} );
			} );
		} );

		it( 'should return 1', function () {
			data.should.equal( 1 );
		} );
	} );
} );
