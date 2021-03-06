module.exports = {
  // These copy tasks happen before transpile or hinting. They
  // prepare the build pipeline by moving JavaScript files to
  // tmp/javascript.
  //
  "prepare": {
    files: [{
      expand: true,
      cwd: 'app/',
      src: '**/*.js',
      dest: 'tmp/javascript/app'
    },
    {
      expand: true,
      cwd: 'tests/',
      src: ['**/*.js', '!test_helper.js', '!test_loader.js', '!vendor/**/*.js'],
      dest: 'tmp/javascript/tests/'
    }]
  },
  // Stage moves files to their final destinations after the rest
  // of the build cycle has run.
  //
  "stage": {
    files: [{
      expand: true,
      cwd: 'tests/',
      src: ['index.html', 'test_helper.js', 'test_loader.js', 'vendor/**/*'],
      dest: 'tmp/public/tests/'
    },
    {
      expand: true,
      cwd: 'Eve/',
      src: ['*.py', '*.txt', 'eapp/*.py', 'eapp/templates'],
      dest: 'tmp/public/'
    },
    {
      expand: true,
      cwd: 'public/',
      src: ['*.html'],
      dest: 'tmp/public/eapp/templates'
    },
    {
      expand: true,
      cwd: 'vendor/',
      src: ['**'],
      dest: 'tmp/public/eapp/vendor'
    },
    // {
    //   expand: true,
    //   cwd: 'public/',
    //   src: ['**'],
    //   dest: 'tmp/public/'
    // }
    ]
  },
  "assets":{
    files: [{
      expand: true,
      cwd: 'tmp/public/assets',
      src: ['**'],
      dest: 'tmp/public/eapp/assets'
    }]
  },
  "vendor": {
    src: ['vendor/**/*.js', 'vendor/**/*.css'],
    dest: 'tmp/public/'
  },
  "dist": {
    files: [{
      expand: true,
      cwd: 'tmp/public',
      src: ['**', '!coverage', '!*.pyc'],
      dest: 'dist/'
    }]
  },
};
