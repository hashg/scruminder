
import Projects from 'appkit/models/projects';

var get = Ember.get;
var ProjectsNewController = Ember.ArrayController.extend({
  needs: ['projects'],
  content: null,
  name: '',
  actions: {
    newProject: function() {
      var self = this;
      var project = Projects.create({
        'name': this.get('name')
      });
      project.save().then(function(){
        self.resetProperties();
        self.transitionToRoute('projects');
      }, function(){
        self.set('error', "save failed");
      });
    }
  },
  resetProperties: function() {
    this.set('name', null);
  }
});

export default ProjectsNewController;
