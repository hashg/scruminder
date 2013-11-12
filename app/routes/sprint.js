import Sprints from 'appkit/models/sprints';
import Projects from 'appkit/models/projects';

var SprintRoute = Ember.Route.extend({
  serialize: function(model, params){
    return {
      project_id: this.modelFor('project').get('id'),
      sprint_id: model.get('id')
    };
  },
  model:function(params) {
    Ember.Logger("SprintRoute:Model");
    Ember.Logger(params);
    var sprint = Sprints.find(params.sprint_id);
    return sprint;
  },
  // setupController: function(controller, model){
  //   this._super(controller, model);
  //   controller.set('content', model);
  // }
});

export default SprintRoute;