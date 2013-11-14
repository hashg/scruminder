import Stories from 'appkit/models/stories';

var SprintNewRoute = Ember.Route.extend({
  model:function(params) {
    Ember.Logger.info("SprintNewRoute:Model");
    return Stories.create();
  }
});

export default SprintNewRoute;