$(function () {
	'use strict';

	var rwd = siteName.rwd;

	module('Setup');

	test('siteName.rwd', function () {
		strictEqual(typeof rwd, 'object', 'siteName.rwd object exists');
	});

	module('Method');

	test('detectNthChild', function () {
		strictEqual(typeof rwd.detectNthChild, 'function', 'method exists');
		strictEqual(typeof Modernizr.nthchild, 'boolean', 'nth-child test has been added: Modernizr.nthchild');
	});

	test('fixBoxSizing', function () {
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
		strictEqual(typeof rwd.fixiOSOrientation, 'function', 'method exists');
		// TODO - CJ - figure out how to unit test this?
	});

	test('fixNthChild', function () {
		if (Modernizr.nthchild) {
				ok(true, 'This browser natively supports nth-child');
		} else {
			strictEqual($('.blocks > li.blocks-start').length, 1, 'Class needed to correct nth-child was added: .blocks-start');

			if ($('html').hasClass('ie7')) {
				strictEqual($('.blocks > li.blocks-end').length, 1, 'Class needed to correct nth-child was added: .blocks-end');
			} else {
				strictEqual($('.blocks > li.blocks-end').length, 0, '.blocks-end class not added.');
			}
		}
	});

	test('fontSize', function () {
		strictEqual(typeof rwd.fontSize, 'number', 'property is always returns a number');
		strictEqual(rwd.fontSize > 0, true, 'should always be over 0');
	});

	test('matchViewport', function () {
		strictEqual(typeof rwd.matchViewport(), 'boolean', 'method returns a boolean value');
		strictEqual(rwd.matchViewport(), false, 'if no value is defined, return false');
		strictEqual(rwd.matchViewport(''), false, 'an empty string should return false');
		strictEqual(rwd.matchViewport('foo'), false, 'A non-match such as "foo" should always return false');
		strictEqual(rwd.matchViewport('XXS'), true, 'XXS should almost always be true');
	});

	test('mediaQueries', function () {
		strictEqual(typeof rwd.mediaQueries, 'object', 'object exists');
		// TODO - CJ - add more tests?
	});

	test('onDelayedResize', function () {
		strictEqual(typeof $(window).resize, 'function', 'jQuery resize function exists');
		strictEqual(rwd.onDelayedResize(), undefined, 'The callback argument is required.');
		strictEqual(rwd.onDelayedResize('foo'), undefined, 'The callback argument needs to be a function.');
		strictEqual(rwd.onDelayedResize(function () {}, 'foo'), undefined, 'The fireNow argument needs to be a boolean.');
		strictEqual(rwd.onDelayedResize(function () {}, true), undefined, 'The fireNow argument is a boolean.');
		// TODO - CJ - ensure that the callback only fires once?
	});

	test('viewportHeight', function () {
		strictEqual(typeof rwd.viewportHeight(), 'number', 'method always returns a number');
	});

	test('viewportWidth', function () {
		strictEqual(typeof rwd.viewportWidth(), 'number', 'method always returns a number');
	});
});