import Projects from 'appkit/models/projects';

var ProjectEditController = Ember.ObjectController.extend({
  content: null,
  needs: ['project'],
  actions: {
    editProject: function() {
      var self = this;
      var model = self.get('model');

      var project = model.setProperties({
        name: self.get('name'),
        description: self.get('description')
      });
      
      project.save().then (
        function() {
          Ember.Logger.info('ProjectEditController: Edit saved');
          self.transitionToRoute('project');
        }, 
        function() {
          self.set('errorMessage', "ProjectEditController: Edit failed");
        }
      );
    }
  }
});

export default ProjectEditController;