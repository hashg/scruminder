function Routes() {
  this.resource('register', {path: '/register'});
  this.resource('login', {path: '/login'});
  this.resource('logout', {path: '/logout'});

  this.resource('projects', {path: 'projects'});
  this.route('projectsNew', {path: 'projects/new'});
  this.resource('project', {path: 'projects/:project_id'});
  this.route('project_edit', {path: 'projects/:project_id/edit'});
  
  this.resource('persons', {path: '/persons'});
  // this.resource('personsNew', {path: '/persons/new'}); - Register will take of it.
  this.resource('person', {path: '/persons/:person_id'});
  this.resource('personEdit', {path: '/persons/:person_id/edit'});
  this.resource('vacations', {path: '/persons/:person_id/vacations'});
  this.resource('vacationsNew', {path: '/persons/:person_id/vacations/new'});
  this.resource('vacation', {path: '/persons/:person_id/vacations/:vacation_id'});
  this.resource('vacationEdit', {path: '/persons/:person_id/vacations/:vacation_id/edit'});
}

export default Routes;
