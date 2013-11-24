import Projects from 'appkit/models/projects';

var ProjectRoute = Ember.Route.extend({
  serialize: function(model, params) {
    // Ember.Logger.info("ProjectRoute:serialize");
    return {
      project_id: model.get('id')
    };
  },
  model:function(params) {
    // Ember.Logger.info("ProjectRoute:Model");
    return Projects.find(params.project_id);
  },
  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('content', model);
  },
  deactivate: function() {
    this.controllerFor('project').set('search', '');
    this.controllerFor('project').set('searchBacklog', '');
    this.controllerFor('project').set('searchMember', '');
  }
});

export default ProjectRoute;