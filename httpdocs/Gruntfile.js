module.exports = function(grunt)
{
    'use strict';

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            build: {
                options: {
                    lineNumbers: true,
                    style: 'expanded'
                },
                files: {
                    'dist/css/main.css': 'src/css/scss/main.scss'
                }
            }
        },

        cssc: {
            build: {
                options: {
                    compress: true,
                    consolidateMediaQueries: false,
                    lineBreaks: true
                },
                files: {
                    'dist/css/main.css': 'dist/css/main.css'
                }
            }
        },

        cssmin: {
            build: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    'Last updated: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'dist/css/main.css': 'dist/css/main.css'
                }
            }
        },

        // -- End style tasks

        requirejs: {
            build: {
                options: {
                    name: 'main',
                    baseUrl: 'src/js',
                    keepBuildDir: true,
                    mainConfigFile: 'src/js/main.js',
                    out: 'dist/js/main.build.js'
                }
            }
        },

        uglify: {
            build: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    'Last updated: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: [
                {
                    expand: true, // Enable dynamic expansion.
                    cwd: 'dist/js/', // Src matches are relative to this path.
                    src: ['main.build.js'], // Actual pattern(s) to match.
                    dest: 'dist/js/' // Destination path prefix.
                }]
            }
        },

        // --  End script tasks

        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['src/js/**/*.js']
            },
            html: {
                files: ['includes/*.html', '*.html']
            }
        }
    });

    grunt.registerTask('default', ['sass', 'watch']);
    grunt.registerTask('staging', ['sass']);
    grunt.registerTask('production', ['sass', 'cssc', 'cssmin', 'requirejs', 'uglify']);

};