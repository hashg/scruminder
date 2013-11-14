import filter from 'appkit/utils/filter';
import Projects from 'appkit/models/projects';

var ProjectController = Ember.ObjectController.extend({
  content: null,
  count:  function(){
    return this.get('model.sprints.length');
  }.property('sprints.@each'),

  search: '',
  contentChanged: function(){
    Ember.run.next(this, function() {
      var srch = this.get('search');
      filter("sm-sprint-list", srch);
    });
  }.observes('search'),

  actions: {
    deleteProject: function() {
      var self = this;
      if (window.confirm("Are you sure you want to delete this project?")) {
        var model = self.get('model');
        var id = model.get('id');
        model.deleteRecord().then(
          function() {
            Ember.Logger.info('Deleted');
            self.transitionToRoute('projects');
          },
          function() {
            self.set('errorMessage', 'ProjectController: Delete failed!');
          }
        );
      }/*if*/
    }
  }
});

export default ProjectController;