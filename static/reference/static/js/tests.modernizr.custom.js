$(function () {
	'use strict';

	test('Modernizr', function () {
		strictEqual(typeof Modernizr, 'object', 'Modernizr');
		strictEqual(typeof Modernizr.boxsizing, 'boolean', 'Modernizr.boxsizing');
		strictEqual(typeof Modernizr.csstransitions, 'boolean', 'Modernizr.csstransitions');
		strictEqual(typeof Modernizr.generatedcontent, 'boolean', 'Modernizr.generatedcontent');
		strictEqual(typeof Modernizr.localstorage, 'boolean', 'Modernizr.localstorage');
		strictEqual(typeof Modernizr.touch, 'boolean', 'Modernizr.touch');
	});
});