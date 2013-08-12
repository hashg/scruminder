function Routes() {
  this.resource('register', {path: '/register'});
  this.resource('login', {path: '/login'});
  this.resource('logout', {path: '/logout'});
  this.resource('projects', {path: '/projects'});
  
  //persons
  this.resource('persons', {path: '/persons'}, function(){
    this.route('new');
  });
  this.resource('person', {path: '/persons/:person_id'});
  this.resource('personEdit', {path: '/persons/:person_id/edit'});

  //persons/vacation
  this.resource('vacations', {path: '/vacations'}, function(){
    this.route('new');
  });
  this.resource('vacation', {path: '/vacations/:vacation_id'});
  this.resource('vacationEdit', {path: '/vacations/:vacation_id/edit'});
}

export default Routes;
