var Helpers = require('../helpers');

var scripts = '{app,tests}/**/*.{js,coffee}';
var templates = 'app/templates/**/*.{hbs,handlebars,hjs,emblem}';
var styles = 'app/styles/**/*.{css,sass,scss,less,styl}';
var other = '{app,tests,public,vendor}/**/*';
var eve = 'eve/**/*.py';

module.exports = {
  scripts: {
    files: [scripts],
    tasks: ['lock', 'buildScripts', 'unlock', 'karma:server:run']
  },
  templates: {
    files: [templates],
    tasks: ['lock', 'buildTemplates:debug', 'unlock', 'karma:server:run']
  },
  styles: {
    files: [styles],
    tasks: ['lock', 'buildStyles', 'unlock', 'karma:server:run']
  },
  other: {
    files: [other, eve, '!'+scripts, '!'+templates, '!'+styles],
    tasks: ['build:debug', 'karma:server:run']
  },

  options: {
    debounceDelay: 0,
    // When we don't have inotify, we still want to be snappy
    interval: 20,
    livereload: Helpers.isPackageAvailable("connect-livereload")
  }
};
