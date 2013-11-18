import Projects from 'appkit/models/projects';
import People from 'appkit/models/people';

var ProjectAddController = Ember.ObjectController.extend({
  needs: ['project'],
  content: null,
  member: '',
  members: People.find(),
  project_id: Ember.computed.alias('controllers.project.id'),
  actions: {
    addMember: function() {
      Ember.Logger.info('ProjectAddController:addMember');

      var self = this;      
      var model = self.get('controllers.project.content');
      var projMem = model.get('people').get('content');

      if ( projMem.length > 0 ) {
        projMem.some(function(person, index, myself) {
          if ( person.id === self.get('member') )
            self.set('member', '');
        });
      }

      //Push people into project
      var mem = self.get('member');
      if( mem ) {
        Ember.Logger.info('ProjectAddController: New Member');
        var people = People.find(mem); 
        // if (people) //TODO
        model.get('people').pushObject(people);
      }

      model.save().then (
        function() {
          self.transitionToRoute('project');
        }, 
        function() {
          self.set('errorMessage', "ProjectAddController: save failed");
        }
      );
    }
  },
  resetProperties: function() {
    this.setProperties({
      member: ''
    });
  }
});

export default ProjectAddController;