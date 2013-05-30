/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with divs). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */
// revised to use frwd.matchViewport()

(function (w) {
	'use strict';

	w.picturefill = function () {
		var ps = w.document.getElementsByTagName('span');

		// Loop the pictures
		for (var i = 0, il = ps.length; i < il; i++) {
			if (ps[i].className.indexOf('image-rwd') >= 0) {
				var sources = ps[i].getElementsByTagName('span'),
					matches = [];

				// See if which sources match
				for (var j = 0, jl = sources.length; j < jl; j++) {
					var media = sources[j].getAttribute('data-media');

					if (!media || frwd.matchViewport(media)) {
						matches.push(sources[j]);
					}
				}

				// Find any existing img element in the picture element
				var picImg = ps[i].getElementsByTagName('img')[0];

				if (matches.length) {
					if (!picImg) {
						picImg = w.document.createElement('img');
						picImg.alt = ps[i].getAttribute('data-alt');
						ps[i].appendChild(picImg);
					}

					picImg.src =  matches.pop().getAttribute('data-src');
				} else if (picImg) {
					ps[i].removeChild(picImg);
				}
			}
		}
	};

	if (w.addEventListener) {
		frwd.onDelayedResize(w.picturefill, false);

		w.addEventListener('DOMContentLoaded', function() {
			w.picturefill();
			// Run once only
			w.removeEventListener('load', w.picturefill, false);
		}, false);

		w.addEventListener('load', w.picturefill, false);
	} else if (w.attachEvent) {
		w.attachEvent('onload', w.picturefill);
	}
}(window));