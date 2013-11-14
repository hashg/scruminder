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
        var model = self.get('model');
        model.deleteRecord().then(
          function() {
            Ember.Logger.info('deleteTask: Deleted');
            self.transitionToRoute('story');
          }, 
          function() {
            self.set('errorMessage', 'TaskController: Delete failed!');
          }
        );
      }/*if*/
    }
  }
});

export default TaskController;