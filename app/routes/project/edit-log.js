import Projects from 'appkit/models/projects';
import Backlog from 'appkit/models/backlog';

var ProjectEditLogRoute = Ember.Route.extend({
  model: function(params) {
    return Backlog.find(params.backlog_id);
  }
});

export default ProjectEditLogRoute;