(function (debug, $) {
	'use strict';

	debug.config = {
		baselineAdjust: -8,

		fontSize: function (element) {
			return parseInt($(element).css('font-size').replace('px', ''), 10);
		},

		lineHeight: function () {
			var value = $('body').css('line-height');
			return (value.indexOf('px') > -1) ? value.replace('px', '') : value * debug.config.fontSize('html');
		}
	};

	debug.buildPanel = function () {
		$('<div id="debug-panel">' +
			'<button class="debug-cog">Debug</button>' +
			'<ul>' +
			'<li><button data-option="boxes">Highlight regions</button></li>' +
			'<li><button data-option="baseline">Show baseline</button></li>' +
			'<li><button data-option="grid">Show grid</button></li>' +
			'<li><button data-option="viewportSize">Viewport size</button></li>' +
			'<li>' +
				'<button data-option="viewportSummary">Viewport summary</button>' +
				'<button class="position" data-position="1">Position</button>' +
			'</li>' +
			'<li><button data-option="visualize">Visualize breakpoints</button></li>' +
			'</ul>' +
			'</div>').appendTo('body');

		var $panel = $('#debug-panel');

		debug.buildButtons.options($panel);
		debug.buildButtons.view($panel);
	};

	debug.buildButtons = {
		options: function ($panel) {
			var $optionButtons = $panel.find('[data-option]'),
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

					if (window.localStorage) {
						localStorage.removeItem('debug-' + $option);
					}
				} else {
					debug[$option].on();
					$input.addClass('on');

					if (window.localStorage) {
						localStorage.setItem('debug-' + $option, true);
					}
				}
			});

			if (window.localStorage) {
				$.each(optionsArray, function (index, value) {
					if (localStorage.getItem('debug-' + value) === 'true') {
						$optionButtons.filter('[data-option="' + value + '"]').trigger('click');
					}
				});
			}
		},

		view: function ($panel) {
			var $button = $panel.children('button'),

				closePanel = function () {
					$panel.removeClass('open');
					$(document).off('click.debugPanel');
				},

				openPanel = function () {
					$panel.addClass('open');

					$(document).on('click.debugPanel', function (e) {
						if ($(e.target).parents().filter($panel).length !== 1) {
							closePanel();
						}
					});
				};

			$button.on('click', function () {
				if ($panel.hasClass('open')) {
					closePanel();
				} else {
					openPanel();
				}

				return false;
			});
		}
	};

	debug.baseline = {
		off: function () {
			$('#debug-baseline').remove();
		},

		on: function () {
			var config = debug.config,
				baselineHeight = (config.lineHeight() - 1) / config.fontSize('body'),
				baselineLength = $(document).height() / config.lineHeight(),
				i,
				output = [];

			for (i = 0; i <= baselineLength; i += 1) {
				output.push('<li style="height:' + baselineHeight + 'em"></li>');
			}

			$('body').append('<ol id="debug-baseline" style="top:' + config.baselineAdjust + 'px">' + output.join('') + '</ol>');
		}
	};

	debug.boxes = {
		off: function () {
			$('html').removeClass('debug');

			$('.debug-number').remove();

			$.each($('.debug-box'), function (index, value) {
				var $debugBox = $(value);
				$debugBox.contents().appendTo($debugBox.parent());
				$debugBox.remove();
			});
		},

		on: function () {
			$('html').addClass('debug');

			$.each($('.region').not('#debug-grid .region, .region .region'), function (index, value) {
				$(value)
					.wrapInner('<div class="debug-box"></div>')
					.find('.debug-box').append('<div class="debug-number">' + (index + 1) + '</div>');
			});
		}
	};

	debug.calculatePixels = function (query, property) {
		var value;

		if (query.indexOf(property) > 0) {
			value = query.replace('(' + property + ':', '');

			if (query.indexOf('em') > 0) {
				value = Math.round(value.replace('em)', '') * debug.config.fontSize('html') * 100000) / 100000;
			}

			if (query.indexOf('px') > 0) {
				value = value.replace('px)', '');
			}
		}

		return value ? value : false;
	};

	debug.grid = {
		off: function () {
			$('#debug-grid').remove();
		},

		on: function () {
			var i,
				grid = '<div id="debug-grid"><div class="fields">';

			for (i = 0; i <= 16; i += 1) {
				grid += '<div class="region"></div>';
			}

			grid += '</div></div>';

			$('body').append(grid);
		}
	};

	debug.viewportSize = {
		off: function () {
			$('#debug-viewport-size').remove();
		},

		on: function () {
			$('body').append('<div id="debug-viewport-size"></div>');

			var $debugViewportSize = $('#debug-viewport-size'),

				updateSize = function () {
					$debugViewportSize.html(
						debug.viewportWidth() + ' &times; ' + debug.viewportHeight() + ' / ' +
						(window.devicePixelRatio ? (Math.round(window.devicePixelRatio * 100000) / 100000) : '?')
					);
				};

			updateSize();
			$(window).resize(updateSize);
		}
	};

	debug.viewportSummary = {
		off: function () {
			$('#debug-viewport-summary').remove();
		},

		on: function () {
			$('body').append('<div id="debug-viewport-summary"></div>');

			var $debugViewportSummary = $('#debug-viewport-summary'),
				content = '',
				mediaQueries = frwd.mediaQueries,

				updateSize = function () {
					$.each(mediaQueries, function (index, value) {
						var result = frwd.matchViewport(index);
						$debugViewportSummary.find('.' + index).removeClass('' + !result).addClass('' + result);
					});
				};

			content += '<table>' +
				'<tr class="none true">' +
					'<th>none</th>' +
					'<td colspan="3">no active media queries</td>' +
				'</tr>';

			$.each(mediaQueries, function (index, value) {
				var query = value.query,
					pixels = debug.calculatePixels(query, 'min-width') || debug.calculatePixels(query, 'min-height');

				content += '<tr class="' + index + '">' +
						'<th>' + index + '</th>' +
						'<td>' + query + '</td>' +
						'<td>' + (pixels ? pixels + 'px' : '') + '</td>' +
					'</tr>';
			});

			content += '</table>';

			$debugViewportSummary.html(content);

			updateSize();
			$(window).resize(updateSize);
			debug.viewportSummary.position.init();
			debug.viewportSummary.minimize.init();
		},

		minimize: {
			click: function () {
				// TODO - CJ - cache this selector
				$('#debug-viewport-summary').on('click', function () {
					debug.viewportSummary.minimize[($(this).hasClass('minimized')) ? 'off' : 'on']();
					return false;
				});
			},

			// TODO - CJ - add unit tests
			init: function () {
				if (window.localStorage && localStorage.getItem('debug-minimized')) {
					debug.viewportSummary.minimize[localStorage.getItem('debug-minimized')]();
				}

				debug.viewportSummary.minimize.click();
			},

			// TODO - CJ - add unit tests
			off: function () {
				// TODO - CJ - cache this selector
				$('#debug-viewport-summary').removeClass('minimized');

				if (window.localStorage) {
					localStorage.setItem('debug-minimized', 'off');
				}
			},

			// TODO - CJ - add unit tests
			on: function () {
				// TODO - CJ - cache this selector
				$('#debug-viewport-summary').addClass('minimized');

				if (window.localStorage) {
					localStorage.setItem('debug-minimized', 'on');
				}
			},
		},

		position: {
			// TODO - CJ - add unit tests
			click: function () {
				$('#debug-panel').find('.position').off('click').on('click', function () {
					var current = $(this).attr('data-position'),
						next = parseInt(current, 10) + 1;

					if (next > 4) next = 1;

					debug.viewportSummary.position.move(next);

					if (window.localStorage) {
						localStorage.setItem('debug-position', next);
					}
				});
			},

			// TODO - CJ - add unit tests
			init: function () {
				if (window.localStorage && localStorage.getItem('debug-position')) {
					debug.viewportSummary.position.move(localStorage.getItem('debug-position'));
				}

				debug.viewportSummary.position.click();
			},

			// TODO - CJ - add unit tests
			move: function (i) {
				var $debugViewportSummary = $('#debug-viewport-summary'),
					keeper = 'minimized',
					reAddClass = ($debugViewportSummary.hasClass(keeper)) ? true : false;

				$debugViewportSummary.removeClass().addClass('position' + i);
				if (reAddClass) $debugViewportSummary.addClass(keeper);
				$('#debug-panel').find('.position').attr('data-position', i);
			}
		}
	};

	debug.viewportHeight = function () {
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
	};

	debug.viewportWidth = function () {
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
	};

	debug.visualize = {
		off: function () {
			$('.debug-visualize').remove();
		},

		on: function () {
			var query,
				widths = '',
				heights = '';

			$.each(frwd.mediaQueries, function (index, value) {
				query = value.query;

				if (query.indexOf('min-width') > 0) {
					value = debug.calculatePixels(query, 'min-width');
					widths += '<li style="width: ' + value + 'px"><span>' + index + '</span></li>';
				}

				if (query.indexOf('min-height') > 0) {
					value = debug.calculatePixels(query, 'min-height');
					heights += '<li style="height: ' + value + 'px"><span>' + index + '</span></li>';
				}
			});

			if (widths) {
				$('body').append('<ol class="debug-visualize debug-visualize-width">' + widths + '</ol>');
			}

			if (heights) {
				$('body').append('<ol class="debug-visualize debug-visualize-height">' + heights + '</ol>');
			}
		}
	};

	$(debug.buildPanel);
}(window.frwd.debug = window.frwd.debug || {}, jQuery));