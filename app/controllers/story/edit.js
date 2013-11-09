import Stories from 'appkit/models/stories';

var SprintEditController = Ember.ObjectController.extend({
  content: null,
  needs: ['story'],
  id: Ember.computed.alias('controllers.story.id'),
  name: Ember.computed.alias('controllers.story.name'),
  etag: Ember.computed.alias('controllers.story.etag'),
  actions: {
    editStory: function() {
      var self = this;
      var id = self.get('id');
      var story = Stories.find(id);
      story.setProperties({
        'name': self.get('name')
      });
      story.save().then(
        function()
        {
          Ember.Logger.info('Edit saved');
          self.transitionToRoute('story');
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