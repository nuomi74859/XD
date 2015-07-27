/**
 * Created by nuomi on 14-7-31.
 */
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                mangle: false,
                report:'min',
                sourceMap:true
            },
            dist: {
                files: [{
                    expand:true,
                    cwd:'src',
                    src:'**/*.js',
                    dest:''
                }]
            }
        },
        compass: {
            options: {
                sassDir:'src/sass/main',
                cssDir:'css',
                generatedImagesDir: 'src/images',
                imagesDir:'images',
                spriteLoadPath: 'src/sass/sprite',
                outputStyle:'compressed',
                assetCacheBuster:false
            },
            dist: {
                files:[{
                    expand:true,
                    src:'**/*.scss'
                }]
            }
        },
        htmlmin: {
            options: {
                removeComments:true,
                collapseWhitespace:true,
                minifyJS:{
                    mangle:false
                },
                minifyCSS:true
            },
            dist: {
                files:[{
                    expand:true,
                    cwd:'src',
                    src:'**/*.html',
                    dest:''
                }]
            }
        },
        imagemin: {
            options: {
                optimizationLevel:3
            },
            dist: {
                files: [{
                    expand:true,
                    cwd:'src/images',
                    src:['**/*.{png,jpg,jpeg,ico}'],
                    dest:'images'
                }]
            }

        },
        connect: {
            options: {
                port:8000,
                hostname:'*',
                debug:true,
//                keepalive:true,
                livereload:3000
            },
            server: {
                options: {
                    open:true,
                    base:''
                }
            }
        },
        watch: {
            uglify: {
                files:['src/**/*.js'],
                tasks:['uglify']
            },
            compass: {
                files:['src/**/*.scss'],
                tasks:['compass']
            },
            htmlmin: {
                files:['src/**/*.html'],
                tasks:['htmlmin']
            },
            livereload: {
                options: {
                    livereload:'<%=connect.options.livereload%>'
                },
                files: [
                    '*.html',
                    'css/{,*/}*.css',
                    'js/{,*/}*.js'
                ]
            }
        }
    });

//    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-contrib-watch');
//    grunt.loadNpmTasks('grunt-contrib-concat');
//    grunt.loadNpmTasks('grunt-contrib-sass');
//    grunt.loadNpmTasks('grunt-contrib-compass');
//    grunt.loadNpmTasks('grunt-contrib-htmlmin');
//    grunt.loadNpmTasks('grunt-contrib-imagemin');
//    grunt.loadNpmTasks('grunt-contrib-connect');


    grunt.registerTask('default', ['uglify','compass','htmlmin','imagemin']);
    grunt.registerTask('server',['connect','watch']);
};