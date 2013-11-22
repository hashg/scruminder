import filter from 'appkit/utils/filter';
import Sprints from 'appkit/models/sprints';

var SprintController = Ember.ObjectController.extend({
  needs: ['project'],
  content: null,

  sprints: Ember.computed.alias('controllers.project.sprints'),
  
  
  search: '',
  contentChanged: function(){
    Ember.run.next(this, function(){
      var srch = this.get('search');
      filter("sm-story-list", srch);
    });
  }.observes('search'),

  isCreated: function() {
    var stat = this.get('stat');
    if (stat && stat.toLowerCase() === 'created')
      return true;
    return false;
  }.property('stat'),

  isStarted: function() {
    var stat = this.get('stat');
    if (stat && stat.toLowerCase() === 'started')
      return true;
    return false;
  }.property('stat'),

  createdSprints: function() {
    var ret = Ember.A();
    var self = this;
    this.get('sprints').forEach(function(sprint, idx, i) {
      var stat = sprint.get('stat');
      var id = sprint.get('id');
      var thisId = self.get('id');
      if ((id !== thisId) && (stat && (stat.toLowerCase() === 'created')))
        ret.push(sprint);
    });
    return ret ;
  }.property('sprints.@each.stat'),

  actions: {
    moveToSprint: function(story, sprint) {
      /*
      - first create story in another sprint
      - delete this story from this sprint
      */
    },
    deleteSprint: function() {
      var self = this;
      if (window.confirm("Are you sure you want to delete this sprint?")) {
        var model = self.get('model');
        model.deleteRecord().then(
          function() {
            Ember.Logger.info('deleteSprint: Deleted');
            self.transitionToRoute('project');
          }, 
          function() {
            self.set('errorMessage', 'SprintController: Delete failed!');
          }
        );
      }/*if*/
    },
    startSprint: function() {
      var self = this;
      if (window.confirm("Are you sure you want to start this sprint?")) {
        var model = self.get('model');
        model.set('stat', 'started');
        model.save().then(
          function() {
            Ember.Logger.info('startSprint: Started');
          }, 
          function() {
            self.set('errorMessage', 'SprintController: Start failed!');
          }
        );
      }/*if*/
    },
    completeSprint: function() {
      var self = this;
      if (window.confirm("Are you sure you want to complete this sprint?")) {
        var model = self.get('model');
        model.set('stat', 'completed');
        model.save().then(
          function() {
            Ember.Logger.info('completeSprint: Completed');
          }, 
          function() {
            self.set('errorMessage', 'SprintController: Complete failed!');
          }
        );
      }/*if*/
    },
  }
});

export default SprintController;