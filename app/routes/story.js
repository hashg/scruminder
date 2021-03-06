import Stories from 'appkit/models/stories';
import Sprints from 'appkit/models/sprints';

var StoryRoute = Ember.Route.extend({
  serialize: function(model, params) {
    // Ember.Logger.info("StoryRoute:serialize");
    return {
      project_id: this.modelFor('project').get('id'),
      sprint_id: this.modelFor('sprint').get('id'),
      story_id: model.get('id')
    };
  },
  model:function(params) {
    return Stories.find(params.story_id);
  },
  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('content', model);
  },
  deactivate: function() {
    this.controllerFor('story').set('search', '');
  }
});

export default StoryRoute;