'use strict';

var Disque = require( '../' );

module.exports = function () {

	return {
		'disqueProcess' : function () {
			return new Disque();
		}
	};

};
