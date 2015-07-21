'use strict';

require( 'should' );

describe( 'Reponse reply queue client', function () {

	var responseReplyClient;

	before( function ( done ) {

		var ResponseReplyQueueClient = require( '../lib/response-queue-client' );
		new ResponseReplyQueueClient( 7711, 'localhost', { 'name' : 'responseReplyClient' } )
			.then( function ( responseReplyQueueClient ) {
				responseReplyClient = responseReplyQueueClient;
				done();
			} );

	} );

	describe( 'Instantiate object', function () {

		it( '-- should be an object', function () {

			responseReplyClient.should.be.an.instanceOf( Object );

		} );

		it( '-- should have property', function () {

			responseReplyClient.should.have.property( 'disqueueClient' ).and.be.an.instanceOf( Object );
			responseReplyClient.should.have.property( 'replyQueue' );

		} );

	} );

} );
