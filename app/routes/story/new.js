import Tasks from 'appkit/models/tasks';

var StoryNewRoute = Ember.Route.extend({
  model:function(params) {
    Ember.Logger.info("StoryNewRoute:Model");
    return Tasks.create();
  }
});

export default StoryNewRoute;