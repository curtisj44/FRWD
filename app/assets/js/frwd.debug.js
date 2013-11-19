(function (debug, $) {
	'use strict';

	debug.config = {
		baselineAdjust: -8,
		fontSize: parseInt($('html').css('font-size').replace('px', ''), 10),
		lineHeight: function () {
			var value = $('body').css('line-height');
			return (value.indexOf('px') > -1) ? value.replace('px', '') : value * debug.config.fontSize;
		}
	};

	debug.buildPanel = function () {
		$('<div id="debug-panel">' +
			'<button class="debug-cog">Debug</button>' +
			'<ul>' +
			'<li><button data-option="background">Highlight background</button></li>' +
			'<li><button data-option="boxes">Highlight regions</button></li>' +
			'<li><button data-option="baseline">Show baseline</button></li>' +
			'<li><button data-option="grid">Show grid</button></li>' +
			'<li>' +
				'<button data-option="viewport">Viewport details</button>' +
				'<button class="position" data-position="1">Position</button>' +
			'</li>' +
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
			var config = debug.config,
				baselineHeight = (config.lineHeight() - 1) / config.fontSize,
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
				grid = '<div id="debug-grid"><div class="fields">';

			for (i = 0; i <= 16; i += 1) {
				grid += '<div class="region"></div>';
			}

			grid += '</div></div>';

			$('body').append(grid);

			if (!Modernizr.generatedcontent) {
				$('#debug-grid .region').each(function () {
					$(this).prepend('<div class="before"></div>');
				});
			}
		}
	};

	debug.viewport = {
		off: function () {
			$('#debug-viewport').remove();
		},

		on: function () {
			$('body').append('<div id="debug-viewport"></div>');

			var $debugViewport = $('#debug-viewport'),
				content = '',
				mediaQueries = frwd.mediaQueries,
				updateSize = function () {
					$debugViewport.find('span').html(
						debug.viewportWidth() + ' &times; ' + debug.viewportHeight() + ' / ' +
						((window.devicePixelRatio) ? (Math.round(window.devicePixelRatio * 100000) / 100000) : '?')
					);

					$.each(mediaQueries, function (index, value) {
						var result = frwd.matchViewport(index);
						$debugViewport.find('.' + index).removeClass('' + !result).addClass('' + result);
					});
				};

			content += '<span>?</span>' +
						'<table>' +
							'<tr class="none true">' +
								'<th>none</th>' +
								'<td colspan="3">no active media queries</td>' +
							'</tr>';

			$.each(mediaQueries, function (index, value) {
				var query = value.query,
					pixelWidth,
					tr;

				if (query.indexOf('min-width') > 0 && query.indexOf('em') > 0) {
					pixelWidth = Math.round(query.replace('(min-width:', '').replace('em)', '') * debug.config.fontSize * 100000) / 100000;
				}

				content += '<tr class="' + index + '">' +
						'<th>' + index + '</th>' +
						'<td>' + query + '</td>' +
						'<td>' + ((pixelWidth) ? pixelWidth + 'px' : '') + '</td>' +
					'</tr>';
			});

			content += '</table>';

			$debugViewport.html(content);

			updateSize();
			$(window).resize(updateSize);
			debug.viewport.position.init();
			debug.viewport.minimize.init();
		},

		minimize: {
			click: function () {
				// TODO - CJ - cache this selector
				$('#debug-viewport').on('click', function () {
					debug.viewport.minimize[($(this).hasClass('minimized')) ? 'off' : 'on']();
					return false;
				});
			},

			// TODO - CJ - add unit tests
			init: function () {
				if (Modernizr.localstorage && localStorage.getItem('debug-minimized')) {
					debug.viewport.minimize[localStorage.getItem('debug-minimized')]();
				}

				debug.viewport.minimize.click();
			},

			// TODO - CJ - add unit tests
			off: function () {
				// TODO - CJ - cache this selector
				$('#debug-viewport').removeClass('minimized');

				if (Modernizr.localstorage) {
					localStorage.setItem('debug-minimized', 'off');
				}
			},

			// TODO - CJ - add unit tests
			on: function () {
				// TODO - CJ - cache this selector
				$('#debug-viewport').addClass('minimized');

				if (Modernizr.localstorage) {
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

					debug.viewport.position.move(next);

					if (Modernizr.localstorage) {
						localStorage.setItem('debug-position', next);
					}
				});
			},

			// TODO - CJ - add unit tests
			init: function () {
				if (Modernizr.localstorage && localStorage.getItem('debug-position')) {
					debug.viewport.position.move(localStorage.getItem('debug-position'));
				}

				debug.viewport.position.click();
			},

			// TODO - CJ - add unit tests
			move: function (i) {
				var $debugViewport = $('#debug-viewport'),
					keeper = 'minimized',
					reAddClass = ($debugViewport.hasClass(keeper)) ? true : false;

				$debugViewport.removeClass().addClass('position' + i);
				if (reAddClass) $debugViewport.addClass(keeper);
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

	$(debug.buildPanel);
}(window.frwd.debug = window.frwd.debug || {}, jQuery));