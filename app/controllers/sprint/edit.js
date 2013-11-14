import Sprints from 'appkit/models/sprints';

var SprintEditController = Ember.ObjectController.extend({
  content: null,
  needs: ['sprint'],
  actions: {
    editSprint: function() {
      var self = this;
      var model = self.get('model');

      var sprint = model.setProperties({
        name: self.get('name'),
        start_dt: self.get('start_dt'),
        end_dt: self.get('end_dt'),
        description: self.get('description')
      });

      sprint.save().then (
        function() {
          Ember.Logger.info('ProjectEditController: Edit saved');
          self.transitionToRoute('sprint');
        }, 
        function() {
          self.set('errorMessage', "SprintEditController: Edit failed");
        }
      );
    }
  }
});

export default SprintEditController;