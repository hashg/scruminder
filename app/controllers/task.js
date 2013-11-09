import filter from 'appkit/utils/filter';
import Tasks from 'appkit/models/tasks';
import Stories from 'appkit/models/stories';

var TaskController = Ember.ObjectController.extend({
  content: null,
  search: '',

  contentChanged: function(){
    Ember.run.next(this, function(){
      var srch = this.get('search');
      filter("sm-task-list", srch);
    });
  }.observes('search'),
  actions: {
    deleteTask: function() {
      var self = this;
      if (window.confirm("Are you sure you want to delete this task?")) {
        var id = self.get('id');
        var task = Tasks.find(id);
        // var parent = Stories.find(task.get('story_id'));
        task.deleteRecord().then(
          function()
          {
            Ember.Logger.info('deleteTask: Deleted');
            // debugger;
            // parent.get('tasks').removeObject(task);
            self.transitionToRoute('story');
          }, 
          function()
          {
            Ember.Logger.info('deleteTask: Delete failed!');
          }
        );
      }
    }
  }
});

export default TaskController;