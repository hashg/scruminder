import Tasks from 'appkit/models/tasks';
import Stories from 'appkit/models/stories';

var TaskRoute = Ember.Route.extend({
  serialize: function(model, params){
    return {
      project_id: this.modelFor('project').get('id'),
      sprint_id: this.modelFor('sprint').get('id'),
      story_id: this.modelFor('story').get('id'),
      task_id: model.get('id')
    };
  },
  model:function(params) {
    return Tasks.find(params.story_id);
  },
  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('content', model);
  }
});

export default TaskRoute;