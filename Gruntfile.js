module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> - <%= pkg.author %> \n * <%= pkg.description %> \n * <%= pkg.homepage %> \n * Build : le <%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
            },
            my_target: {
                files: {
                    'js/bravery.min.js': [
                        'js/src/*'
                    ]
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        src: 'node_modules/jquery/dist/jquery.min.js',
                        dest: 'js/jquery.min.js'
                    },
                    {
                        src: 'node_modules/materialize-css/dist/js/materialize.min.js',
                        dest: 'js/materialize.min.js'
                    },
                    {
                        src: 'node_modules/materialize-css/dist/css/materialize.min.css',
                        dest: 'css/materialize.min.css'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: 'node_modules/materialize-css/dist/font/material-design-icons/*',
                        dest: 'font/material-design-icons/'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: 'node_modules/materialize-css/dist/font/roboto/*',
                        dest: 'font/roboto/'
                    }
                ]
            }
        },
        cssmin: {
            options: { },
            combine: {
                files : {
                    'css/bravery.min.css' : 'css/src/*'
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['uglify', 'cssmin', 'jshint', 'copy']);
};