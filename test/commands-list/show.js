'use strict';

var Disqueue = require( '../../' );
/* eslint handle-callback-err: 1 */
var should = require( 'should' );

describe( '"SHOW"', function () {
	describe( 'successful show', function () {
		var disqueue;
		var data;
		var job;
		var id;

		before( function ( done ) {
			disqueue = new Disqueue();
			disqueue.on( 'connected', function () {
				done();
			} );
		} );

		before( function ( done ) {
			job = {
				'queue' : 'show-job-test',
				'job'   : 'Hello world'
			};

			disqueue.addJob( job, function () {
				disqueue.getJob( {
					'count' : 10,
					'queue' : 'show-job-test'
				}, function ( errorGetJob, resultGetJob ) {
					id = resultGetJob[ 0 ].jobId;
					disqueue.show( resultGetJob[ 0 ].jobId, function ( errorShow, resultShow ) {
						data = resultShow;
						done();
					} );
				} );
			} );
		} );

		it( 'should return object', function () {
			data.should.have.property( 'id' ).and.be.equal( id );
			data.should.have.property( 'body' ).and.be.equal( job.job );
			data.should.have.property( 'queue' ).and.be.equal( job.queue );
			data.should.have.property( 'state' );
			data.should.have.property( 'repl' );
			data.should.have.property( 'ttl' );
			data.should.have.property( 'ctime' );
			data.should.have.property( 'delay' );
			data.should.have.property( 'retry' );
			data.should.have.property( 'nacks' );
			data.should.have.property( 'additional-deliveries' );
			data.should.have.property( 'nodes-delivered' );
			data.should.have.property( 'nodes-confirmed' );
			data.should.have.property( 'next-requeue-within' );
			data.should.have.property( 'next-awake-within' );
		} );
	} );

	describe( 'successful show, even for non-existent job', function () {
		var disqueue;

		before( function ( done ) {
			disqueue = new Disqueue();
			disqueue.on( 'connected', function () {
				done();
			} );
		} );

		it( 'should return null when job does not exist', function ( done ) {
			disqueue.show( 'D-0ca28763-cEPWFkFi4lF6unhxsfQCAto7-05a1', function ( err, job ) {
				should( job ).equal( null );
				done();
			} );
		} );
	} );

} );
