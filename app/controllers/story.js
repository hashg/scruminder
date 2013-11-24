import filter from 'appkit/utils/filter';
import Stories from 'appkit/models/stories';
import Sprints from 'appkit/models/sprints';

var StoryController = Ember.ObjectController.extend({
  content: null,

  search: '',
  contentChanged: function(){
    Ember.run.next(this, function(){
      var srch = this.get('search');
      filter("sm-task-list", srch);
    });
  }.observes('search'),

  count:  function() {
    return this.get('model.tasks.length');
  }.property('tasks.@each'),

  actions: {
    deleteStory: function() {
      var self = this;
      if (window.confirm("Are you sure you want to delete this story?")) {
        var model = self.get('model');
        model.deleteRecord().then(
          function() {
            Ember.Logger.info('deleteStory: Deleted');
            var parent = Sprints.find(model.get('sprint_id'));
            parent.get('stories').removeObject(model);
            self.transitionToRoute('sprint');
          }, 
          function() {
            self.set('errorMessage', 'StoryController: Delete failed!');
          }
        );
      }
    }
  }
});

export default StoryController;