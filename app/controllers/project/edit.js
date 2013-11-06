import Projects from 'appkit/models/projects';

var ProjectEditController = Ember.ObjectController.extend({
  content: null,
  needs: ['project'],
  id: Ember.computed.alias('controllers.project.id'),
  name: Ember.computed.alias('controllers.project.name'),
  etag: Ember.computed.alias('controllers.project.etag'),
  actions: {
    editProject: function() {
      var self = this;
      var id = self.get('id');
      var project = Projects.find(id);
      project.setProperties({
        'name': self.get('name')
      });
      project.save().then(
        function()
        {
          Ember.Logger.info('Edit saved');
          self.transitionToRoute('project');
        }, 
        function()
        {
          Ember.Logger.info('Edit save failed!');
        }
      );
    }
  }
});

export default ProjectEditController;