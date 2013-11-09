import Sprints from 'appkit/models/sprints';

var SprintEditController = Ember.ObjectController.extend({
  content: null,
  needs: ['sprint'],
  id: Ember.computed.alias('controllers.sprint.id'),
  name: Ember.computed.alias('controllers.sprint.name'),
  etag: Ember.computed.alias('controllers.sprint.etag'),
  actions: {
    editSprint: function() {
      var self = this;
      var id = self.get('id');
      var sprint = Sprints.find(id);
      sprint.setProperties({
        'name': self.get('name')
      });
      sprint.save().then(
        function()
        {
          Ember.Logger.info('Edit saved');
          self.transitionToRoute('sprint');
        }, 
        function()
        {
          Ember.Logger.info('SprintEditController: save failed!');
        }
      );
    }
  }
});

export default SprintEditController;