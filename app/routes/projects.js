import Project from 'appkit/models/project';

var ProjectsRoute = Ember.Route.extend({
  model: function()
  {
    return Project.find();
  }
});

export default ProjectsRoute;