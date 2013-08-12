module.exports = {
  // stage: {
  //   path: 'tmp/public/app.py',
  //   pattern: '%APP_PYTHON_DB%',
  //   replacement: "dbpath = os.path.join(os.getcwd(), 'scruminder.db')\napp.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + dbpath"
  // },
  dist: {
    path: 'dist/app.py',
    pattern: "debug_env = 1",
    replacement: "debug_env = 0"
  }
};