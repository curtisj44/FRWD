$(function() {
	'use strict';

	module('Setup');

	test('test required objects', function () {
		strictEqual(typeof window.$, 'function', '$ function exists');
		strictEqual(typeof Modernizr, 'object', 'Modernizr');
		strictEqual(typeof Modernizr.csstransitions, 'boolean', 'Modernizr.csstransitions');
		strictEqual(typeof Modernizr.generatedcontent, 'boolean', 'Modernizr.generatedcontent');
		strictEqual(typeof Modernizr.localstorage, 'boolean', 'Modernizr.localstorage');
		strictEqual(typeof Modernizr.mq, 'function', 'Modernizr.mq');
		strictEqual(typeof Modernizr.touch, 'boolean', 'Modernizr.touch');
		strictEqual(typeof window.siteName, 'object', 'siteName object exists');
	});

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
		// TODO - figure out how to unit test this?
	});

	test('fixNthChild', function () {
		if (!Modernizr.nthchild) {
			strictEqual($('.blocks > li.blocks-start').length, 1, 'Class needed to correct nth-child was added: .blocks-start');

			if ($('html').hasClass('ie7')) {
				strictEqual($('.blocks > li.blocks-end').length, 1, 'Class needed to correct nth-child was added: .blocks-end');
			} else {
				strictEqual($('.blocks > li.blocks-end').length, 0, '.blocks-end class not added.');
			}
		} else {
			ok(true, 'This browser natively supports nth-child');
		}
	});

	test('matchViewport', function () {
		strictEqual(typeof siteName.rwd.matchViewport(), 'boolean', 'method returns a boolean value');
		strictEqual(siteName.rwd.matchViewport('(min-width:1px)'), true, 'min-width: 1px');
		strictEqual(siteName.rwd.matchViewport('(min-height:1px)'), true, 'min-height: 1px');
		strictEqual(siteName.rwd.matchViewport(), false, 'if no value is defined, return false');
		strictEqual(siteName.rwd.matchViewport(''), false, 'an empty string should return false');
		//strictEqual(siteName.rwd.matchViewport('foo'), false, 'a non-valid media query value should return false'); // TODO - this doesn't work in IE9
	});

	test('onDelayedResize', function () {
		strictEqual(typeof $(window).resize, 'function', 'jQuery resize function exists');
		strictEqual(siteName.rwd.onDelayedResize(), undefined, 'The callback argument is required.');
		strictEqual(siteName.rwd.onDelayedResize('foo'), undefined, 'The callback argument needs to be a function.');
		strictEqual(siteName.rwd.onDelayedResize(function () {}, 'foo'), undefined, 'The fireNow argument needs to be a boolean.');
		strictEqual(siteName.rwd.onDelayedResize(function () {}, true), undefined, 'The fireNow argument is a boolean.');
	});

	test('viewportHeight', function () {
		strictEqual(typeof siteName.rwd.viewportHeight(), 'number', 'method always returns a number');
	});

	test('viewportWidth', function () {
		strictEqual(typeof siteName.rwd.viewportWidth(), 'number', 'method always returns a number');
	});

	module('siteName.debug');

	test('setup', function () {
		strictEqual(typeof siteName.debug, 'object', 'siteName.debug object exists');
	});

	test('buildPanel', function () {
		strictEqual($('#debug-panel').length, 1, '#debug-panel added');
		// TODO - add more tests here
	});

	test('background', function () {
		siteName.debug.backgroundOn();
		strictEqual($('html').hasClass('debug'), true, 'debug class added to html tag');
		siteName.debug.backgroundOff();
		strictEqual($('html').hasClass('debug'), false, 'debug class removed from html tag');
	});

	test('baseline', function () {
		siteName.debug.baselineOn();
		strictEqual($('#debug-baseline').length, 1, '#debug-baseline added');
		siteName.debug.baselineOff();
		strictEqual($('#debug-baseline').length, 0, '#debug-baseline removed');
	});

	test('boxes', function () {
		siteName.debug.boxesOn();
		strictEqual($('.debug-box').length, 2, '.debug-box added');
		siteName.debug.boxesOff();
		strictEqual($('.debug-box').length, 0, '.debug-box removed');
	});

	test('grid', function () {
		siteName.debug.gridOn();
		strictEqual($('#debug-grid').length, 1, '#debug-grid added');
		siteName.debug.gridOff();
		strictEqual($('#debug-grid').length, 0, '#debug-grid removed');
	});

	test('windowSize', function () {
		siteName.debug.windowSizeOn();
		strictEqual($('#debug-size').length, 1, '#debug-size added');
		siteName.debug.windowSizeOff();
		strictEqual($('#debug-size').length, 0, '#debug-size removed');
	});


	//module('siteName.slider');
	// TODO - add tests for this as well
});