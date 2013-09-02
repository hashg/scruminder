import Project from 'appkit/models/project';
import Person from 'appkit/models/person';

var ProjectsNewController = Ember.ObjectController.extend({
  needs: ['projects'],
  content: null,
  name: "",
  desc: "",
  addProject: function() {
    var project;
    var self = this;
    project = this.get('content');
    if (project) {
      project.set('name', this.get('name'));
      project.set('desc', this.get('desc'));
    } else {
      project = Project.create({
        'name': this.get('name'),
        'desc': this.get('desc')
      });
    }

    project.submit().then(
    function()
    {
      Ember.Logger.info('success');
      self.resetProperties();
      self.transitionToRoute('projects.new');
    },
    function()
    {
      Ember.Logger.info('failure');
    });
  },
  cancelProject: function() {
    this.resetProperties();
    this.transitionToRoute('projects');
  },
  resetProperties: function() {
    Ember.Logger.info('resetProperties');
    var project = this.get('content');
    if (project)
      this.set('content', null);
    return this.setProperties({'name': null, 'desc': null});
  }
});

export default ProjectsNewController;