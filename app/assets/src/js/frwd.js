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
		'XXS': {'query': '(min-width:' + 240/16 + 'em)'},
		'XS':  {'query': '(min-width:' + 300/16 + 'em)'},
		'S':   {'query': '(min-width:' + 440/16 + 'em)'},
		'M':   {'query': '(min-width:' + 600/16 + 'em)'},
		'L':   {'query': '(min-width:' + 750/16 + 'em)'},
		'XL':  {'query': '(min-width:' + 980/16 + 'em)'},
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