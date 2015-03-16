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
            },
            forbuild: {
                files: [
                    {
                        src: 'index.html',
                        dest: 'index.offline.html'
                    }
                ]
            }
        },
        curl: {
            'css/webui-popover.min.css' : 'https://raw.githubusercontent.com/sandywalker/webui-popover/master/dist/jquery.webui-popover.min.css',
            'js/webui-popover.min.js' : 'https://raw.githubusercontent.com/sandywalker/webui-popover/master/dist/jquery.webui-popover.min.js'
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
            'js/src'
        ],
        replace: {
            propre : {
                src: ['index.html', 'index.offline.html'],
                overwrite: true,
                replacements: [{
                    from: /<\!-- dev -->.*\n/g,
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
            },
            offline : {
                src: ['index.offline.html'],
                overwrite: true,
                replacements: [{
                    from: /<\!-- offline/g,
                    to: ''
                },
                {
                    from: /\\offline -->/g,
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
            },
            offline : {
                options : {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true
                },
                files : {
                    'index.offline.html': 'index.offline.html'
                }
            }
        },
        compress: {
            propre: {
                options: {
                    archive: 'bravery-build.zip',
                    level: 9
                },
                files: [{
                    src: ['css/*', 'js/*', 'font/**', 'index.html', 'readme.md'],
                    dest: 'bravery/'
                }]
            },
            offline: {
                options: {
                    archive: 'bravery-build-offline.zip',
                    level: 9
                },
                files: [{
                    src: ['css/*', 'js/*', 'lol-api/**', 'font/**', 'readme.md', 'index.offline.html' ],
                    dest: 'bravery/'
                }]
            }
        },
        exec : {
            download_api : 'python3 lol-api-download.py'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['jshint', 'copy:main', 'curl']);
    grunt.registerTask('basebuild', ['uglify', 'cssmin', 'jshint', 'copy', 'curl', 'clean']);
    
    grunt.registerTask('propre', ['replace:propre', 'htmlmin:propre', 'compress:propre']);
    grunt.registerTask('offline', ['exec:download_api', 'replace:offline', 'htmlmin:offline', 'compress:offline']);
    grunt.registerTask('makebuild', ['basebuild', 'offline', 'propre']);
};