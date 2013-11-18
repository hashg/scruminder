import Projects from 'appkit/models/projects';
import Backlog from 'appkit/models/backlog';

var ProjectLogController = Ember.ObjectController.extend({
  needs: ['project'],
  content: null,
  name: '',
  description: '',
  priority: '',
  type: '',
  priorities: [1,2,3,4],
  types: ['feature', 'defect', 'testing', 'others'],
  actions: {
    addLog: function() {
      Ember.Logger.info('ProjectAddController:addLog');

      var self = this;
      var parent_id = self.get('controllers.project.id');
      var model = self.get('model');
      var log = model.setProperties({
        name: self.get('name'),
        priority: self.get('priority'),
        type: self.get('type'),
        description: self.get('description'),
        project: parent_id
      });

      log.save().then (
        function() {
          var parent = self.get('controllers.project.content');
          parent.get('backlogs').pushObject(log);
          
          self.resetProperties();
          self.transitionToRoute('project');
        }, 
        function() {
          self.set('errorMessage', "ProjectLogController: save failed");
        }
      );
    }
  },
  resetProperties: function() {
    this.setProperties({
      name: '',
      description: '',
      priority: ''
    });
  }
});

export default ProjectLogController;