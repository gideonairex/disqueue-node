'use strict';

var Disqueue = require( '../../' );

describe( '"ADDJOB"', function () {

	describe( 'successful addJob', function () {

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
				'queue' : 'test',
				'job'   : 'Hello world'
			}, function ( error, result ) {
				data = result;
				done();
			} );

		} );

		it( 'should return object', function () {
			data.length.should.equal( 40 );
		} );

	} );

	describe( 'fail addJob', function () {

		var disqueue;

		before( function ( done ) {

			disqueue = new Disqueue();
			disqueue.on( 'connected', function () {
				done();
			} );

		} );

		var errorObj;

		before( function ( done ) {

			disqueue.addJob( {}, function ( error ) {
				errorObj = error;
				done();
			} );

		} );

		it( 'should return object', function () {
			errorObj.message.should.equal( 'Should have a queue' );
		} );

	} );

} );
