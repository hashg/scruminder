import Projects from 'appkit/models/projects';

var get = Ember.get;
var ProjectsNewController = Ember.ArrayController.extend({
  needs: ['projects'],
  content: null,
  name: '',
  description: '',
  errorMessage: '',
  actions: {
    newProject: function() {
      var self = this;
      /*Since this is a array controller. We need to create here instead 
      of in the route*/
      var project = Projects.create({
        name: self.get('name'),
        description: self.get('description'),
      });

      project.save().then(
        function() {
          self.resetProperties();
          self.transitionToRoute('projects');
        }, 
        function() {
          self.set('errorMessage', "ProjectsNewController: save failed");
        }
      );
    }
  },
  resetProperties: function() {
    this.setProperties({
      name: null,
      description: null
    });
  }
});

export default ProjectsNewController;
