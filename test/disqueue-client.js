'use strict';

var _ = require( 'lodash' );

require( 'should' );

describe( 'Disqueue Node', function () {

	var disqueue;

	before( function ( done ) {

		var Disqueue = require( '../lib/disqueue-client' );
		new Disqueue( 7711, 'localhost', { 'name' : 'test' } )
			.then( function ( disqueueClient ) {
				disqueue = disqueueClient;
				done();
			} );

	} );

	describe( 'Instantiate disqueue client', function () {

		it( '-- should be a disqueue client object', function () {
			disqueue.should.be.an.instanceOf( Object );
		} );

		it( '-- should be a queue property', function () {
			disqueue.should.be.have.property( 'operationsQueue' ).and.be.an.instanceOf( Object );
		} );

	} );

	describe( 'Add job should return jobid', function () {

		it( '-- should have a job id', function () {

			disqueue.addJob( 'test', 'Hello World', 0, function ( error, data ) {

				data.length.should.equal( 48 );
				disqueue.ackJob( data, function () {} );

			} );

		} );

	} );

	describe( 'Should get jobs', function () {

		var jobs;

		before( function ( done ) {

			disqueue.addJob( 'test2', 'Hello World', 0, function ( error, data ) {

				data.length.should.equal( 48 );

				disqueue.getJob( 'test2', function ( jobError, jobData ) {
					jobs = jobData;
					done();
				} );

			} );

		} );

		it( '-- should run jobs', function () {

			jobs.should.be.an.instanceOf( Array );

			_( jobs ).forEach( function ( job ) {

				job.length.should.equal( 3 );

			} ).value();

		} );

	} );

} );
