import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';
import Profiles from 'appkit/models/profiles';
import People from 'appkit/models/people';

Profiles.reopen({
  manager: Ember.belongsTo(People, {key: 'manager'}),
});

var ProfilesController = Ember.ArrayController.extend({
  content: null,
  managers: People.find(),
  isEditing: false,

  actions: {
    edit: function() {
      this.set('isEditing', true);
    },
    cancel: function() {
      this.set('isEditing', false);
    },
    updateProfile: function(record) {
      var self = this;
      record.save().then(
        function() {
          self.set('isEditing', false);
          self.set('errorMessage', "ProfilesController: saved");
        }, 
        function() {
          self.set('errorMessage', "ProfilesController: save failed");
        }
      );
    }
  }
});

export default ProfilesController;