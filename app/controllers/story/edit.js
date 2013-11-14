import Stories from 'appkit/models/stories';

var SprintEditController = Ember.ObjectController.extend({
  content: null,
  needs: ['story'],
  statuses: ['draft', 'defined', 'estimated', 'planned', 'implemented', 'verified', 'accepted'],
  dispositions: ['planned', 'added', 'carried over'],
  trackers: ['dev', 'qa'],
  customers: ['product manager', 'product owner', 'dev manager', 'qa manager'],
  priorities: [1,2,3,4],
  estimates: ['2.0','4.0','6.0','8.0','10.0'],
  actions: {
    editStory: function() {
      var self = this;
      var model = self.get('model');

      var story = model.setProperties({
        name: self.get('name'),
        priority: self.get('priority'),
        customer: self.get('customer'),
        disposition: self.get('disposition'),
        stat: self.get('stat'),
        tracker: self.get('tracker'),
        estimate: self.get('estimate'),
        description: self.get('description'),
      });

      story.save().then (
        function() {
          Ember.Logger.info('SprintEditController: Edit saved');
          self.transitionToRoute('story');
        }, 
        function() {
          self.set('errorMessage', "SprintEditController: Edit failed");
        }
      );
    }
  }
});

export default SprintEditController;