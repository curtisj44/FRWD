$(function () {
	'use strict';

	var $images = $('.image-rwd');

	module('Setup');

	test('picturefill', function () {
		strictEqual(typeof frwd, 'object', 'picturefill object exists');
	});

	// TODO - CJ - clean up
	/*
	module('Method');

	test('init', function () {
		strictEqual(typeof frwd.images.init, 'function', 'method exists');
	});

	test('checkMedia', function () {
		strictEqual(typeof frwd.images.checkMedia, 'function', 'method exists');
		strictEqual(frwd.images.checkMedia(), undefined, 'method expects one argument');
		strictEqual(frwd.images.checkMedia(function () {}), undefined, 'argument must be an object');
	});

	test('handleImage', function () {
		strictEqual(typeof frwd.images.handleImage, 'function', 'method exists');
		strictEqual(frwd.images.handleImage(), undefined, 'method expects one argument');
		strictEqual(frwd.images.handleImage(function () {}), undefined, 'argument must be an object');
	});

	frwd.onDelayedResize(function () {
		var i,
			imageAmount = $images.length - 1;

		for (i = 0; i <= imageAmount; i += 1) {
			var $set = $images.eq(i),
				$img = $set.find('img'),
				prefix = 'Image ' + (i + 1) + ' - ';

			test('handleImage - ' + prefix + 'setup', function () {
				strictEqual($img.length, 1, 'One img tag is created for each .image-rwd set');
				strictEqual($img.attr('src') && $img.attr('src').length > 0, true, prefix + 'The img tag always has a src attribute');
				strictEqual($img.attr('alt') && $img.attr('alt').length > 0, true, prefix + 'The img tag always has a alt attribute');
			});
		}
	}, true);
	*/

	// TODO - CJ - test correct image replacement
	// TODO - CJ - test correct image replacement for High-DPI
});