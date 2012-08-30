(function (rwd, $) {
	'use strict';

	rwd.detectNthChild = function () {
		Modernizr.addTest('nthchild', function () {
			function isSelectorSupported(sel) {
				var el = document.createElement('div'),
					bool;
				el.setAttribute('id', 'nthchild');
				el.innerHTML = '<style>' + sel + '{}</style>';
				document.body.appendChild(el);
				bool = document.styleSheets[0].cssRules !== undefined && !!el.lastChild.sheet.cssRules[0];
				document.body.removeChild(el);
				return bool;
			}

			return isSelectorSupported(':nth-child(2n)');
		});
	};

	rwd.fixBoxSizing = function () {
		if (!Modernizr.boxsizing) {
			$('.region').wrapInner('<div class="region-wrap"></div>');
			$('.blocks > li').wrapInner('<div class="blocks-wrap"></div>');
		}
	};

	rwd.fontSize = parseInt($('html').css('font-size').replace('px', ''), 10);

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
		// 20120622 version

		// This fix addresses an iOS bug, so return early if the UA claims it's something else.
		var ua = navigator.userAgent;

		if (!(/iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf('AppleWebKit') > -1)) return;

		var w = window,
			doc = w.document;

		if (!doc.querySelector) return;

		var meta = doc.querySelector('meta[name=viewport]'),
			initialContent = meta && meta.getAttribute('content'),
			disabledZoom = initialContent + ',maximum-scale=1',
			enabledZoom = initialContent + ',maximum-scale=10',
			enabled = true,
			x,
			y,
			z,
			aig;

		if (!meta) return;

		function restoreZoom() {
			meta.setAttribute('content', enabledZoom);
			enabled = true;
		}

		function disableZoom() {
			meta.setAttribute('content', disabledZoom);
			enabled = false;
		}

		function checkTilt(e) {
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
		}

		w.addEventListener('orientationchange', restoreZoom, false);
		w.addEventListener('devicemotion', checkTilt, false);
	};

	rwd.fixNthChild = function () {
		if (Modernizr.nthchild) return;

		var endClass = 'blocks-end',
			startClass = 'blocks-start',
			updateNthChild = function () {
				var blocksEnd = false,
					blocksStart = false;

				if (rwd.matchViewport('M')) {
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
				} else if (rwd.matchViewport('S')) {
					blocksEnd = '.blocks-two-up > li:nth-child(2n),' +
						'.blocks-three-up > li:nth-child(3n),' +
						'.blocks-four-up > li:nth-child(2n),' +
						'.blocks-five-up > li:nth-child(3n),' +
						'.blocks-six-up > li:nth-child(3n)';
					blocksStart = '.blocks-two-up > li:nth-child(2n+1),' +
						'.blocks-three-up > li:nth-child(3n+1),' +
						'.blocks-four-up > li:nth-child(2n+1),' +
						'.blocks-five-up > li:nth-child(3n+1),' +
						'.blocks-six-up > li:nth-child(3n+1)';
				} else if (rwd.matchViewport('XS')) {
					blocksEnd = '.blocks-four-up > li:nth-child(2n),' +
						'.blocks-five-up > li:nth-child(2n),' +
						'.blocks-six-up > li:nth-child(2n)';
					blocksStart = '.blocks-four-up > li:nth-child(2n+1),' +
						'.blocks-five-up > li:nth-child(2n+1),' +
						'.blocks-six-up > li:nth-child(2n+1)';
				}

				$('.blocks > li').removeClass(startClass).removeClass(endClass);

				if (blocksStart) {
					$(blocksStart).addClass(startClass);
				}

				if (blocksEnd && $('html').hasClass('ie7')) {
					$(blocksEnd).addClass(endClass);
				}
			};

		rwd.onDelayedResize(updateNthChild, true);
	};

	rwd.matchViewport = function (value) {
		if (!value || !rwd.mediaQueries[value]) return false;

		value = rwd.mediaQueries[value].query;

		if (window.matchMedia && window.matchMedia('only all').matches) {
			return window.matchMedia(value).matches ? true : false;
		} else {
			return (
					(value.indexOf('min-width') > 0 && rwd.viewportWidth() / rwd.fontSize >= value.replace('(min-width:', '').replace('em)', '')) ||
					(value.indexOf('min-height') > 0 && rwd.viewportHeight() / rwd.fontSize >= value.replace('(min-height:', '').replace('em)', ''))
				) ? true : false;
		}
	};

	rwd.mediaQueries = {
		'XXS': {'query': '(min-width:15em)'},		// 240px
		'XS':  {'query': '(min-width:20em)'},		// 320px
		'S':   {'query': '(min-width:30em)'},		// 480px
		'M':   {'query': '(min-width:37.5em)'},		// 600px
		'L':   {'query': '(min-width:48.0625em)'},	// 769px
		'XL':  {'query': '(min-width:62em)'},		// 992px
		'High-DPI': {'query': '(-moz-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)'}
	};

	rwd.onDelayedResize = function (callback, fireNow) {
		if (typeof callback !== 'function' || typeof fireNow !== 'boolean') return;

		if (fireNow) callback();

		var delay = (function () {
				var timer = 0;

				return function () {
					clearTimeout(timer);
					timer = setTimeout(callback, 250);
				};
			}());

		$(window).on('resize', function () {
			delay();
		});
	};

	rwd.viewportHeight = function () {
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
	};

	rwd.viewportWidth = function () {
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
	};

	$(function () {
		rwd.detectNthChild();
		rwd.fixBoxSizing();
		rwd.fixIE7Grid();
		rwd.fixiOSOrientation();
		rwd.fixNthChild();
	});
}(window.siteName.rwd = window.siteName.rwd || {}, jQuery));