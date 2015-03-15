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
        },
        compress: {
            zip: {
                options: {
                    archive: 'bravery-build.zip',
                    level: 9
                },
                files: [{
                    src: ['css/*', 'js/*', 'font/**', 'index.html', 'readme.md'],
                    dest: 'bravery/'
                }]
            },
            tgz: {
                options: {
                    archive: 'bravery-build.tar.gz'
                },
                files: [{
                    src: ['css/*', 'js/*', 'font/**', 'index.html', 'readme.md'],
                    dest: 'bravery/'
                }]
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
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['jshint', 'copy']);
    grunt.registerTask('makebuild', ['uglify', 'cssmin', 'jshint', 'copy', 'replace', 'htmlmin', 'clean', 'compress']);
};