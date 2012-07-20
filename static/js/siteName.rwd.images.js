(function (images, $) {
	'use strict';

	var $images = $('.image-rwd'),
		imagesTotal = $images.length,
		matches,
		$lastMatch;

	images.init = function () {
		var i = 0,
			$this;

		for (i; i < imagesTotal; i += 1) {
			$this = $images.eq(i);
			images.checkMedia($this);
			images.handleImage($this);
		}
	};

	images.checkMedia = function ($this) {
		if (typeof $this !== 'object') return;

		var i = 0,
			$options = $this.find('span'),
			optionsLength = $options.length,
			size,
			$thisOption;

		matches = [];
		$lastMatch = '';

		for (i; i < optionsLength; i += 1) {
			$thisOption = $options.eq(i);
			size = $thisOption.attr('data-media');

			// TODO - CJ - make this work with High-DPI images
			if (!size || siteName.rwd.matchViewport(size)) {
				$lastMatch = $thisOption;
				matches.push($thisOption[0]);
			}
		}
	};

	images.handleImage = function ($this) {
		if (typeof $this !== 'object') return;

		var $img = $this.find('img');

		if (matches.length) {
			var correctAlt = $lastMatch.attr('data-alt') || $images.attr('data-alt'),
				correctSrc = $lastMatch.attr('data-src');

			if (correctSrc !== $img.attr('src')) {
				if ($img.length < 1) {
					$this.append('<img />');
					$img = $this.find('img');
				}

				$img.attr({
					alt: correctAlt,
					src: correctSrc
				});
			}
		} else {
			$img.remove();
		}
	};

	$(function () {
		siteName.rwd.onDelayedResize(images.init, true);
	});
}(window.siteName.rwd.images = window.siteName.rwd.images || {}, jQuery));