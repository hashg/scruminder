import filter from 'appkit/utils/filter';
import Sprints from 'appkit/models/sprints';
import Stories from 'appkit/models/stories';
import Projects from 'appkit/models/projects';

var SprintController = Ember.ObjectController.extend({
  needs: ['project'],
  content: null,

  errorMessage: '',
  clearMessage: function() {
    Ember.Logger.info('SprintController:clearMessage');
    var self = this;
    var errorMessage = self.get('errorMessage');
    if( errorMessage ) {
      Ember.Logger.info('SprintController:clearMessage:errorMessage');
      Ember.run.debounce(self, function() { self.set('errorMessage', ''); }, 2000);
    }
  }.observes('errorMessage'),

  sprints: Ember.computed.alias('controllers.project.sprints'),
  
  search: '',
  contentChanged: function(){
    Ember.run.next(this, function(){
      var srch = this.get('search');
      filter("sm-story-list", srch);
    });
  }.observes('search'),

  count:  function() {
    return this.get('model.stories.length');
  }.property('stories.@each'),

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
    move2sprint: function(story, sprint) {
      /*
      - first create story in another sprint
      - DO NOT delete this story from this sprint. We might need track of 
      */
      var self = this;
      var model = Stories.create();
      var parent_id = sprint.get('id');
      model.setProperties({
        name: story.get('name'),
        priority: story.get('priority'),
        customer: story.get('customer'),
        disposition: story.get('disposition'),
        stat: story.get('stat'),
        tracker: story.get('tracker'),
        estimate: story.get('estimate'),
        description: story.get('description'),
        carried_over: story.get('sprint_id'),
        sprint_id: parent_id
      });
      model.save().then(
        function() {
          self.set('errorMessage', "move2sprint: successfull");
          sprint.get('stories').pushObject(model);
        },
        function() {
          self.set('errorMessage', "move2sprint: save failed");
        }
      );
    },
    deleteSprint: function() {
      var self = this;
      if (window.confirm("Are you sure you want to delete this sprint?")) {
        var model = self.get('model');
        model.deleteRecord().then(
          function() {
            Ember.Logger.info('deleteSprint: Deleted');
            var parent = Projects.find(model.get('project_id'));
            parent.get('sprints').removeObject(model);
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