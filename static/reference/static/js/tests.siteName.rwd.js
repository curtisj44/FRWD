$(function() {
	'use strict';

	module('siteName.rwd');

	test('setup', function () {
		strictEqual(typeof siteName.rwd, 'object', 'siteName.rwd object exists');
	});

	test('detectNthChild', function () {
		strictEqual(typeof siteName.rwd.detectNthChild, 'function', 'method exists');
		strictEqual(typeof Modernizr.nthchild, 'boolean', 'nth-child test has been added to Modernizr');
	});

	test('fixBoxSizing', function () {
		strictEqual(typeof Modernizr.boxsizing, 'boolean', 'box-sizing test has been added to Modernizr');

		if (!Modernizr.boxsizing) {
			strictEqual($('.region .region-wrap').length, 2, 'Box-sizing elements were added: .region-wrap');
			strictEqual($('.blocks > li .blocks-wrap').length, 4, 'Box-sizing elements were added: .blocks-wrap');
		} else {
			ok(true, 'This browser natively supports box-sizing.');
		}
	});

	test('fixIE7Grid', function () {
		var regionLast = $('.region-last').length;

		if ($('html').hasClass('ie7')) {
			strictEqual(regionLast, 1, '.region-last is added correctly');
		} else {
			strictEqual(regionLast, 0, 'This method only affects IE7');
		}
	});

	test('fixiOSOrientation', function () {
		strictEqual(typeof siteName.rwd.fixiOSOrientation, 'function', 'method exists');
		// TODO - CJ - figure out how to unit test this?
	});

	asyncTest('fixNthChild', function () {
		if (!Modernizr.nthchild) {
			setTimeout(function () {
				strictEqual($('.blocks > li.blocks-start').length, 1, 'Class needed to correct nth-child was added: .blocks-start');

				if ($('html').hasClass('ie7')) {
					strictEqual($('.blocks > li.blocks-end').length, 1, 'Class needed to correct nth-child was added: .blocks-end');
				} else {
					strictEqual($('.blocks > li.blocks-end').length, 0, '.blocks-end class not added.');
				}
				start();
			}, 800);
		} else {
			ok(true, 'This browser natively supports nth-child');
			start();
		}
	});

	asyncTest('matchViewport', function () {
		strictEqual(typeof siteName.rwd.matchViewport(), 'boolean', 'method returns a boolean value');
		strictEqual(siteName.rwd.matchViewport(), false, 'if no value is defined, return false');
		strictEqual(siteName.rwd.matchViewport(''), false, 'an empty string should return false');
		strictEqual(siteName.rwd.matchViewport('foo'), false, 'A non-match such as "foo" should always return false');

		setTimeout(function () {
			strictEqual(siteName.rwd.matchViewport('XXS'), true, 'XXS should almost always be true');
			start();
		}, 400);
	});

	// TODO - CJ - add tests
	//test('mediaQueries', function () {
	//});

	test('onDelayedResize', function () {
		strictEqual(typeof $(window).resize, 'function', 'jQuery resize function exists');
		strictEqual(siteName.rwd.onDelayedResize(), undefined, 'The callback argument is required.');
		strictEqual(siteName.rwd.onDelayedResize('foo'), undefined, 'The callback argument needs to be a function.');
		strictEqual(siteName.rwd.onDelayedResize(function () {}, 'foo'), undefined, 'The fireNow argument needs to be a boolean.');
		strictEqual(siteName.rwd.onDelayedResize(function () {}, true), undefined, 'The fireNow argument is a boolean.');
	});
});