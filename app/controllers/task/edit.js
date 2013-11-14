import Tasks from 'appkit/models/tasks';

var TaskEditController = Ember.ObjectController.extend({
  content: null,
  needs: ['task'],
  types: ['feature', 'defect', 'testing', 'others'],
  dispositions: ['planned', 'added', 'carried over', 'discovered'],
  acceptors: ['dev', 'qa', 'docs'],
  estimates: ['2.0','4.0','6.0','8.0','10.0'],
  actions: {
    editTask: function() {
      var self = this;
      var model = self.get('model');

      var task = model.setProperties({
        name: self.get('name'),
        type: self.get('type'),
        disposition: self.get('disposition'),
        acceptor: self.get('acceptor'),
        estimate: self.get('estimate'),
        description: self.get('description')
      });

      task.save().then (
        function() {
          Ember.Logger.info('TaskEditController: saved');
          self.transitionToRoute('task');
        }, 
        function() {
          self.set('errorMessage', "TaskEditController: save failed");
        }
      );
    }
  }
});

export default TaskEditController;