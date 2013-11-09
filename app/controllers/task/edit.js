import Tasks from 'appkit/models/tasks';

var TaskEditController = Ember.ObjectController.extend({
  content: null,
  needs: ['task'],
  id: Ember.computed.alias('controllers.task.id'),
  name: Ember.computed.alias('controllers.task.name'),
  etag: Ember.computed.alias('controllers.task.etag'),
  actions: {
    editTask: function() {
      var self = this;
      var id = self.get('id');
      var task = Tasks.find(id);
      task.setProperties({
        'name': self.get('name')
      });
      task.save().then(
        function()
        {
          Ember.Logger.info('TaskEditController: saved');
          self.transitionToRoute('task');
        }, 
        function()
        {
          Ember.Logger.info('TaskEditController: save failed!');
        }
      );
    }
  }
});

export default TaskEditController;