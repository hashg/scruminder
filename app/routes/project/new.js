import Sprints from 'appkit/models/sprints';

var ProjectNewRoute = Ember.Route.extend({
  model:function(params) {
    Ember.Logger.info("ProjectNewRoute:Model");
    return Sprints.create();
  }
});

export default ProjectNewRoute;