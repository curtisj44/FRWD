(function (siteName, $) {
	'use strict';

	var rwd = siteName.rwd = {};

	rwd.detectNthChild = function () {
		Modernizr.addTest('nthchild', function () {
			function isSelectorSupported(sel) {
				var el = document.createElement('div');
				el.setAttribute('id', 'nthchild');
				el.innerHTML = '<style>' + sel + '{}</style>';
				document.body.appendChild(el);
				var bool = document.styleSheets[0].cssRules !== undefined && !!el.lastChild.sheet.cssRules[0];
				document.body.removeChild(el);
				return bool;
			};

			return isSelectorSupported(':nth-child(2n)');
		});
	};

	rwd.fixBoxSizing = function () {
		if (!Modernizr.boxsizing) {
			$('.region').wrapInner('<div class="region-wrap"></div>');
			$('.blocks > li').wrapInner('<div class="blocks-wrap"></div>');
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
		// 20120129 version

		// This fix addresses an iOS bug, so return early if the UA claims it's something else.
		if (!(/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf('AppleWebKit') > -1 )) {
			return;
		}

		var w = window,
			doc = w.document;

		if (!doc.querySelector) {return;}

		var meta = doc.querySelector('meta[name=viewport]'),
			initialContent = meta && meta.getAttribute('content'),
			disabledZoom = initialContent + ',maximum-scale=1',
			enabledZoom = initialContent + ',maximum-scale=10',
			enabled = true,
			x,
			y,
			z,
			aig;

		if (!meta) {return;}

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

		var $blocks = $('.blocks > li'),
			blocksEnd = false,
			blocksStart = false,
			endClass = 'blocks-end',
			startClass = 'blocks-start',
			updateNthChild = function () {
				if (rwd.matchViewport('(min-width:640px)')) {
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
				} else if (rwd.matchViewport('(min-width:480px)')) {
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
				} else if (rwd.matchViewport('(min-width:320px)')) {
					blocksEnd = '.blocks > li:nth-child(2n)';
					blocksStart = '.blocks > li:nth-child(2n+1)';
				}

				$blocks.removeClass(startClass).removeClass(endClass);

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
		if (!(value)) {
			return false;
		} else if (Modernizr.mq('only all') && Modernizr.mq(value)) {
			return true;
		} else if ((value.indexOf('min-width') > 0 && rwd.viewportWidth() >= value.replace('(min-width:', '').replace('px)', '')) || (value.indexOf('min-height') > 0 && rwd.viewportHeight() >= value.replace('(min-height:', '').replace('px)', ''))) {
			return true;
		} else {
			return false;
		}
	};

	rwd.onDelayedResize = function (callback, fireNow) {
		if (typeof callback !== 'function') return false;

		if (fireNow && typeof fireNow === 'boolean') {
			callback();
		} else {
			return false;
		}

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
		rwd.detectNthChild();
		rwd.fixBoxSizing();
		rwd.fixIE7Grid();
		rwd.fixiOSOrientation();
		rwd.fixNthChild();
	});
}(window.siteName = window.siteName || {}, jQuery));