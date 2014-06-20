
/**
 * Grunt module
 */
module.exports = function (grunt) {

  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /**
   * FireShell Grunt config
   */
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    sprite:{
      all: {
        src: 'app/img/sprite-imgs/*.png',
        destImg: 'app/img/sprite.png',
        destCSS: 'src/scss/modules/_sprites.scss',
        engine: 'pngsmith',
        cssFormat: 'css',
        imgPath: '../img/sprite.png'
      }
    },
    imagemin: {
        png: {
            options: {
                optimizationLevel: 7,
                pngquant: true
            },
            files: [{
                expand: true,
                cwd:"app/img/",
                src: ["**/*.png"],
                dest: "app/img/",
                ext: ".png"
            }]
        },

        jpg: {
            options: {
                progressive: true
            },
            files: [{
                expand: true,
                cwd:"app/img/",
                src: ["**/*.jpg"],
                dest: "app/img/",
                ext: ".jpg"
            }]              
        } 
    }
  });



  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'imagemin',
    'sprite'
  ]);

};