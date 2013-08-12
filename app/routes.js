function Routes() {
  this.resource('register', {path: '/register'});
  this.resource('login', {path: '/login'});
  this.resource('logout', {path: '/logout'});
  this.resource('projects', {path: '/projects'});
  this.resource('persons', {path: '/persons'});
}

export default Routes;
