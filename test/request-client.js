'use strict';

require( 'should' );

describe( 'Requester client', function () {

	var requestClient;

	before( function ( done ) {

		var RequestClient = require( '../lib/request-client' );
		new RequestClient( 7711, 'localhost', { 'name' : 'requestClient' } )
			.then( function ( requestDisqueueClient ) {
				requestClient = requestDisqueueClient;
				done();
			} );

	} );

	describe( 'Instantiate object', function () {

		it( '-- should be an object', function () {

			requestClient.should.be.an.instanceOf( Object );

		} );

		it( '-- should have property', function () {

			requestClient.should.have.property( 'disqueueClient' ).and.be.an.instanceOf( Object );

		} );

	} );

} );
