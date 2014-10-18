$(function () {
	'use strict';

	test('Modernizr', function () {
		strictEqual(typeof Modernizr, 'object', 'Modernizr');
		strictEqual(typeof Modernizr.touch, 'boolean', 'Modernizr.touch');
	});
});