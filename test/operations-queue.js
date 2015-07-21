'use strict';

require( 'should' );

describe( 'Operations queue', function () {

	var queue;

	before( function ( done ) {

		var Queue = require( '../lib/operations-queue' );
		queue = new Queue( 'myQueue' );
		done();

	} );

	describe( 'Instantiate queue', function () {

		it( '-- should create an object', function () {
			queue.should.be.an.instanceOf( Object );
		} );

	} );

	describe( 'Enqueue', function () {

		before( function ( done ) {

			queue.enqueue( 'ADDJOB test "Hello World"', function () {
				return 'Success';
			} );
			done();

		} );

		it( '-- should enqueue message', function () {
			queue.items.length.should.equal( 1 );
			queue.commands.length.should.equal( 1 );
		} );

		after( function ( done ) {

			queue.dequeue( null, 'Hi' );
			done();

		} );

	} );

	describe( 'Dequeue', function () {

		var result;

		before( function ( done ) {

			queue.enqueue( 'ADDJOB test "Hello World"', function () {
				return 'Success';
			} );
			result = queue.dequeue( null, 'Hi' );
			done();

		} );

		it( '-- should dequeue message', function () {
			result.should.equal( 'Success' );
			queue.items.length.should.equal( 0 );
			queue.commands.length.should.equal( 0 );
		} );

	} );

} );
