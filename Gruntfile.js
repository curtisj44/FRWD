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
		// configurable paths
		yeoman: {
			app: 'app',
			dist: 'dist'
		},

		watch: {
			options: {
				nospawn: false
			},
			compass: {
				files: ['<%= yeoman.app %>/assets/css/{,*/}*.{scss,sass}'],
				tasks: [
					'copy:normalize',
					'copy:mediaQueries',
					'compass:server',
					'autoprefixer',
					'cmq'
				]
			},
			styles: {
				files: ['<%= yeoman.app %>/assets/css/{,*/}*.css'],
				tasks: [
					'copy:styles'
				]
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/*.html',
					'.tmp/assets/css/{,*/}*.css',
					'{.tmp,<%= yeoman.app %>}/assets/js/{,*/}*.js',
					'<%= yeoman.app %>/assets/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
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
						'<%= yeoman.app %>'
					]
				}
			},
			test: {
				options: {
					base: [
						'.tmp',
						'test',
						'<%= yeoman.app %>'
					]
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= yeoman.dist %>',
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
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/assets/js/{,*/}*.js',
				'!<%= yeoman.app %>/assets/js/vendor/*',
				'test/spec/{,*/}*.js'
			]
		},

		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
				}
			}
		},

		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/assets/css',
				cssDir: '.tmp/assets/css',
				generatedImagesDir: '.tmp/assets/images/generated',
				imagesDir: '<%= yeoman.app %>/assets/images',
				javascriptsDir: '<%= yeoman.app %>/assets/js',
				fontsDir: '<%= yeoman.app %>/assets/fonts',
				importPath: '<%= yeoman.app %>/assets/bower_components',
				httpImagesPath: '/assets/images',
				httpGeneratedImagesPath: '/assets/images/generated',
				httpFontsPath: '/assets/fonts',
				relativeAssets: false,
				assetCacheBuster: false
			},
			dist: {
				options: {
					generatedImagesDir: '<%= yeoman.dist %>/assets/images/generated'
				}
			},
			server: {
				options: {
					debugInfo: true,
					outputStyle: 'expanded'
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

		// not used since Uglify task does concat, but still available if needed
		/*
		concat: {
			generated: {
				files: [{
					dest: '.tmp/concat/assets/js/global.js',
					src: [
						'.tmp/assets/js/main.js',
						'app/assets/js/main.js',
						'.tmp/assets/js/test.js',
						'app/assets/js/test.js'
					]
				}]
			}
		},
		*/

		// not enabled since usemin task does concat and uglify
		// check index.html to edit your build targets
		// enable this task if you prefer defining your build targets here
		/*
		uglify: {
			generated: {
				files: [{
					dest: 'dist/assets/js/head.js',
					src: ['.tmp/concat/assets/js/head.js']
				}]
			}
		},
		*/

		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/assets/js/{,*/}*.js',
						'<%= yeoman.dist %>/assets/css/{,*/}*.css',
						'<%= yeoman.dist %>/assets/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
						'<%= yeoman.dist %>/assets/fonts/{,*/}*.*'
					]
				}
			}
		},

		useminPrepare: {
			options: {
				dest: '<%= yeoman.dist %>'
			},
			html: '<%= yeoman.app %>/index.html'
		},

		usemin: {
			options: {
				assetsDirs: ['<%= yeoman.dist %>']
			},
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/assets/css/{,*/}*.css']
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/assets/images',
					src: '{,*/}*.{gif,jpeg,jpg,png}',
					dest: '<%= yeoman.dist %>/assets/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/assets/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/assets/images'
				}]
			}
		},

		cssmin: {
			// This task is pre-configured if you do not wish to use Usemin
			// blocks for your CSS. By default, the Usemin block from your
			// `index.html` will take care of minification, e.g.
			//
			//     <!-- build:css({.tmp,app}) styles/main.css -->
			//
			dist: {
				files: {
					'<%= yeoman.dist %>/assets/css/debug.css': [
						'.tmp/assets/css/debug.css',
						'<%= yeoman.app %>/assets/css/debug.css'
					],
					'<%= yeoman.dist %>/assets/css/debug.fixed.css': [
						'.tmp/assets/css/debug.fixed.css',
						'<%= yeoman.app %>/assets/css/debug.fixed.css'
					],

					'<%= yeoman.dist %>/assets/css/demos.css': [
						'.tmp/assets/css/demos.css',
						'<%= yeoman.app %>/assets/css/demos.css'
					],
					'<%= yeoman.dist %>/assets/css/demos.fixed.css': [
						'.tmp/assets/css/demos.fixed.css',
						'<%= yeoman.app %>/assets/css/demos.fixed.css'
					],

					'<%= yeoman.dist %>/assets/css/global.css': [
						'.tmp/assets/css/global.css',
						'<%= yeoman.app %>/assets/css/global.css'
					],
					'<%= yeoman.dist %>/assets/css/global.fixed.css': [
						'.tmp/assets/css/global.fixed.css',
						'<%= yeoman.app %>/assets/css/global.fixed.css'
					],

					'<%= yeoman.dist %>/assets/css/slider.css': [
						'.tmp/assets/css/slider.css',
						'<%= yeoman.app %>/assets/css/slider.css'
					],
					'<%= yeoman.dist %>/assets/css/slider.fixed.css': [
						'.tmp/assets/css/slider.fixed.css',
						'<%= yeoman.app %>/assets/css/slider.fixed.css'
					]
				}
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
					cwd: '<%= yeoman.app %>',
					src: '*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},

		// Put files not handled in other tasks here
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
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
				cwd: '<%= yeoman.app %>/assets/css',
				dest: '.tmp/assets/css/',
				src: '{,*/}*.css'
			},

			normalize: {
				src: '<%= yeoman.app %>/assets/bower_components/normalize-css/normalize.css',
				dest: '<%= yeoman.app %>/assets/css/global/_normalize.scss'
			},

			mediaQueries: {
				src: '<%= yeoman.app %>/assets/css/_media-queries.scss',
				dest: '<%= yeoman.app %>/assets/js/frwd.mediaQueries.js',
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

		concurrent: {
			server: [
				'compass',
				'copy:styles'
			],
			test: [
				'copy:styles'
			],
			dist: [
				'compass',
				'copy:styles',
				'imagemin',
				//'svgmin',
				'htmlmin'
			]
		},

		cmq: {
			options: {
				log: false
			},
			your_target: {
				files: {
					'.tmp/assets/css': ['.tmp/assets/css/*.css']
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
				commitMessage: 'Bump version to v%VERSION%',
				createTag: false,
				push: false
			}
		}
	});

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
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'copy:normalize',
		'concurrent:test',
		'autoprefixer',
		'connect:test',
		'mocha'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'copy:normalize',
		'copy:mediaQueries',
		'concurrent:dist',
		'autoprefixer',
		'cmq',
		'concat',
		'cssmin',
		'uglify',
		'copy:dist',
		//'rev',
		'usemin'
	]);

	grunt.registerTask('default', [
		'jshint',
		'test',
		'build'
	]);
};
