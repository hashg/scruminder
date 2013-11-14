import Stories from 'appkit/models/stories';

var StoryEditRoute = Ember.Route.extend({
  model: function(){ 
    return this.modelFor('story');
  }
});

export default StoryEditRoute;