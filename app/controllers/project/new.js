import Projects from 'appkit/models/projects';
import Sprints from 'appkit/models/sprints';

Sprints.reopen({
    project: Ember.belongsTo(Projects, {key: 'project_id'})
});

var ProjectNewController = Ember.ObjectController.extend({
  needs: ['project'],
  content: null,
  name: '',
  start_dt: '',
  end_dt: '',
  description: '',
  errorMessage: '',
  project_id: Ember.computed.alias('controllers.project.id'),
  actions: {
    newSprint: function() {
      var self = this;
      var model = self.get('model');
      var parent_id = self.get('project_id');
      var parent = self.get('controllers.project.content');

      var sprint = model.setProperties({
        name: self.get('name'),
        start_dt: self.get('start_dt'),
        end_dt: self.get('end_dt'),
        description: self.get('description'),
        stat: 'created',
        project: parent
      });

      sprint.save().then (
        function() {
          /*update parent's list*/
          var parent = self.get('controllers.project.content');
          parent.get('sprints').pushObject(sprint);
          
          self.resetProperties();
          self.transitionToRoute('project');
        }, 
        function() {
          self.set('errorMessage', "ProjectNewController: save failed");
        }
      );
    }
  },
  resetProperties: function() {
    this.setProperties({
      name: null,
      start_dt: null,
      end_dt: null,
      description: null
    });
  }
});

export default ProjectNewController;
