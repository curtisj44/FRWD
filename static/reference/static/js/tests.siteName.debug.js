$(function() {
	'use strict';

	// Turn all option off
	siteName.debug.background.off();
	siteName.debug.baseline.off();
	siteName.debug.boxes.off();
	siteName.debug.grid.off();
	siteName.debug.windowSize.off();

	module('siteName.debug');

	test('setup', function () {
		strictEqual(typeof siteName.debug, 'object', 'siteName.debug object exists');
	});

	test('buildPanel', function () {
		strictEqual($('#debug-panel').length, 1, '#debug-panel added');
		// TODO - CJ - add more tests here
	});

	test('background', function () {
		siteName.debug.background.on();
		strictEqual($('html').hasClass('debug'), true, 'debug class added to html tag');
		siteName.debug.background.off();
		strictEqual($('html').hasClass('debug'), false, 'debug class removed from html tag');
	});

	test('baseline', function () {
		siteName.debug.baseline.on();
		strictEqual($('#debug-baseline').length, 1, '#debug-baseline added');
		siteName.debug.baseline.off();
		strictEqual($('#debug-baseline').length, 0, '#debug-baseline removed');
	});

	test('boxes', function () {
		siteName.debug.boxes.on();
		strictEqual($('.debug-box').length, 2, '.debug-box added');
		siteName.debug.boxes.off();
		strictEqual($('.debug-box').length, 0, '.debug-box removed');
	});

	test('grid', function () {
		siteName.debug.grid.on();
		strictEqual($('#debug-grid').length, 1, '#debug-grid added');
		siteName.debug.grid.off();
		strictEqual($('#debug-grid').length, 0, '#debug-grid removed');
	});

	test('windowSize', function () {
		siteName.debug.windowSize.on();
		strictEqual($('#debug-size').length, 1, '#debug-size added');
		siteName.debug.windowSize.off();
		strictEqual($('#debug-size').length, 0, '#debug-size removed');
	});

	test('viewportHeight', function () {
		strictEqual(typeof siteName.debug.viewportHeight(), 'number', 'method always returns a number');
	});

	test('viewportWidth', function () {
		strictEqual(typeof siteName.debug.viewportWidth(), 'number', 'method always returns a number');
	});
});