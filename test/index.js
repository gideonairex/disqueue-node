'use strict';

var _ = require( 'lodash' );

require( 'should' );

describe( 'DisqueueHandler', function () {

	var DisqueueHandler;
	var disqueue;

	var strictedProperties = [
		'disqueueClients',
		'responseQueueClient',
		'responderClient',
		'requestClient'
	];

	before( function ( done ) {
		DisqueueHandler = require( '../lib/' );

		new DisqueueHandler()
			.then( function ( disqueueClient ) {
				disqueue = disqueueClient;
				done();
			} );

	} );

	describe( 'Instantiate disqueue handler object', function () {

		it( '-- should be an object', function () {
			disqueue.should.an.instanceOf( Object );
		} );

		it( '-- should have properties and equal to stricted attributes', function () {

			_.keys( disqueue ).length.should.equal( strictedProperties.length );

			_( _.keys( disqueue ) ).forEach( function ( attribute ) {
				strictedProperties.indexOf( attribute ).should.not.equal( -1 );
			} ).value();

		} );

	} );

	describe( 'Request and respond to a job', function () {

		var request;
		var result;

		before( function ( done ) {

			disqueue.respond( 'job', function ( message, send ) {
				request = message;
				return send( null, [ message, 'World' ].join( ' ' ) );
			} );

			disqueue.request( 'job', 'Hello', 0 )
				.then( function ( jobResult ) {
					result = jobResult;
					done();
				} );

		} );

		it( '-- should have request and result', function () {

			request.should.equal( 'Hello' );
			result.should.equal( 'Hello World' );

		} );

	} );

} );
