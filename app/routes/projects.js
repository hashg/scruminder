import Projects from 'appkit/models/projects';

var ProjectsRoute = Ember.Route.extend({
  model:function() {
    return Projects.find();
    // return new Ember.RSVP.Promise(function(resolve) {
    //   Ember.run.later(function() {
    //     resolve(Projects.find());
    //   }, 3000);
    // });
  },
  deactivate: function() {
   //clear the search filed on the list when transitioning to new page.
    this.controllerFor('projects').set('search', '');
  }
});

export default ProjectsRoute;