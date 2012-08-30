$(function () {
	'use strict';

	var rwd = siteName.rwd,
		$images = $('.image-rwd');

	module('Setup');

	test('siteName.rwd.images', function () {
		strictEqual(typeof rwd, 'object', 'siteName.rwd object exists');
		strictEqual(typeof rwd.images, 'object', 'siteName.rwd.images object exists');
	});

	module('Method');

	test('init', function () {
		strictEqual(typeof rwd.images.init, 'function', 'method exists');
	});

	test('checkMedia', function () {
		strictEqual(typeof rwd.images.checkMedia, 'function', 'method exists');
		strictEqual(rwd.images.checkMedia(), undefined, 'method expects one argument');
		strictEqual(rwd.images.checkMedia(function () {}), undefined, 'argument must be an object');
	});

	test('handleImage', function () {
		strictEqual(typeof rwd.images.handleImage, 'function', 'method exists');
		strictEqual(rwd.images.handleImage(), undefined, 'method expects one argument');
		strictEqual(rwd.images.handleImage(function () {}), undefined, 'argument must be an object');
	});

	rwd.onDelayedResize(function () {
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

	// TODO - CJ - test correct image replacement
	// TODO - CJ - test correct image replacement for High-DPI
});