$(function () {
	'use strict';

	module('Setup');

	test('frwd', function () {
		strictEqual(typeof frwd, 'object', 'frwd object exists');
	});

	module('Method');

	/*
	test('fixIE7Grid', function () {
		var regionLast = $('.region-last').length;

		if ($('html').hasClass('ie7')) {
			strictEqual(regionLast, 1, '.region-last is added correctly');
		} else {
			strictEqual(regionLast, 0, 'This method only affects IE7');
		}
	});
	*/
});