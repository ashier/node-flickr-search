module.exports = function(grunt) {

  "use strict";

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    less: {
      dev: {
        options: {
          paths: ["static/css"],
          yuicompress: false
        },
        files: {
          "static/css/default.css": "static/less/default.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['less']);

};
