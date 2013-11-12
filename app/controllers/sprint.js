import filter from 'appkit/utils/filter';
import Sprints from 'appkit/models/sprints';

var SprintController = Ember.ObjectController.extend({
  content: null,
  
  search: '',
  contentChanged: function(){
    Ember.run.next(this, function(){
      var srch = this.get('search');
      filter("sm-story-list", srch);
    });
  }.observes('search'),

  actions: {
    deleteSprint: function() {
      var self = this;
      if (window.confirm("Are you sure you want to delete this sprint?")) {
        var id = self.get('id');
        var sprint = Sprints.find(id);
        sprint.deleteRecord().then(
          function()
          {
            Ember.Logger.info('deleteSprint: Deleted');
            self.transitionToRoute('project');
          }, 
          function()
          {
            Ember.Logger.info('deleteSprint: Delete failed!');
          }
        );
      }
    }
  }
});

export default SprintController;