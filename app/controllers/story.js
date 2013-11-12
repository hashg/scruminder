import filter from 'appkit/utils/filter';
import Stories from 'appkit/models/stories';

var StoryController = Ember.ObjectController.extend({
  content: null,

  search: '',
  contentChanged: function(){
    Ember.run.next(this, function(){
      var srch = this.get('search');
      filter("sm-task-list", srch);
    });
  }.observes('search'),

  actions: {
    deleteStory: function() {
      var self = this;
      if (window.confirm("Are you sure you want to delete this story?")) {
        var id = self.get('id');
        var story = Stories.find(id);
        story.deleteRecord().then(
          function()
          {
            Ember.Logger.info('deleteStory: Deleted');
            self.transitionToRoute('sprint');
          }, 
          function()
          {
            Ember.Logger.info('deleteStory: Delete failed!');
          }
        );
      }
    }
  }
});

export default StoryController;