import filter from 'appkit/utils/filter';
import Projects from 'appkit/models/projects';
import People from 'appkit/models/people';

var ProjectController = Ember.ObjectController.extend({
  content: null,
  count:  function(){
    return this.get('model.sprints.length');
  }.property('sprints.@each'),
  countMember:  function(){
    return this.get('model.people.length');
  }.property('people.@each'),

  search: '',
  searchMember: '',
  contentChanged: function(){
    Ember.run.next(this, function() {
      var srch = this.get('search');
      filter("sm-sprint-list", srch);
    });
  }.observes('search'),
  changedMember: function(){
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
      if (window.confirm("Are you sure you want to delete this project?")) {

        var model = self.get('model');        
        var id = record.get('id');
        var member = People.find(id);

        model.get('people').removeObject(member);
        model.save();

        // Ember.Logger.info('ProjectController::removeMember');
      }
    }
  }
});

export default ProjectController;