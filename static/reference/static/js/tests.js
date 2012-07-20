(function (win, tests) {
	'use strict';

	tests.init = function ($tests) {
		if (!$tests) $tests = $('a');

		var i,
			len = $tests.length,
			$index = $('#index');

		for (i = 0; i < len; i += 1) {
			$index.append('<iframe class="tests" src="' + $tests.eq(i).attr('href') + '"></iframe>');
		}
	};

	tests.receive = function (event, data) {
		$('a[href="' + data.page + '"]').parent().addClass(data.result.failed > 0 ? 'failed' : 'passed');
	};

	tests.send = function () {
		QUnit.done = function (result) {
			win.top.$(win.top.document).trigger('done', {
				page: $('#qunit-header > a').text().replace('js', 'htm'),
				result: result
			});
		};
	};

	$(function () {
		if (win.self === win.top) {
			tests.init();
			$(document).bind('done', tests.receive);
		} else {
			tests.send();
		}
	});
}(window, window.tests = window.tests || {}));