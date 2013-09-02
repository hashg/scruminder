import Project from 'appkit/models/project';
import Person from 'appkit/models/person';

var ProjectEditController = Ember.ObjectController.extend({
  content: [],
  needs: ['project'],
  project: Ember.computed.alias('controllers.project'),
  id: Ember.computed.alias('controllers.project.id'),
  name: Ember.computed.alias('controllers.project.name'),
  desc: Ember.computed.alias('controllers.project.desc'),
  actions: {
    updateProject: function()
    {
      var self = this;
      var id = self.get('id');
      var prj = Project.find(id);
      prj.setProperties({'name': self.get('name'), 'desc': self.get('desc')});
      prj.submit().then(
        function()
        {
          console.log('Edit saved');
          self.transitionToRoute('project');
        }, 
        function()
        {
          console.log('Edit save failed!');
        }
      );
    },
    cancelProject: function() {
      this.transitionToRoute('project');
    }
  }
});

export default ProjectEditController;