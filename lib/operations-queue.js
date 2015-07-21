'use strict';

function Queue ( name ) {
	this.name = name;
	this.items = [];
	this.commands = [];
}

Queue.prototype.enqueue = function ( type, cb ) {

	this.commands.push( type );
	this.items.push( cb );

};

Queue.prototype.dequeue = function ( error, data ) {

	this.commands.shift();

	if ( error ) {
		return this.items.shift()( error );
	}

	return this.items.shift()( error, data );

};

module.exports = Queue;
