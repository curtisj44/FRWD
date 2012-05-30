$(function() {
	'use strict';

	module('Setup');

	test('jQuery', function () {
		strictEqual(typeof window.$, 'function', '$ function exists');
	});

	test('Modernizr', function () {
		strictEqual(typeof Modernizr, 'object', 'Modernizr');
		strictEqual(typeof Modernizr.csstransitions, 'boolean', 'Modernizr.csstransitions');
		strictEqual(typeof Modernizr.generatedcontent, 'boolean', 'Modernizr.generatedcontent');
		strictEqual(typeof Modernizr.localstorage, 'boolean', 'Modernizr.localstorage');
		strictEqual(typeof Modernizr.mq, 'function', 'Modernizr.mq');
		strictEqual(typeof Modernizr.touch, 'boolean', 'Modernizr.touch');
	});
});