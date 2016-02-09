'use strict';

var Disqueue = require( '../../' );

require( 'should' );

describe( '"DELJOB"', function () {
	describe( 'successful delJob', function () {
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
				'queue' : 'del-job-test',
				'job'   : 'Hello world'
			}, function ( error, result ) {
				disqueue.delJob( result, function ( errorDeleteJob, resultDeleteJob ) {
					data = resultDeleteJob;
					done();
				} );
			} );
		} );

		it( 'should return true', function () {
			data.should.equal( 1 );
		} );
	} );
} );
