(function (s, $) {
	'use strict';

	s.test = function () {
		if (window.console) console.log('siteName');
	};

	$(function () {
		s.test();
	});
}(window.siteName = window.siteName || {}, jQuery));