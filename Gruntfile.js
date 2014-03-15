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
				spawn: false
			},
			mediaQueries: {
				files: [
					'<%= yeoman.app %>/assets/css/_media-queries.scss'
				],
				tasks: [
					'copy:mediaQueries'
				],
			},
			css: {
				files: [
					'<%= yeoman.app %>/assets/css/{,*/}*.scss'
				],
				tasks: [
					'concurrent:server',
					'autoprefixer',
					'cmq',
					'concat'
				],
			},
			js: {
				files: [
					'<%= yeoman.app %>/assets/js/{,*/}*.js'
				],
				tasks: [
					'concat',
					'kss:server'
				],
			},
			kss: {
				files: [
					'<%= yeoman.app %>/styleguide-template/{,*/}*.*',
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
					'<%= yeoman.app %>/*.html',
					'<%= yeoman.app %>/assets/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}',
					'<%= yeoman.app %>/styleguide/{,*/}*.{less,html,js,sass,scss}',
					'.tmp/assets/css/{,*/}*.css',
					'{.tmp,<%= yeoman.app %>}/assets/js/{,*/}*.js'
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
			distFinal: {
				files: [{
					src: [
						'<%= yeoman.dist %>/styleguide/public/kss.less',
						'<%= yeoman.dist %>/styleguide/public/style.css'
					]
				}],
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

		concat: {
			'.tmp/assets/js/frwd.debug.js': [
				'<%= yeoman.app %>/assets/js/frwd.debug.js'
			],

			'.tmp/assets/js/head.js': [
				'<%= yeoman.app %>/assets/js/modernizr.custom.js',
				'<%= yeoman.app %>/assets/js/matchMedia.js',
				'<%= yeoman.app %>/assets/js/frwd.js',
				'<%= yeoman.app %>/assets/js/frwd.mediaQueries.js',
				'<%= yeoman.app %>/assets/js/picturefill.js'
			],

			'.tmp/assets/js/slider.js': [
				'<%= yeoman.app %>/assets/js/swipe2.js',
				'<%= yeoman.app %>/assets/js/frwd.slider.js'
			]
		},

		uglify: {
			'<%= yeoman.dist %>/assets/js/frwd.debug.js': [
				'.tmp/assets/js/frwd.debug.js'
			],

			'<%= yeoman.dist %>/assets/js/head.js': [
				'.tmp/assets/js/head.js'
			],

			'<%= yeoman.dist %>/assets/js/slider.js': [
				'.tmp/assets/js/slider.js'
			]
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

		sass: {
			server: {
				options: {
					precision: 6,
					style: 'expanded'
				},
				files: [{
					cwd: '<%= yeoman.app %>/assets/css',
					dest: '.tmp/assets/css/',
					dot: true,
					expand: true,
					rename: function (dest, src) {
						return dest + src.replace('.scss', '.css');
					},
					src: ['{,*/}*.scss']
				}]
			},

			dist: {
				options: {
					precision: 6,
					style: 'compressed'
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>/assets/css',
					src: '{,*/}*.scss',
					dest: '.tmp/assets/css/',
					ext: '.css'
				}]
			}
		},

		cssmin: {
			dist: {
				files: {
					'<%= yeoman.dist %>/assets/css/debug.css': [
						'.tmp/assets/css/debug.css'//,
						//'<%= yeoman.app %>/assets/css/debug.css'
					],
					'<%= yeoman.dist %>/assets/css/debug.fixed.css': [
						'.tmp/assets/css/debug.fixed.css'//,
						//'<%= yeoman.app %>/assets/css/debug.fixed.css'
					],

					'<%= yeoman.dist %>/assets/css/demos.css': [
						'.tmp/assets/css/demos.css'//,
						//'<%= yeoman.app %>/assets/css/demos.css'
					],
					'<%= yeoman.dist %>/assets/css/demos.fixed.css': [
						'.tmp/assets/css/demos.fixed.css'//,
						//'<%= yeoman.app %>/assets/css/demos.fixed.css'
					],

					'<%= yeoman.dist %>/assets/css/global.css': [
						'.tmp/assets/css/global.css'//,
						//'<%= yeoman.app %>/assets/css/global.css'
					],
					'<%= yeoman.dist %>/assets/css/global.fixed.css': [
						'.tmp/assets/css/global.fixed.css'//,
						//'<%= yeoman.app %>/assets/css/global.fixed.css'
					],

					'<%= yeoman.dist %>/assets/css/slider.css': [
						'.tmp/assets/css/slider.css'//,
						//'<%= yeoman.app %>/assets/css/slider.css'
					],
					'<%= yeoman.dist %>/assets/css/slider.fixed.css': [
						'.tmp/assets/css/slider.fixed.css'//,
						//'<%= yeoman.app %>/assets/css/slider.fixed.css'
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
				template: '<%= yeoman.app %>/styleguide-template'
			},
			server: {
				files: {
					'<%= yeoman.app %>/styleguide': ['<%= yeoman.app %>/assets/css']
				}
			},
			dist: {
				files: {
					'<%= yeoman.dist %>/styleguide': ['<%= yeoman.app %>/assets/css']
				}
			}
		},

		concurrent: {
			server: [
				'sass:server',
				'copy:styles',
				'kss:server'
			],
			test: [
				'copy:styles',
				'kss:server'
			],
			dist: [
				'sass:server',
				'copy:styles',
				'kss:dist',
				'imagemin',
				'htmlmin'
			]
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
			'concat',
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
		'jshint',
		'test',
		'build'
	]);
};
