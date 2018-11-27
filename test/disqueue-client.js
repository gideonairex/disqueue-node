'use strict';

var Disqueue = require( '../' );

require( 'should' );

describe( 'disqueue construct', function () {

	describe( 'should create an instance of disqueue', function () {

		var disqueue;

		before( function ( done ) {

			disqueue = new Disqueue();
			disqueue.on( 'connected', function () {
				done();
			} );

		} );

		it( 'should connect', function () {

			disqueue.connected.should.be.equal( true );
			disqueue.ready.should.be.equal( true );

		} );

	} );

	describe( 'should not connect with invalid port and host', function () {

		var disqueue;

		before( function ( done ) {

			disqueue = new Disqueue({
				'port': 9999,
				'host': 'invalid',
				'retryMax': 1
			});

			disqueue.on('error', function () {
				done();
			});
		} );

		it( 'should emit error', function () {

			disqueue.connected.should.be.equal( false );
			disqueue.ready.should.be.equal( false );

		} );

	} );

} );
