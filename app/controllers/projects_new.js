import Project from 'appkit/models/project';
import Person from 'appkit/models/person';

var ProjectsNewController = Ember.ObjectController.extend({
  content: [],
  reset: function(){
    this.set('desc', '');
    this.set('name', '');
    return;
  },
  save: function()
  {
    var self = this;
    var name = this.get('name');
    var desc = this.get('desc');
    var prj = Project.create({name: name, desc: desc});
    prj.save().then(success, failed);
    function success(){
      self.reset();
      this.transitionTo('projects');
      console.log('ProjectsNewController: Saved!');
    }
    function failed(){
      console.log('ProjectsNewController: failed!');
    }
  }
});

export default ProjectsNewController;