'use strict';

var Disqueue = require( '../../' );

require( 'should' );

describe( '"QSCAN"', function () {
	describe( 'successful qscan', function () {
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
				'queue' : 'qscan-test',
				'job'   : 'Hello world'
			}, function () {
				disqueue.qscan( {
					'count' : 10,
				}, function ( errorQscan, resultQscan ) {
					data = resultQscan;
					done();
				} );
			} );
		} );

		it( 'should return queues object', function () {
			data.should.have.property( 'cursor' );
			data.should.have.property( 'queues' );
			data['queues'].should.be.Array();

			for ( var i = 0; i < data[ 'queues' ].length; ++i ) {
				data[ 'queues' ][ i ].should.be.String();
			}
		} );
	} );

	describe( 'successful qscan with busyloop', function () {
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
				'queue' : 'qscan-withbusyloop-test',
				'job'   : 'Hello world'
			}, function () {
				disqueue.qscan( {
					'count'    : 3,
					'busyloop' : true
				}, function ( errorQscan, resultQscan ) {
					data = resultQscan;
					done();
				} );
			} );
		} );

		it( 'should return object', function () {
			data.should.be.Object();
			data.cursor.should.be.Number();
			data.queues.should.be.Array();
			data.queues[0].should.be.String();
		} );
	} );
} );
