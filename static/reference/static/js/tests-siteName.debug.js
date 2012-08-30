$(function () {
	'use strict';

	var debug = siteName.debug;

	// Turn all options off
	debug.background.off();
	debug.baseline.off();
	debug.boxes.off();
	debug.grid.off();
	debug.windowSize.off();

	module('Setup');

	test('siteName.debug', function () {
		strictEqual(typeof debug, 'object', 'object exists');
	});

	module('Method');

	test('buildPanel', function () {
		strictEqual($('#debug-panel').length, 1, '#debug-panel added');
	});

	/*
	test('buildButtons.options', function () {
		// TODO - CJ - add unit tests
	});

	test('buildButtons.view', function () {
		// TODO - CJ - add unit tests
	});
	*/

	test('background', function () {
		debug.background.on();
		strictEqual($('html').hasClass('debug'), true, 'debug class added to html tag');
		debug.background.off();
		strictEqual($('html').hasClass('debug'), false, 'debug class removed from html tag');
	});

	test('baseline', function () {
		debug.baseline.on();
		strictEqual($('#debug-baseline').length, 1, '#debug-baseline added');
		debug.baseline.off();
		strictEqual($('#debug-baseline').length, 0, '#debug-baseline removed');
	});

	test('boxes', function () {
		debug.boxes.on();
		strictEqual($('.debug-box').length, 2, '.debug-box added');
		debug.boxes.off();
		strictEqual($('.debug-box').length, 0, '.debug-box removed');
	});

	test('grid', function () {
		debug.grid.on();
		strictEqual($('#debug-grid').length, 1, '#debug-grid added');
		debug.grid.off();
		strictEqual($('#debug-grid').length, 0, '#debug-grid removed');
	});

	test('windowSize', function () {
		debug.windowSize.on();
		strictEqual($('#debug-size').length, 1, '#debug-size added');
		debug.windowSize.off();
		strictEqual($('#debug-size').length, 0, '#debug-size removed');
	});
});