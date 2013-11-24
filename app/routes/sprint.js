import Sprints from 'appkit/models/sprints';
import Projects from 'appkit/models/projects';

var SprintRoute = Ember.Route.extend({
  serialize: function(model, params){
    // Ember.Logger.info("SprintRoute:serialize");
    return {
      sprint_id: model.get('id'),
      project_id: this.modelFor('project').get('id')
    };
  },
  model:function(params) {
    // Ember.Logger.info("SprintRoute:Model");
    var sprint = Sprints.find(params.sprint_id);
    return sprint;
  },
  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('content', model);
  },
  deactivate: function() {
    this.controllerFor('sprint').set('search', '');
  }
});

export default SprintRoute;