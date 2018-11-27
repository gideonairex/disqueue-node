'use strict';

var Disqueue = require( '../../' );

require( 'should' );

describe( '"GETJOB"', function () {
	describe( 'successful getJob', function () {
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
			for ( var i = 0; i < data.length; ++i ) {
				data[ i ].should.have.property( 'queue' ).and.be.instanceof( String );
				data[ i ].should.have.property( 'jobId' ).and.be.instanceof( String );
				data[ i ].should.have.property( 'body' ).and.be.instanceof( String );
			}
		} );
	} );

	describe( 'successful getJob with counters', function () {
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
				'queue' : 'get-job-withcounters-test',
				'job'   : 'Hello world'
			}, function () {
				disqueue.getJob( {
					'count'        : 10,
					'queue'        : 'get-job-withcounters-test',
					'withcounters' : true
				}, function ( errorGetJob, resultGetJob ) {
					data = resultGetJob;
					done();
				} );
			} );
		} );

		it( 'should return object', function () {
			for ( var i = 0; i < data.length; ++i ) {
				data[ i ].should.have.property( 'queue' ).and.be.instanceof( String );
				data[ i ].should.have.property( 'jobId' ).and.be.instanceof( String );
				data[ i ].should.have.property( 'body' ).and.be.instanceof( String );
				data[ i ].should.have.property( 'nacks' ).and.be.instanceof( Number );
				data[ i ].should.have.property( 'additionalDeliveries' ).and.be.instanceof( Number );
			}
		} );
	} );

	describe( 'no data in queue', function () {
		var disqueue;
		var data;

		before( function ( done ) {
			disqueue = new Disqueue();
			disqueue.on( 'connected', function () {
				done();
			} );
		} );

		before( function ( done ) {
			disqueue.getJob( {
				'count'        : 10,
				'queue'        : 'get-job-withoutdata-test',
				'withcounters' : true,
				'nohang'       : true
			}, function ( errorGetJob, resultGetJob ) {
				data = resultGetJob;
				done();
			} );
		} );

		it( 'should return empty array', function () {
			data.length.should.equal( 0 );
		} );
	} );
} );
