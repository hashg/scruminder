import Project from 'appkit/models/project';
import Person from 'appkit/models/person';

var ProjectEditController = Ember.ObjectController.extend({
  content: [],
  needs: ['project'],
  idBinding: 'controllers.project.id',
  nameBinding: 'controllers.project.name',
  descBinding: 'controllers.project.desc',
  save: function()
  {
    var self = this;
    console.log('Proj Edit');
    var id = self.get('id');
    var name = self.get('name');
    var desc = self.get('desc');
    var prj = Project.find(id);
    prj.set('name', name);
    prj.set('desc', desc);
    prj.save().then(function(){console.log('PsNew saved');}, function(){console.log('PsNew save failed!');});
  }
});

export default ProjectEditController;