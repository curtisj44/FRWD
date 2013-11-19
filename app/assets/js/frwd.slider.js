(function (s, $) {
	'use strict';


	Swipe.prototype.navBuild = function (slider) {
		var i,
			navArray = [
				'<div class="slider-nav">',
				'<ol>'
			],
			$slider = $(slider.container),
			sliderLength = $slider.find('li').length;

		for (i = 0; i < sliderLength; i++) {
			navArray.push('<li><button>' + (i + 1) + '</button></li>');
		}

		navArray.push('</ol>');
		navArray.push('<button class="slider-prev">Previous</button>');
		navArray.push('<button class="slider-next">Next</button>');
		navArray.push('</div>');

		$slider.after(navArray.join(''));
	};

	Swipe.prototype.navClick = function (slider) {
		var $slider = $(slider.container);

		$slider.next('.slider-nav').on('click', 'button', function () {
			var $this = $(this),
				action = ($this.attr('class')) ? $this.attr('class').replace('disabled', '').replace('slider-', '') : false;

			if (action && !($this.hasClass('disabled'))) {
				slider[action]();
			}

			if (!(action)) {
				slider.slide($this.text() - 1);
				Swipe.prototype.navUpdate(slider);
			}
		});
	};

	Swipe.prototype.navUpdate = function (slider) {
		var current = slider.index,
			$slider = $(slider.container),
			sliderLength = $slider.find('li').length,
			$sliderNav = $slider.next('.slider-nav');

		$sliderNav.find('.selected').removeClass('selected');
		$sliderNav.find('li').eq(current).addClass('selected');
		$sliderNav.find('.disabled').removeClass('disabled');

		if (current === 0) {
			$sliderNav.find('.slider-prev').addClass('disabled');
		}

		if (current === (sliderLength - 1)) {
			$sliderNav.find('.slider-next').addClass('disabled');
		}
	};

	s.init = function ($sliders) {
		s.isEnabled = true;

		// TODO - CJ - use for loop
		$.each($sliders, function (index, value) {
			var slider = new Swipe($sliders[index], {
				callback: function () {
					Swipe.prototype.navUpdate(slider);
				},
				continuous: false,
				speed: Modernizr.touch ? 200 : 500
			});

			$(slider.container).find('li').show();

			Swipe.prototype.navBuild(slider);
			Swipe.prototype.navClick(slider);
			Swipe.prototype.navUpdate(slider);
		});
	};

	$(function () {
		s.init($('.slider'));
	});
}(window.frwd.slider = window.frwd.slider || {}, jQuery));