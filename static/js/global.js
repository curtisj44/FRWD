(function (siteName, $) {
	'use strict';

	var rwd = siteName.rwd = {};

	rwd.detectBoxSizing = function () {
		Modernizr.addTest('boxsizing', function () {
			var boxSizing = ['boxSizing', 'MozBoxSizing', 'WebkitBoxSizing', 'msBoxSizing'],
				boxSizingLength = boxSizing.length,
				div = document.createElement('div'),
				i;

			for (i = 0; i < boxSizingLength; i++) {
				if (div.style[boxSizing[i]] !== undefined) {
					return true;
				}
			}

			return false;
		});
	};

	rwd.detectNthChild = function () {
		// https://gist.github.com/1333330
		Modernizr.testStyles('#modernizr div:nth-child(3n){width:10px}', function (elem, rule) {
			var bool = false,
				divs = elem.getElementsByTagName('div'),
				test;

			if (divs.length === 7) {
				test = window.getComputedStyle ? function (i) {
					return getComputedStyle(divs[i], null).width === '10px';
				} : function (i) {
					return divs[i].currentStyle.width === '10px';
				};
				bool = !test(0) && !test(1) && test(2) && !test(3) && !test(4) && test(5) && !test(6);
			}
			Modernizr.addTest('nthchild', bool);
		}, 7);
	};

	rwd.fixBoxSizing = function () {
		if (!Modernizr.boxsizing) {
			$('.region').wrapInner('<div class="region-wrap"></div>');
			$('.blocks li').wrapInner('<div class="blocks-wrap"></div>');
		}
	};

	rwd.fixIE7Grid = function () {
		var $html = $('html');

		if ($html.hasClass('ie7')) {
			$html.find('.region:last-child').not('.region-centered').addClass('region-last');
		}
	};

	rwd.fixiOSOrientation = function () {
		/*! A fix for the iOS orientationchange zoom bug.
		 Script by @scottjehl, rebound by @wilto.
		 MIT License.
		*/

		// https://github.com/scottjehl/iOS-Orientationchange-Fix
		// version 20120123 with fix for https://github.com/scottjehl/iOS-Orientationchange-Fix/issues/10
		var w = window,
			doc = w.document;

		if (!doc.querySelector || w.orientation === undefined) {return;}

		var meta = doc.querySelector('meta[name=viewport]'),
			initialContent = meta && meta.getAttribute('content'),
			disabledZoom = initialContent + ',maximum-scale=1',
			enabledZoom = initialContent + ',maximum-scale=10',
			enabled = true,
			x, y, z, aig;

		if (!meta) {return;}

		var restoreZoom = function () {
				meta.setAttribute('content', enabledZoom);
				enabled = true;
			},
			disableZoom = function () {
				meta.setAttribute('content', disabledZoom);
				enabled = false;
			},
			checkTilt = function (e) {
				aig = e.accelerationIncludingGravity;
				x = Math.abs(aig.x);
				y = Math.abs(aig.y);
				z = Math.abs(aig.z);

				// If portrait orientation and in one of the danger zones
				if (!w.orientation && (x > 7 || ((z > 6 && y < 8 || z < 8 && y > 6) && x > 5))) {
					if (enabled) {
						disableZoom();
					}
				} else if (!enabled) {
					restoreZoom();
				}
			};

		w.addEventListener('orientationchange', restoreZoom, false);
		w.addEventListener('devicemotion', checkTilt, false);
	};

	rwd.fixNthChild = function () {
		if (!Modernizr.nthchild) {
			var updateNthChild = function () {
					var $blocks = $('.blocks li'),
						blocksEnd = false,
						blocksStart = false,
						endClass = 'blocks-end',
						startClass = 'blocks-start',
						viewportWidth = rwd.viewportWidth();

					if (viewportWidth >= 640) {
						blocksEnd = '.blocks-two-up > li:nth-child(2n),' +
							'.blocks-three-up > li:nth-child(3n),' +
							'.blocks-four-up > li:nth-child(4n),' +
							'.blocks-five-up > li:nth-child(5n),' +
							'.blocks-six-up > li:nth-child(6n)';
						blocksStart = '.blocks-two-up > li:nth-child(2n+1),' +
							'.blocks-three-up > li:nth-child(3n+1),' +
							'.blocks-four-up > li:nth-child(4n+1),' +
							'.blocks-five-up > li:nth-child(5n+1),' +
							'.blocks-six-up > li:nth-child(6n+1)';
					} else if (viewportWidth >= 480) {
						blocksEnd = '.blocks-two-up > li:nth-child(2n),' +
							'.blocks-four-up > li:nth-child(2n),' +
							'.blocks-three-up > li:nth-child(3n),' +
							'.blocks-five-up > li:nth-child(3n),' +
							'.blocks-six-up > li:nth-child(3n)';
						blocksStart = '.blocks-two-up > li:nth-child(2n+1),' +
							'.blocks-four-up > li:nth-child(2n+1),' +
							'.blocks-three-up > li:nth-child(3n+1),' +
							'.blocks-five-up > li:nth-child(3n+1),' +
							'.blocks-six-up > li:nth-child(3n+1)';
					} else if (viewportWidth >= 320) {
						blocksEnd = '.blocks > li:nth-child(2n)';
						blocksStart = '.blocks > li:nth-child(2n+1)';
					}

					$blocks.removeClass(startClass);
					$blocks.removeClass(endClass);

					if (blocksStart) {
						$(blocksStart).addClass(startClass);
					}

					if (blocksEnd && $('html').hasClass('ie7')) {
						$(blocksEnd).addClass(endClass);
					}
				};

			updateNthChild();
			rwd.onDelayedResize(updateNthChild);
		}
	};

	rwd.onDelayedResize = function (callback) {
		var delay = (function () {
				var timer = 0;

				return function (callback, ms) {
					clearTimeout(timer);
					timer = setTimeout(callback, ms || 250);
				};
			}());

		$(window).resize(function () {
			delay(callback);
		});
	};

	rwd.viewportHeight = function () {
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
	};

	rwd.viewportWidth = function () {
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
	};

	$(function () {
		rwd.detectBoxSizing();
		rwd.detectNthChild();
		rwd.fixBoxSizing();
		rwd.fixIE7Grid();
		rwd.fixiOSOrientation();
		rwd.fixNthChild();
	});
}(window.siteName = window.siteName || {}, jQuery));