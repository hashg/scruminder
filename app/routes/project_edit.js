import Project from 'appkit/models/project';

var ProjectEditRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    
  },
  model: function (params) {
    return Project.find(params.project_id);
  }
});

export default ProjectEditRoute;