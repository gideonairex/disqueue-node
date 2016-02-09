'use strict';

var Disqueue = require( '../../' );

require( 'should' );

describe( '"DEQUEUE"', function () {
	describe( 'successful dequeue', function () {
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
				'queue' : 'dequeue-job-test',
				'job'   : 'Hello world 1'
			}, function ( error1, result1 ) {
				disqueue.addJob( {
					'queue' : 'dequeue-job-test',
					'job'   : 'Hello world 2'
				}, function ( error2, result2 ) {
					disqueue.dequeue( [ result1, result2 ], function ( errorDeleteJob, resultDequeueJob ) {
						data = resultDequeueJob;
						done();
					} );
				} );
			} );
		} );

		it( 'should return 2', function () {
			data.should.equal( 2 );
		} );
	} );
} );
