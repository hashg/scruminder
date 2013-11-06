import Projects from 'appkit/models/projects';
import Sprints from 'appkit/models/sprints';

var get = Ember.get;

var ProjectNewController = Ember.ObjectController.extend({
  needs: ['project'],
  content: null,
  name: '',
  project_id: Ember.computed.alias('controllers.project.id'),
  actions: {
    newSprint: function() {
      var self = this;
      // var parent_id = this.get('project_id');
      // var parent = Projects.find(parent_id);
      var parent = self.get('controllers.project');
      var sprint = Sprints.create({name: self.get('name'), project: parent}); 
      sprint.save();

      /*var parent_id = this.get('project_id');
      var parent = Projects.find(parent_id);
      var sprints = parent.get('sprints');
      var sprint = sprints.create({name: self.get('name'), project: parent}); 
      sprint.save();*/


    }
  },
  resetProperties: function() {
    this.set('name', null);
  }
});

export default ProjectNewController;
