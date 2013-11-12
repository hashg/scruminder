import Projects from 'appkit/models/projects';

var ProjectController = Ember.ObjectController.extend({
  content: null,
  filterText: '',
  filteredContent: function() {
    var self = this;
    var filter = this.get('filterText');
    if (Ember.isEmpty(filter)) {
      return this.get('content').get('sprints');
    } else {
      return this.get('content').get('sprints').filter(function(item, index, enumerable){
        var regx = new RegExp(filter, "ig");
        var name = item.get('name');
        return regx.match(name);
      });
    }
  }.property('filterText'),

  actions: {
    deleteProject: function() {
      var self = this;
      if (window.confirm("Are you sure you want to delete this project?")) {
        var id = self.get('id');
        debugger;
        var prj = this.get('model');        
        var project = Projects.unload(prj);
        project = Projects.find(id);
        var p = Projects.fetch(id).then(
            function(response){
              debugger;
            },
            null
          );
        /*project.deleteRecord().then(
          function()
          {
            Ember.Logger.info('Deleted');
            self.transitionToRoute('projects');
          }, 
          function()
          {
            Ember.Logger.info('Delete failed!');
          }
        );*/
      }
    }
  }
});

export default ProjectController;