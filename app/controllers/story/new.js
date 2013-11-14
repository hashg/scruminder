import Stories from 'appkit/models/stories';
import Tasks from 'appkit/models/tasks';

var StoryNewController = Ember.ObjectController.extend({
  needs: ['story'],
  content: null,
  name: '',
  type: '',
  disposition: '',
  acceptor: '',
  estimate: '',
  description: '',
  types: ['feature', 'defect', 'testing', 'others'],
  dispositions: ['planned', 'added', 'carried over', 'discovered'],
  acceptors: ['dev', 'qa', 'docs'],
  estimates: ['2.0','4.0','6.0','8.0','10.0'],
  story_id: Ember.computed.alias('controllers.story.id'),
  actions: {
    newTask: function() {
      var self = this;
      var model = self.get('model');
      var parent_id = self.get('story_id');

      var task = model.setProperties({
        name: self.get('name'),
        type: self.get('type'),
        disposition: self.get('disposition'),
        acceptor: self.get('acceptor'),
        estimate: self.get('estimate'),
        description: self.get('description'),
        story_id: parent_id
      });

      task.save().then (
        function() {
          /*update parent's list*/
          var parent = self.get('controllers.story.content');
          parent.get('tasks').pushObject(task);
          
          self.resetProperties();
          self.transitionToRoute('story');
        }, 
        function() {
          self.set('errorMessage', "StoryNewController: save failed");
        }
      );
    }
  },
  resetProperties: function() {
    this.setProperties({
      name: null,
      type: null,
      disposition: null,
      acceptor: null,
      estimate: null,
      description: null
    });
  }
});

export default StoryNewController;