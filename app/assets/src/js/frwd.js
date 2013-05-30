(function (frwd) {
	'use strict';

	if (window.console) {
		console.log('frwd');
	}

	frwd.matchViewport = function (value) {
		if (!value || !frwd.mediaQueries[value]) return false;

		if (window.matchMedia && window.matchMedia('only all').matches) {
			return window.matchMedia(frwd.mediaQueries[value].query).matches ? true : false;
		} else {
			return (getComputedStyle(document.getElementsByTagName('head')[0]).getPropertyValue('font-family').indexOf('/' + value) > 0) ? true : false;
		}
	};

	frwd.mediaQueries = {
		'XXS': {'query': '(min-width:15em)'},		// 240px
		'XS':  {'query': '(min-width:20em)'},		// 320px
		'S':   {'query': '(min-width:30em)'},		// 480px
		'M':   {'query': '(min-width:37.5em)'},		// 600px
		'L':   {'query': '(min-width:48.0625em)'},	// 769px
		'XL':  {'query': '(min-width:62em)'},		// 992px
		'High-DPI': {'query': '(-webkit-min-device-pixel-ratio:1.5), (min-resolution:144dpi), (min-resolution:1.5dppx)'}
	};

	frwd.onDelayedResize = function (callback, fireNow) {
		if (typeof callback !== 'function' || typeof fireNow !== 'boolean') return;
		if (fireNow) callback();

		var delay = (function () {
				var timer = 0;

				return function () {
					clearTimeout(timer);
					timer = setTimeout(callback, 250);
				};
			}());

		window.addEventListener('resize', delay, false);
	};
}(window.frwd = window.frwd || {}));