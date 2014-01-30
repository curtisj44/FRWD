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
			return true;
		}
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