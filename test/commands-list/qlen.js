'use strict';

var Disqueue = require( '../../' );

require( 'should' );

describe( '"QLEN"', function () {
	describe( 'successful qlen', function () {
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
				'queue' : 'qlen-job-test',
				'job'   : 'Hello world'
			}, function () {
				disqueue.qlen( 'qlen-job-test', function ( errorQlen, resultQlen ) {
					data = resultQlen;
					disqueue.getJob( {
						'queue' : 'qlen-job-test',
						'count' : 10
					}, function () {
						done();
					} );
				} );
			} );
		} );

		it( 'should return object', function () {
			data.should.equal( 1 );
		} );
	} );
} );
