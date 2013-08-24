import Project from 'appkit/models/project';

var ProjectRoute = Ember.Route.extend({
  model: function (params) {
    return Project.find(params.project_id);
  }
});

export default ProjectRoute;