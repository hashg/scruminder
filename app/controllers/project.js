import filter from 'appkit/utils/filter';
import Projects from 'appkit/models/projects';

var ProjectController = Ember.ObjectController.extend({
  content: null,
  search: '',

  contentChanged: function(){
    Ember.run.next(this, function(){
      var srch = this.get('search');
      filter("sm-sprint-list", srch);
    });
  }.observes('search'),
  actions: {
    deleteProject: function() {
      var self = this;
      if (window.confirm("Are you sure you want to delete this project?")) {
        var id = self.get('id');
        var project = Projects.find(id);
        project.deleteRecord().then(
          function()
          {
            Ember.Logger.info('Deleted');
            self.transitionToRoute('projects');
          }, 
          function()
          {
            Ember.Logger.info('Delete failed!');
          }
        );
      }
    }
  }
});

export default ProjectController;