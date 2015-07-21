'use strict';

require( 'should' );

describe( 'Reponder client', function () {

	var respondClient;

	before( function ( done ) {

		var ReponderClient = require( '../lib/respond-client' );
		new ReponderClient( 7711, 'localhost', { 'name' : 'respondClient' } )
			.then( function ( respondDisqueueClient ) {
				respondClient = respondDisqueueClient;
				done();
			} );

	} );

	describe( 'Instantiate object', function () {

		it( '-- should be an object', function () {

			respondClient.should.be.an.instanceOf( Object );

		} );

		it( '-- should have property', function () {

			respondClient.should.have.property( 'disqueueClient' ).and.be.an.instanceOf( Object );

		} );

	} );

} );
