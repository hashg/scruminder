import Project from 'appkit/models/project';
import Person from 'appkit/models/person';

var ProjectsNewController = Ember.ObjectController.extend({
  content: [],
  save: function()
  {
    console.log('PsNew');
    var name = this.get('name');
    var desc = this.get('desc');
    var prj = Project.create({name: name, desc: desc, person: null});
    prj.save().then(function(){console.log('PsNew saved');}, function(){console.log('PsNew save failed!');});
  }
});

export default ProjectsNewController;