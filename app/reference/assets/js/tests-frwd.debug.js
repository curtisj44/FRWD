$(function () {
	'use strict';

	var debug = frwd.debug;

	// Turn all options off
	debug.background.off();
	debug.baseline.off();
	debug.boxes.off();
	debug.grid.off();
	debug.viewport.off();

	module('Setup');

	test('frwd.debug', function () {
		strictEqual(typeof debug, 'object', 'object exists');
	});

	// TODO - CJ - add tests for frwd.config

	/*
	test('fontSize', function () {
		strictEqual(typeof frwd.fontSize, 'number', 'property is always returns a number');
		strictEqual(frwd.fontSize > 0, true, 'should always be over 0');
	});
	*/


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

	test('viewportHeight', function () {
		strictEqual(typeof debug.viewportHeight(), 'number', 'method always returns a number');
	});

	test('viewportWidth', function () {
		strictEqual(typeof debug.viewportWidth(), 'number', 'method always returns a number');
	});

	test('viewport', function () {
		debug.viewport.on();
		strictEqual($('#debug-viewport').length, 1, '#debug-viewport added');
		debug.viewport.off();
		strictEqual($('#debug-viewport').length, 0, '#debug-viewport removed');
	});
});