module.exports = function (grunt) {
	'use strict';

	var staging = 'temp',
		output = 'dist';

	// Grunt configuration:
	// https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md
	grunt.initConfig({
		// Project configuration
		// ---------------------

		// Coffee to JS compilation
		// TODO - CJ - remove this
		coffee: {
			compile: {}
		},

		// compile .scss/.sass to .css using Compass
		compass: {
			// http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
			dist: {
				options: {
					css_dir:		 'app/assets/dist/css',
					sass_dir:		 'app/assets/src/scss',
					images_dir:		 'app/assets/dist/images',
					javascripts_dir: 'app/assets/dist/js',
					//debug_info:	 false,
					force:			 true
				}
			}
		},

		// generate application cache manifest
		// TODO - CJ - remove this
		//manifest:{},

		// default watch configuration
		watch: {
			compass: {
				files: [
					'app/assets/src/scss/**/*.{scss,sass}'
				],
				tasks: 'compass reload'
			},
			reload: {
				files: [
					'app/*.html',
					'app/**/*.html',
					'app/assets/src/scss/**/*.css',
					'app/assets/src/js/**/*.js',
					'app/assets/src/images/**/*'
				],
				tasks: 'reload'
			}
		},

		// default lint configuration, change this to match your setup:
		// https://github.com/gruntjs/grunt/blob/master/docs/task_lint.md
		lint: {
			files: [
				'Gruntfile.js',
				'app/assets/src/js/**/*.js',
				'spec/**/*.js'
			]
		},

		// specifying JSHint options and globals
		// https://github.com/gruntjs/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true
			},
			globals: {
				jQuery: true,
				Modernizr: true,
				frwd: true
			}
		},

		// TODO - CJ - does this work?
		//qunit: {
		//	index: ['test/index.html']
		//  files: ['test/**/*.html']
		//}

		// Build configuration
		// -------------------

		// the staging directory used during the process
		staging: staging,

		// final build output
		output: output,

		mkdirs: {
			staging: 'app/'
		},

		// Below, all paths are relative to the staging directory, which is a copy
		// of the app/ directory. Any .gitignore, .ignore and .buildignore file
		// that might appear in the app/ tree are used to ignore these values
		// during the copy process.

		// concat css/**/*.css files, inline @import, output a single minified css
		css: {
			'assets/dist/css/debug.css': 		['assets/dist/css/debug.css'],

			'assets/dist/css/demos.css': 		['assets/dist/css/demos.css'],
			'assets/dist/css/demos.fixed.css': 	['assets/dist/css/demos.fixed.css'],

			'assets/dist/css/global.css': 		['assets/dist/css/global.css'],
			'assets/dist/css/global.fixed.css':	['assets/dist/css/global.fixed.css'],

			'assets/dist/css/slider.css': 		['assets/dist/css/slider.css'],
			'assets/dist/css/slider.fixed.css':	['assets/dist/css/slider.fixed.css']
		},

		/*
		concat: {
			'assets/dist/js/head.js': [
				'assets/src/js/modernizr.custom.js',
				'assets/src/js/matchMedia.js',
				'assets/src/js/frwd.js',
				'assets/src/js/picturefill.js'
			],
			'assets/dist/js/body.js': [
				'assets/src/js/frwd.fixIE7Grid.js',
				'assets/src/js/global.js'
			],
			'assets/dist/js/frwd.debug.js': [
				'assets/src/js/frwd.debug.js'
			],
			'assets/dist/js/slider.js': [
				'assets/src/js/swipe2.js',
				'assets/src/js/frwd.slider.js'
			]
		},

		min: {
			'assets/dist/js/head.min.js': 'assets/dist/js/head.js',
			'assets/dist/js/body.min.js': 'assets/dist/js/body.js',
			'assets/dist/js/frwd.debug.min.js': 'assets/dist/js/frwd.debug.js',
			'assets/dist/js/slider.min.js': 'assets/dist/js/slider.js'
		},
		*/

		// renames JS/CSS to prepend a hash of their contents for easier versioning
		rev: {
			//js:  'assets/dist/js/**/*.js',
			//css: 'assets/dist/css/**/*.css',
			//img: 'assets/dist/images/**'
			img: ''
		},

		// usemin handler should point to the file containing the usemin blocks to be parsed
		'usemin-handler': {
			//html: 'index.html'
			//html: '*.html'
			html: '**/*.html'
		},

		// update references in HTML/CSS to revved files
		usemin: {
			html: ['**/*.html'],
			css: ['**/*.css']
		},

		// HTML minification
		html: {
			files: ['**/*.html']
		},

		// Optimizes JPGs and PNGs (with jpegtran & optipng)
		img: {
			//dist: '<config:rev.img>'
			dist: 'assets/dist/images/**'
		},

		// rjs configuration. You don't necessarily need to specify the typical
		// `path` configuration, the rjs task will parse these values from your
		// main module, using http://requirejs.org/docs/optimization.html#mainConfigFile
		//
		// name / out / mainConfig file should be used. You can let it blank if
		// you're using usemin-handler to parse rjs config from markup (default setup)
		rjs: {
			// no minification, is done by the min task
			optimize: 'none',
			baseUrl: './assets/src/js',
			wrap: true/*,
			name: 'main'
			*/
		},
	});
};