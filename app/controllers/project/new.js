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
      // var parent = self.get('controllers.project');
      // var sprint = Sprints.create({name: self.get('name'), project: parent}); 
      // sprint.save();

      var parent_id = this.get('project_id');
      // var parent = Projects.find(parent_id);
      // var parent1 = self.get('controllers.project');
      // var sprints = parent.get('sprints');
      var sprint = Sprints.create({name: self.get('name'), project_id: parent_id});
      // sprint.set('project', parent);
      sprint.save().then(function(){
        var parent = self.get('controllers.project');
        parent.get('sprints').pushObject(sprint);
        self.resetProperties();
        self.transitionToRoute('project');
      }, function(){
        self.set('errorMessage', "ProjectNew: save failed");
      });
    }
  },
  resetProperties: function() {
    this.set('name', null);
  }
});

export default ProjectNewController;
