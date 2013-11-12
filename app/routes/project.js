import Projects from 'appkit/models/projects';

var ProjectRoute = Ember.Route.extend({
  serialize: function(model, params){
    return {project_id: model.get('id')};
  },
  model:function(params) {
    Ember.Logger.info("ProjectRoute:Model");
    Ember.Logger.info(params);
    return Projects.find(params.project_id);
  },
  // setupController: function(controller, model){
  //   debugger;
  //   this._super(controller, model);
  //   controller.set('content', model);
  // }
});

export default ProjectRoute;