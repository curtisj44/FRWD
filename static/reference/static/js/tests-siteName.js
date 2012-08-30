$(function () {
	'use strict';

	test('jQuery', function () {
		strictEqual(typeof window.$, 'function', '$ function exists');
	});

	test('siteName', function () {
		strictEqual(typeof siteName, 'object', 'object exists');
	});
});