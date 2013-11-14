import Projects from 'appkit/models/projects';

var ProjectEditRoute = Ember.Route.extend({
  model: function(){ 
    return this.modelFor('project');
  }
});

export default ProjectEditRoute;