module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'assets/css/app.css': '_assets/sass/app.scss'
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 8', 'ie 7']
			},
			single_file: {
				options: {
					expand: true,
					flatten: true
				},
				src: 'assets/css/app.css',
				dest: 'assets/css/appprefixed.css'
			}
		},

		cssmin: {
			combine: {
				files: {
					'assets/css/appmin.css': ['assets/css/appprefixed.css']
				}
			}
		},

		jshint: {
			beforeconcat: ['_assets/js/*.js']
		},

		concat: {
			dist: {
				src: [
					'_assets/js/lib/*.js',
					'_assets/js/app.js'
				],
				dest: 'assets/js/app.js'
			}
		},

		uglify: {
			build: {
				src: 'assets/js/app.js',
				dest: 'assets/js/app.min.js'
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'assets/img',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'assets/img'
				}]
			}
		},

		watch: {
			options: {
				livereload: true,
			},
			scripts: {
				files: ['_assets/js/*.js'],
				tasks: ['concat', 'uglify', 'jshint'],
				options: {
					spawn: false,
				}
			},
			css: {
				files: ['_assets/sass/*.scss', '_assets/sass/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'cssmin'],
				options: {
					spawn: false,
				}
			},
			images: {
				files: ['assets/img/**/*.{png,jpg,gif}', 'assets/img/*.{png,jpg,gif}'],
				tasks: ['imagemin'],
				options: {
					spawn: false,
				}
			}
		},

		connect: {
			server: {
				options: {
					port: 9001,
					base: './'
				}
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	// Default Task is basically a rebuild
	grunt.registerTask(
       'default', 
       ['concat', 'uglify', 'jshint', 'sass', 'autoprefixer', 'cssmin', 'imagemin']
   );

	grunt.registerTask(
       'serve', 
       ['connect', 'watch']
   );

};
