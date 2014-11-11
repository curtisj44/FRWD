'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		settings: {
			dev: 'app',
			dist: 'dist'
		},

		watch: {
			options: {
				spawn: false
			},
			mediaQueries: {
				files: [
					'<%= settings.dev %>/assets/css/variables/_media-queries.scss'
				],
				tasks: [
					'copy:mediaQueries'
				],
			},
			css: {
				files: [
					'<%= settings.dev %>/assets/css/{,*/}*.scss'
				],
				tasks: [
					'concurrent:server',
					'autoprefixer',
					'cmq'
				],
			},
			js: {
				files: [
					'<%= settings.dev %>/assets/js/{,*/}*.js'
				],
				tasks: [
					'concat',
					'kss:server'
				],
			},
			kss: {
				files: [
					'<%= settings.dev %>/styleguide-template/{,*/}*.*',
				],
				tasks: [
					'kss:server'
				],
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= settings.dev %>/*.html',
					'<%= settings.dev %>/assets/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}',
					'<%= settings.dev %>/styleguide/{,*/}*.{less,html,js,sass,scss}',
					'.tmp/assets/css/{,*/}*.css',
					'{.tmp,<%= settings.dev %>}/assets/js/{,*/}*.js'
				]
			}
		},

		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
					base: [
						'.tmp',
						'<%= settings.dev %>'
					]
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= settings.dist %>',
					livereload: false
				}
			}
		},

		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= settings.dist %>/*',
						'!<%= settings.dist %>/.git*'
					]
				}]
			},
			distFinal: {
				files: [{
					src: [
						'<%= settings.dist %>/styleguide/public/kss.less',
						'<%= settings.dist %>/styleguide/public/style.css'
					]
				}],
			},
			server: '.tmp'
		},

		sass: {
			server: {
				options: {
					precision: 6,
					style: 'expanded'
				},
				files: [{
					cwd: '<%= settings.dev %>/assets/css',
					dest: '.tmp/assets/css/',
					dot: true,
					expand: true,
					rename: function (dest, src) {
						return dest + src.replace('.scss', '.css');
					},
					src: ['{,*/}*.scss']
				}]
			}
		},

		// combine JS
		concat: {
			'.tmp/assets/js/frwd.debug.js': [
				'<%= settings.dev %>/assets/js/frwd.debug.js'
			],

			'.tmp/assets/js/head.js': [
				'<%= settings.dev %>/assets/js/modernizr.custom.js',
				'<%= settings.dev %>/assets/bower_components/matchmedia/matchMedia.js',
				'<%= settings.dev %>/assets/js/frwd.js',
				'<%= settings.dev %>/assets/js/frwd.mediaQueries.js',
				'<%= settings.dev %>/assets/js/picturefill.js'
			],

			'.tmp/assets/js/slider.js': [
				'<%= settings.dev %>/assets/js/swipe2.js',
				'<%= settings.dev %>/assets/js/frwd.slider.js'
			]
		},

		// minify JS
		uglify: {
			'<%= settings.dist %>/assets/js/frwd.debug.js': 		'.tmp/assets/js/frwd.debug.js',
			'<%= settings.dist %>/assets/js/head.js': 				'.tmp/assets/js/head.js',
			'<%= settings.dist %>/assets/js/slider.js': 			'.tmp/assets/js/slider.js'
		},

		// minify CSS
		cssmin: {
			'<%= settings.dist %>/assets/css/debug.css': 			'.tmp/assets/css/debug.css',
			'<%= settings.dist %>/assets/css/debug.fixed.css': 		'.tmp/assets/css/debug.fixed.css',

			'<%= settings.dist %>/assets/css/demos.css': 			'.tmp/assets/css/demos.css',
			'<%= settings.dist %>/assets/css/demos.fixed.css': 		'.tmp/assets/css/demos.fixed.css',

			'<%= settings.dist %>/assets/css/global.css': 			'.tmp/assets/css/global.css',
			'<%= settings.dist %>/assets/css/global.fixed.css': 	'.tmp/assets/css/global.fixed.css',

			'<%= settings.dist %>/assets/css/slider.css': 			'.tmp/assets/css/slider.css',
			'<%= settings.dist %>/assets/css/slider.fixed.css': 	'.tmp/assets/css/slider.fixed.css'
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= settings.dev %>/assets/images',
					src: '{,*/}*.{gif,jpeg,jpg,png}',
					dest: '<%= settings.dist %>/assets/images'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					/*
					removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true
					*/
				},
				files: [{
					expand: true,
					cwd: '<%= settings.dev %>',
					src: '*.html',
					dest: '<%= settings.dist %>'
				}]
			}
		},

		// Put files not handled in other tasks here
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= settings.dev %>',
					dest: '<%= settings.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'assets/images/{,*/}*.{webp,gif}',
						'assets/fonts/{,*/}*.*'
					]
				}]
			},

			styles: {
				expand: true,
				dot: true,
				cwd: '<%= settings.dev %>/assets/css',
				dest: '.tmp/assets/css/',
				src: '{,*/}*.css'
			},

			normalize: {
				src: '<%= settings.dev %>/assets/bower_components/normalize-css/normalize.css',
				dest: '<%= settings.dev %>/assets/css/global/_normalize.scss'
			},

			mediaQueries: {
				src: '<%= settings.dev %>/assets/css/variables/_media-queries.scss',
				dest: '<%= settings.dev %>/assets/js/frwd.mediaQueries.js',
				options: {
					process: function (content, srcpath) {
						var data = content.replace(/\$/g, '\t\'')
							.replace(/: \'/g, '\': {\'query\': \'')
							.replace(/\+ \(/g, '+ ')
							.replace(/\) \+/g, ' +')
							.replace(/;/g, '},');

						if (data.charAt(data.length - 1) === ',') {
							data = data.substring(0, data.length - 1);
						}

						return '// Do not edit. This file is generated via "grunt copy:mediaQueries"\nfrwd.mediaQueries = {\n' + data + '\n};';
					}
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: [
					'> 1%',
					'last 2 versions',
					'ff 17',
					'ie 8',
					'opera 12.1'
				]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/assets/css/',
					src: '{,*/}*.css',
					dest: '.tmp/assets/css/'
				}]
			}
		},

		cmq: {
			// options: {
			// 	log: true
			// },
			your_target: {
				files: {
					'.tmp/assets/css/': '.tmp/assets/css/{,*/}*.css'
				}
			}
		},

		bump: {
			options: {
				files: [
					'bower.json',
					'package.json'
				],
				commit: false,
				commitMessage: 'Version bumped to v%VERSION%',
				createTag: false,
				push: false
			}
		},

		kss: {
			options: {
				includeType: 'sass',
				template: '<%= settings.dev %>/styleguide-template'
			},
			server: {
				files: {
					'<%= settings.dev %>/styleguide': ['<%= settings.dev %>/assets/css']
				}
			},
			dist: {
				files: {
					'<%= settings.dist %>/styleguide': ['<%= settings.dev %>/assets/css']
				}
			}
		},

		concurrent: {
			server: [
				'sass:server',
				'copy:styles',
				'kss:server'
			],
			dist: [
				'sass:server',
				'copy:styles',
				'imagemin',
				'htmlmin',
				'kss:dist'
			]
		}
	});

	grunt.registerTask('build', [
		'clean:dist',
		'copy:normalize',
		'copy:mediaQueries',
		'concurrent:dist',
		'autoprefixer',
		'cmq',
		'concat',
		'cssmin',
		'uglify',
		'copy:dist',
		'htmlmin',
		'clean:distFinal',
	]);

	grunt.registerTask('default', [
		'serve'
	]);

	grunt.registerTask('serve', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'copy:normalize',
			'copy:mediaQueries',
			'concurrent:server',
			'autoprefixer',
			'cmq',
			'concat',
			'connect:livereload',
			'watch'
		]);
	});
};
