var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');

  // routes for login/logout
  this.resource('register');
  this.resource('login');
  this.resource('logout');
  this.resource('forgot');
  //protected routes that are inaccessible without authentication
  this.resource('protected');
  this.resource('projects', {path: '/projects'}, function(){
    this.route('new');
    //lists projects
  });

  this.resource('project', {path: '/projects/:project_id'}, function(){
    this.route('edit');
    this.route('new'); //New Sprint
    //lists sprints
  });

  this.resource('sprint', {path: '/projects/:project_id/sprints/:sprint_id'}, function(){
    this.route('edit');
    this.route('new'); //New Story
    //list stories
  });

  this.resource('story', {path: '/projects/:project_id/sprints/:sprint_id/stories/:story_id'}, function(){
    this.route('edit');
    this.route('new'); //New Task
    //list tasks
  });

  this.resource('task', {path: '/projects/:project_id/sprints/:sprint_id/stories/:story_id/tasks/:task_id'}, function(){
    this.route('edit');
    // this.route('new'); //New Task
    //list tasks
  });

  this.resource('holidays', function(){
    this.route('edit', {path: ':holiday_id/edit'});
    this.route('new');
  });
  
  this.resource('profiles');
  this.resource('help');

});

export default Router;


