import Stories from 'appkit/models/stories';
import Tasks from 'appkit/models/tasks';

var StoryNewController = Ember.ObjectController.extend({
  needs: ['story'],
  content: null,
  name: '',
  story_id: Ember.computed.alias('controllers.story.id'),
  actions: {
    newTask: function() {
      var self = this;
      var parent_id = this.get('story_id');
      var task = Tasks.create({name: self.get('name'), story_id: parent_id});
      task.save().then(function(){
        var parent = self.get('controllers.story');
        Ember.Logger.info(parent.get('etag'));
        debugger;
        parent.set('isDirty', true);
        var parent1 = Stories.find(parent_id);
        parent1.reload();
        Ember.Logger.info(parent1.get('etag'));
        parent.get('tasks').pushObject(task);
        self.resetProperties();
        self.transitionToRoute('story');
      }, function(){
        self.set('errorMessage', "StoryNew: save failed");
      });
    }
  },
  resetProperties: function() {
    this.set('name', null);
  }
});

export default StoryNewController;