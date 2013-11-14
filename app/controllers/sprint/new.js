import Sprints from 'appkit/models/sprints';
import Stories from 'appkit/models/stories';

var SprintNewController = Ember.ObjectController.extend({
  needs: ['sprint'],
  content: null,
  name: '',
  priority: '',
  customer: '',
  disposition: '',
  stat: '',
  tracker: '',
  estimate: '',
  description: '',
  statuses: ['draft', 'defined', 'estimated', 'planned', 'implemented', 'verified', 'accepted'],
  dispositions: ['planned', 'added', 'carried over'],
  trackers: ['dev', 'qa'],
  customers: ['product manager', 'product owner', 'dev manager', 'qa manager'],
  priorities: [1,2,3,4],
  estimates: ['2.0','4.0','6.0','8.0','10.0'],
  sprint_id: Ember.computed.alias('controllers.sprint.id'),
  actions: {
    newStory: function() {
      var self = this;
      var model = self.get('model');
      var parent_id = self.get('sprint_id');
      var story = model.setProperties({
        name: self.get('name'),
        priority: self.get('priority'),
        customer: self.get('customer'),
        disposition: self.get('disposition'),
        stat: self.get('stat'),
        tracker: self.get('tracker'),
        estimate: self.get('estimate'),
        description: self.get('description'),
        sprint_id: parent_id
      });

      story.save().then(
        function() {
          /*update parent's list*/          
          var parent = self.get('controllers.sprint.content');
          parent.get('stories').pushObject(story);
          
          self.resetProperties();
          self.transitionToRoute('sprint');
        },
        function() {
          self.set('errorMessage', "SprintNewController: save failed");
        }
      );
    }
  },
  resetProperties: function() {
    this.setProperties({
      name: null,
      priority: null,
      customer: null,
      disposition: null,
      stat: null,
      tracker: null,
      estimate: null,
      description: null
    });
  }
});

export default SprintNewController;