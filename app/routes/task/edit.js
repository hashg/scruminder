import Tasks from 'appkit/models/tasks';

var TaskEditRoute = Ember.Route.extend({
  model: function(){ 
    return this.modelFor('task');
  }
});

export default TaskEditRoute;