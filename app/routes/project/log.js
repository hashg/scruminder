import Backlog from 'appkit/models/backlog';

var ProjectLogRoute = Ember.Route.extend({
  model:function(params) {
    Ember.Logger.info("ProjectLogRoute:Model");
    return Backlog.create();
  }
});

export default ProjectLogRoute;