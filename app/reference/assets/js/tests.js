(function (win, tests) {
	'use strict';

	var $tests = $('a');

	tests.init = function () {
		var i,
			len = $tests.length,
			$index = $('#index');

		for (i = 0; i < len; i += 1) {
			$index.append('<iframe class="tests" src="' + $tests.eq(i).attr('href') + '"></iframe>');
		}

		$tests.parent().addClass('failed');
	};

	tests.receive = function (event, data) {
		var count = data.result,
			results = ' (<span class="failed">' + count.failed + '</span>, ' +
				'<span class="passed">' + count.passed + '</span>, ' +
				'<span class="total">' + count.total + '</span>)';

		$tests.filter('[href*="' + data.page + '"]').eq(0).parent().removeClass('failed').addClass(data.result.failed < 1 ? 'passed' : 'failed').append(results);

		$('html').addClass($('li.failed').length < 1 ? 'pass' : 'fail');
	};

	tests.send = function () {
		QUnit.done = function (result) {
			win.top.$(win.top.document).trigger('done', {
				page: $('#qunit-header > a').text().replace('.js', ''),
				result: result
			});
		};
	};

	$(function () {
		if (win.self === win.top) {
			tests.init();
			$(document).on('done', tests.receive);
		} else {
			tests.send();
		}
	});
}(window, window.tests = window.tests || {}));