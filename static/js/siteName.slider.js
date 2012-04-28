(function (s, $) {
	'use strict';

	var slider,
		$slider = $('#mySwipe'),
		$sliderNav,
		sliderLength = $slider.find('li').length;

	s.buildNav = function () {
		var i,
			navArray = [
				'<div class="slider-nav">',
				'<ol>'
			];

		for (i = 0; i < sliderLength; i++) {
			navArray.push('<li><button>' + (i + 1) + '</button></li>');
		}

		navArray.push('</ol>');
		navArray.push('<button class="slider-prev">&lt;</button>');
		navArray.push('<button class="slider-next">&gt;</button>');
		navArray.push('</div>');

		$slider.after(navArray.join(''));
		$sliderNav = $slider.next('.slider-nav');
	};

	s.buildSlider = function () {
		slider = new Swipe($slider[0], {
			callback: function () {
				s.updateNav();
			},
			continuous: false,
			speed: 500 // TODO: use 200 for swipe speed
		});
	};

	s.navEvents = function () {
		$sliderNav.on('click', 'button', function () {
			var action = ($(this).attr('class')) ? $(this).attr('class').replace('disabled', '').replace('slider-', '') : false;

			if (action && !($(this).hasClass('disabled'))) {
				slider[action]();
			}

			if (!(action)) {
				slider.slide($(this).text() - 1);
				s.updateNav();
			}
		});
	};

	s.updateNav = function () {
		var current = slider.index;

		$sliderNav.find('.selected').removeClass('selected');
		$sliderNav.find('li').eq(current).addClass('selected');

		if (current === 0) {
			$sliderNav.find('.slider-prev').addClass('disabled');
		} else if (current === (sliderLength - 1)) {
			$sliderNav.find('.slider-next').addClass('disabled');
		} else {
			$sliderNav.find('.disabled').removeClass('disabled');
		}
	};

	$(function () {
		s.buildSlider();
		s.buildNav();
		s.navEvents();
		s.updateNav();
	});
}(window.siteName.slider = window.siteName.slider || {}, jQuery));