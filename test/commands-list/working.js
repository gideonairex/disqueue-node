'use strict';

var Disqueue = require( '../../' );

require( 'should' );

describe( '"WORKING"', function () {
	describe( 'successful working', function () {
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
				'queue' : 'working-job-test',
				'job'   : 'Hello world'
			}, function ( errorAddJob, addJob ) {
				disqueue.working( addJob, function ( errorWorking, resultWorking ) {
					data = resultWorking;
					done();
				} );
			} );
		} );

		it( 'should return defailt retry 300', function () {
			data.should.be.equal( 300 );
		} );
	} );
} );
