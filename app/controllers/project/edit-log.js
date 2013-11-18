import Projects from 'appkit/models/projects';
import Backlog from 'appkit/models/backlog';

var ProjectEditLogController = Ember.ObjectController.extend({
  content: null,
  needs: ['project'],
  priorities: [1,2,3,4],
  types: ['feature', 'defect', 'testing', 'others'],
  actions: {
    editBacklog: function() {
      var self = this;
      var model = self.get('model');

      var project = model.setProperties({
        name: self.get('name'),
        priority: self.get('priority'),
        type: self.get('type'),
        description: self.get('description'),
      });
      
      project.save().then (
        function() {
          Ember.Logger.info('ProjectEditLogController: EditLog saved');
          self.transitionToRoute('project');
        }, 
        function() {
          self.set('errorMessage', "ProjectEditLogController: EditLog failed");
        }
      );
    }
  }
});

export default ProjectEditLogController;