(function (debug, $) {
	'use strict';

	debug.config = {
		baseline: {
			adjustStart: -5,
			fontSize: 16, // TODO - CJ - calculate from <html>
			lineHeight: 24  // TODO - CJ - calculate from <html>
		},
		grid: {
			columns: 6
		}
	};

	debug.buildPanel = function () {
		$('<div id="debug-panel">' +
			'<button class="debug-view" data-close="&times;">&curren;</button>' +
			'<ul>' +
			'<li><button data-option="background">Background</button></li>' +
			'<li><button data-option="baseline">Baseline</button></li>' +
			'<li><button data-option="boxes">Boxes</button></li>' +
			'<li><button data-option="grid">Grid</button></li>' +
			'<li><button data-option="windowSize">Window Size</button></li>' +
			'</ul>' +
			'</div>').appendTo('body');

		var $panel = $('#debug-panel'),
			$optionButtons = $panel.find('ul button'),
			$viewButton = $panel.find('button.debug-view'),
			optionsArray = [];

		$.each($optionButtons, function (index, value) {
			optionsArray.push($(value).attr('data-option'));
		});

		/* ---- option buttons ---- */
		$optionButtons.on('click', function () {
			var $input = $(this),
				$option = $input.attr('data-option');

			if ($input.hasClass('on')) {
				debug[$option].off();
				$input.removeClass('on');

				if (Modernizr.localstorage) {
					localStorage.removeItem('debug-' + $option);
				}
			} else {
				debug[$option].on();
				$input.addClass('on');

				if (Modernizr.localstorage) {
					localStorage.setItem('debug-' + $option, true);
				}
			}
		});

		if (Modernizr.localstorage) {
			$.each(optionsArray, function (index, value) {
				if (localStorage.getItem('debug-' + value) === 'true') {
					$optionButtons.filter('[data-option="' + value + '"]').trigger('click');
				}
			});
		}

		/* ---- view button ---- */
		var closePanel = function () {
				$panel.removeClass('open');
				$viewButton.html($viewButton.attr('data-open'));
				$(document).off('click.debugPanel');
			},
			openPanel = function () {
				$panel.addClass('open');
				$viewButton.html($viewButton.attr('data-close'));

				$(document).on('click.debugPanel', function (e) {
					if ($(e.target).parents().filter($panel).length !== 1) {
						closePanel();
					}
				});
			};

		$viewButton.attr('data-open', $viewButton.html());

		$viewButton.on('click', function () {
			if ($panel.hasClass('open')) {
				closePanel();
			} else {
				openPanel();
			}

			return false;
		});
	};

	debug.background = {
		off: function () {
			$('html').removeClass('debug');
		},

		on: function () {
			$('html').addClass('debug');
		}
	};

	debug.baseline = {
		off: function () {
			$('#debug-baseline').remove();
		},

		on: function () {
			var config = debug.config.baseline,
				baselineHeight = (config.lineHeight - 1) / config.fontSize,
				baselineLength = $(document).height() / config.lineHeight,
				i,
				output = '';

			for (i = baselineLength; i > 0; i -= 1) {
				output += '<li style="height:' + baselineHeight + 'em"></li>';
			}

			$('body').append('<ol id="debug-baseline" style="top:' + config.adjustStart + 'px">' + output + '</ol>');
		}
	};

	debug.boxes = {
		off: function () {
			$('.debug-number').remove();

			$.each($('.debug-box'), function (index, value) {
				var $debugBox = $(value);
				$debugBox.contents().appendTo($debugBox.parent());
				$debugBox.remove();
			});
		},

		on: function () {
			$.each($('.region').not('#debug-grid .region, .region .region'), function (index, value) {
				$(value).wrapInner('<div class="debug-box"></div>');
				$(value).find('.debug-box').append('<div class="debug-number">' + (index + 1) + '</div>');
			});
		}
	};

	debug.grid = {
		off: function () {
			$('#debug-grid').remove();
		},

		on: function () {
			var i,
				columns = debug.config.grid.columns,
				grid = ['<div id="debug-grid">', '<div class="container">', '<div class="fields">'];

			for (i = 0; i <= columns; i++) {
				grid.push('<div class="region size1of' + columns + '"></div>');
			}

			grid.push('<div>', '<div>', '<div>');

			$('body').append(grid.join(''));

			if (!Modernizr.generatedcontent) {
				$('#debug-grid .region').each(function () {
					$(this).prepend('<div class="before"></div>');
				});
			}
		}
	};

	debug.windowSize = {
		off: function () {
			$('#debug-size').remove();
		},

		on: function () {
			$('body').append('<div id="debug-size"></div>');

			var $debugSize = $('#debug-size'),
				content = [],
				rwd = siteName.rwd,
				updateSize = function () {
					$debugSize.find('span').html(rwd.viewportWidth() + ' &times; ' + rwd.viewportHeight());
				};

			content.push('<span>?</span>');
			content.push('<ol>');
			content.push('<li class="none">no active media queries</li>');

			$.each(rwd.mediaQueries, function (index, value) {
				var query = value.query,
					width;

				if (query.indexOf('min-width') > 0 && query.indexOf('em') > 0) {
					width = query.replace('(min-width:', '').replace('em)', '') * debug.config.baseline.fontSize + 'px';
				}

				content.push('<li class="' + index + '">' + index + ' = ' + query + ((width) ? ' = ' + width : '') + '</li>');
			});

			content.push('</ol>');

			// TODO - CJ - add this back in?
			//if (!(Modernizr.mq('all'))) {
			//	content.push('(polyfilled)');
			//}

			content.push('<button class="close">&times;</button>');

			$debugSize.html(content.join(''));

			$debugSize.find('.close').on('click', function () {
				$('#debug-panel').find('button[data-option="windowSize"]').trigger('click');
			});

			updateSize();

			$(window).resize(function () {
				updateSize();
			});
		}
	};

	$(function () {
		debug.buildPanel();
	});
}(window.siteName.debug = window.siteName.debug || {}, jQuery));