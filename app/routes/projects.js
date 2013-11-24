import Projects from 'appkit/models/projects';

var ProjectsRoute = Ember.Route.extend({
  model:function() {
    return Projects.find();
  },
  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('content', model);
  },
  deactivate: function() {
    this.controllerFor('projects').set('search', '');
  }
});

export default ProjectsRoute;