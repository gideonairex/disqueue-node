'use strict';

var Disqueue = require( '../../' );

describe( '"HELLO"', function () {
	describe( 'successful get hello', function () {
		var disqueue;
		var data;

		before( function ( done ) {
			disqueue = new Disqueue();
			disqueue.on( 'connected', function () {
				done();
			} );
		} );

		before( function ( done ) {
			disqueue.hello( {}, function ( disqueueError, result ) {
				data = result;
				done();
			} );
		} );

		it( 'should return info object', function () {
			data.should.have.property( 'version' );
			data.should.have.property( 'nodeId' );
			data.should.have.property( 'nodeIds' );
		} );
	} );
} );
