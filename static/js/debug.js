(function (debug, $) {
	'use strict';

	debug.rwd = {};

	debug.rwd.backgroundAdd = function () {
		$('html').addClass('debug');
	};

	debug.rwd.backgroundRemove = function () {
		$('html').removeClass('debug');
	};

	debug.rwd.baselineAdd = function () {
		var adjustStart = -4,
			fontSize = 16,
			lineHeight = 24,
			baselineHeight = (lineHeight - 1) / fontSize,
			baselineLength = $(document).height() / lineHeight,
			i,
			output = '';

		for (i = baselineLength; i > 0; i -= 1) {
			output += '<li style="height:' + baselineHeight + 'em"></li>';
		}

		$('body').append('<ol id="debug-baseline" style="top:' + adjustStart + 'px">' + output + '</ol>');
	};

	debug.rwd.baselineRemove = function () {
		$('#debug-baseline').remove();
	};

	debug.rwd.boxesAdd = function () {
		$.each($('.region').not('#debug-grid .region, .region .region'), function (index, value) {
			$(value).wrapInner('<div class="debug-box"></div>');
			$(value).find('.debug-box').append('<div class="debug-number">' + (index + 1) + '</div>');
		});
	};

	debug.rwd.boxesRemove = function () {
		$('.debug-number').remove();

		$.each($('.debug-box'), function (index, value) {
			var $debugBox = $(value);
			$debugBox.contents().appendTo($debugBox.parent());
			$debugBox.remove();
		});
	};

	debug.rwd.gridAdd = function () {
		var grid = '<div id="debug-grid">' +
			'<div class="container">' +
			'<div class="fields">' +
			'<div class="region size1of6"></div>' +
			'<div class="region size1of6"></div>' +
			'<div class="region size1of6"></div>' +
			'<div class="region size1of6"></div>' +
			'<div class="region size1of6"></div>' +
			'<div class="region size1of6"></div>' +
			'</div>' +
			'</div>' +
			'</div>';

		$('body').append(grid);

		if (!Modernizr.generatedcontent) {
			$('#debug-grid .region').each(function () {
				$(this).prepend('<div class="before"></div>');
			});
		}
	};

	debug.rwd.gridRemove = function () {
		$('#debug-grid').remove();
	};

	debug.rwd.buildPanel = function () {
		var $output = $('<div id="debug-panel">' +
				'<button class="debug-view" data-close="&times;">&curren;</button>' +
				'<ul>' +
				'<li><button data-option="background">Background</button></li>' +
				'<li><button data-option="baseline">Baseline</button></li>' +
				'<li><button data-option="boxes">Boxes</button></li>' +
				'<li><button data-option="grid">Grid</button></li>' +
				'<li><button data-option="windowSize">Window Size</button></li>' +
				'</ul>' +
				'</div>').appendTo('body'),
			$panel = $('#debug-panel'),
			$optionButtons = $panel.find('ul button'),
			$viewButton = $panel.find('button.debug-view'),
			optionsArray = [];

		$.each($optionButtons, function (index, value) {
			optionsArray.push($(value).attr('data-option'));
		});

		/* ---- option buttons ---- */
		$optionButtons.bind('click', function () {
			var $input = $(this),
				$option = $input.attr('data-option');

			if ($input.hasClass('on')) {
				debug.rwd[$option + 'Remove']();
				$input.removeClass('on');

				if (Modernizr.localstorage) {
					localStorage.removeItem('debug-' + $option);
				}
			} else {
				debug.rwd[$option + 'Add']();
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
		$viewButton.attr('data-open', $viewButton.html());

		$viewButton.bind('click', function () {
			if ($panel.hasClass('open')) {
				$panel.removeClass('open');
				$viewButton.html($viewButton.attr('data-open'));
			} else {
				$panel.addClass('open');
				$viewButton.html($viewButton.attr('data-close'));
			}
		});
	};

	debug.rwd.windowSizeAdd = function () {
		var $debugSize = $('<div id="debug-size"></div>').appendTo('body'),
			updateSize = function () {
				var mediaQueries = [
						'only screen and (min-width:320px)',
						'only screen and (min-width:480px)',
						'only screen and (min-width:640px)',
						'only screen and (min-width:769px)',
						'(-moz-min-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5)'
					],
					mediaQueriesActive = '',
					viewportHeight = siteName.rwd.viewportHeight(),
					viewportWidth = siteName.rwd.viewportWidth();

				$.each(mediaQueries, function (index, value) {
					if (Modernizr.mq(value)) {
						mediaQueriesActive += '<li>' + value + '</li>';
					}
				});

				$debugSize.html(viewportWidth + ' &times; ' + viewportHeight + '<ol>' + (mediaQueriesActive || '<li>no active media queries</li>') + '</ol>');
			};

		updateSize();

		$(window).resize(function () {
			updateSize();
		});
	};

	debug.rwd.windowSizeRemove = function () {
		$('#debug-size').remove();
	};

	$(function () {
		debug.rwd.buildPanel();
	});
}(window.siteName.debug = window.siteName.debug || {}, jQuery));