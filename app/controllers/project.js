import Project from 'appkit/models/project';

var ProjectController = Ember.ObjectController.extend({
  actions: {
    deleteProject: function()
    {
      var self = this;
      var id = self.get('id');
      var prj = Project.find(id);
      prj.deleteRecord().then(
        function()
        {
          console.log('Deleted');
          self.transitionToRoute('projects');
        }, 
        function()
        {
          console.log('Delete failed!');
        }
      );
    }
  }
});

export default ProjectController;


