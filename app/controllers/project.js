import filter from 'appkit/utils/filter';
import Projects from 'appkit/models/projects';
import People from 'appkit/models/people';
import Backlog from 'appkit/models/backlog';
import Sprints from 'appkit/models/sprints';
import Stories from 'appkit/models/stories';

var ProjectController = Ember.ObjectController.extend({
  content: null,
  count:  function() {
    return this.get('model.sprints.length');
  }.property('sprints.@each'),
  countBacklog:  function() {
    return this.get('model.backlogs.length');
  }.property('backlogs.@each'),
  countMember:  function() {
    return this.get('model.people.length');
  }.property('people.@each'),

  transferableSprints: function() {
    var ret = Ember.A();
    this.get('model.sprints').forEach(function(sprint, idx, i) {
      var stat = sprint.get('stat');
      Ember.Logger.info(stat);
      if (stat && (stat.toLowerCase() !== 'completed'))
        ret.push(sprint);
    });
    return ret ;
  }.property('sprints.@each.stat'),

  search: '',
  contentChanged: function() {
    Ember.run.next(this, function() {
      var srch = this.get('search');
      filter("sm-sprint-list", srch);
    });
  }.observes('search'),

  searchBacklog: '',
  changedBacklog: function() {
    Ember.run.next(this, function() {
      var srch = this.get('searchBacklog');
      filter("sm-backlog-list", srch);
    });
  }.observes('searchBacklog'),

  searchMember: '',
  changedMember: function() {
    Ember.run.next(this, function() {
      var srch = this.get('searchMember');
      filter("sm-people-list", srch);
    });
  }.observes('searchMember'),

  actions: {
    deleteProject: function() {
      var self = this;
      if (window.confirm("Are you sure you want to delete this project?")) {
        var model = self.get('model');
        model.deleteRecord().then(
          function() {
            Ember.Logger.info('Deleted');
            self.transitionToRoute('projects');
          },
          function() {
            self.set('errorMessage', 'ProjectController: Delete failed!');
          }
        );
      }/*if*/
    },
    removeMember: function(record) {
      var self = this;
      if (window.confirm("Are you sure you want to remove this member?")) {
        var model = self.get('model');        
        var id = record.get('id');
        var member = People.find(id);

        model.get('people').removeObject(member);
        model.save();

        // Ember.Logger.info('ProjectController::removeMember');
      }
    },
    deleteLog: function(record) {
      var self = this;
      if (window.confirm("Are you sure you want to delete this backlog?")) {
        var parent = this.get('model');
        var model = record;
        var child = Backlog.find(record.get('id'));
        model.deleteRecord().then(
          function() {
            Ember.Logger.info('deleteLog: Deleted');
            parent.get('backlogs').removeObject(model);
            self.transitionToRoute('project');
          },
          function() {
            self.set('errorMessage', 'ProjectController::deleteLog: Delete failed!');
          }
        );
        // Ember.Logger.info('ProjectController::deleteLog');
      }
    },
    addToSprint: function(backlog, sprint) {
      var self = this;
      var parent = Sprints.find(sprint.get('id'));
      var story = Stories.create({
        name: backlog.get('name'),
        priority: backlog.get('priority'),
        description: backlog.get('description'),
        sprint_id: parent.get('id')
      });
      story.save().then(
        function() {
          /*update parent's list*/
          parent.get('stories').pushObject(story);
          backlog.deleteRecord().then(
            function() {
              Ember.Logger.info("ProjectController::story/backlog-delete");
              self.get('backlogs').removeObject(backlog);
            },
            null
          );
        },
        function() {
          self.set('errorMessage', "ProjectController: save failed");
        }
      );

      Ember.Logger.info("ProjectController::addToSprint");
    }
  }
});

export default ProjectController;