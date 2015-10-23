'use strict';

var Disqueue = require( '../../' );

require( 'should' );

describe( '"GETJOB"', function () {

	describe( 'successful getJob', function () {

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
				'queue' : 'get-job-test',
				'job'   : 'Hello world'
			}, function () {

				disqueue.getJob( {
					'count' : 10,
					'queue' : 'get-job-test'
				}, function ( errorGetJob, resultGetJob ) {
					data = resultGetJob;
					done();
				} );

			} );

		} );

		it( 'should return object', function () {
			data.should.be.instanceof( Array );
		} );

	} );

} );
