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
        },
        clean : [
            'css/src',
            'js/src',
            'node_modules',
            '.git',
            'Gruntfile.js', 'package.json', '.travis.yml'
        ],
        replace: {
            index : {
                src: ['index.html'],
                overwrite: true,
                replacements: [{
                    from: /<\!-- dev -->|\b|<\!-- \\dev -->/g,
                    to: ''
                },
                {
                    from: /<\!-- dist/g,
                    to: ''
                },
                {
                    from: /\\dist -->/g,
                    to: ''
                }]
            }
        },
        htmlmin: {
            propre : {
                options : {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true
                },
                files : {
                    'index.html': 'index.html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['uglify', 'cssmin', 'jshint', 'copy']);
    grunt.registerTask('propre', ['uglify', 'cssmin', 'jshint', 'copy', 'replace', 'htmlmin', 'clean']);
};