$(function () {
	'use strict';

	test('jQuery', function () {
		strictEqual(typeof window.$, 'function', '$ function exists');
	});

	test('frwd', function () {
		strictEqual(typeof frwd, 'object', 'object exists');
	});

	test('matchViewport', function () {
		strictEqual(typeof frwd.matchViewport(), 'boolean', 'method returns a boolean value');
		strictEqual(frwd.matchViewport(), false, 'if no value is defined, return false');
		strictEqual(frwd.matchViewport(''), false, 'an empty string should return false');
		strictEqual(frwd.matchViewport('foo'), false, 'A non-match such as "foo" should always return false');
		strictEqual(frwd.matchViewport('XXS'), true, 'XXS should almost always be true');
	});

	test('mediaQueries', function () {
		strictEqual(typeof frwd.mediaQueries, 'object', 'object exists');
		// TODO - CJ - add more tests?
	});

	test('onDelayedResize', function () {
		strictEqual(typeof $(window).resize, 'function', 'jQuery resize function exists');
		strictEqual(frwd.onDelayedResize(), undefined, 'The callback argument is required.');
		strictEqual(frwd.onDelayedResize('foo'), undefined, 'The callback argument needs to be a function.');
		strictEqual(frwd.onDelayedResize(function () {}, 'foo'), undefined, 'The fireNow argument needs to be a boolean.');
		strictEqual(frwd.onDelayedResize(function () {}, true), undefined, 'The fireNow argument is a boolean.');
		// TODO - CJ - ensure that the callback only fires once?
	});
});