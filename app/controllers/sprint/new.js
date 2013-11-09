import Sprints from 'appkit/models/sprints';
import Stories from 'appkit/models/stories';

var SprintNewController = Ember.ObjectController.extend({
  needs: ['sprint'],
  content: null,
  name: '',
  sprint_id: Ember.computed.alias('controllers.sprint.id'),
  actions: {
    newStory: function() {
      var self = this;
      var parent_id = this.get('sprint_id');
      var story = Stories.create({name: self.get('name'), sprint_id: parent_id});
      story.save().then(function(){
        var parent = self.get('controllers.sprint');
        parent.get('stories').pushObject(story);
        self.resetProperties();
        self.transitionToRoute('sprint');
      }, function(){
        self.set('errorMessage', "SprintNew: save failed");
      });
    }
  },
  resetProperties: function() {
    this.set('name', null);
  }
});

export default SprintNewController;