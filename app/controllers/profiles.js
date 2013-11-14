import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';
import Profiles from 'appkit/models/profiles';

var ProfilesController = Ember.ArrayController.extend({
  content: null,
  firstname: '',
  lastname: '',
  actions: {
    newProfile: function() {
      var self = this;
      //we did not create a empty record so we create it directly
      var profiles = Profiles.create({
        firstname: self.get('firstname'),
        lastname: self.get('lastname'),
      });

      profiles.save().then(
        function() {
          self.set('errorMessage', "ProfilesController: saved");
        }, 
        function() {
          self.set('errorMessage', "ProfilesController: save failed");
        }
      );
      Ember.Logger.info("ProfilesController:newProfile");
    },
    updateProfile: function() {
      var self = this;
      var model = self.get('model');
      //we did not create a empty record so we create it directly
      var profiles = model.setProperties({
        firstname: self.get('firstname'),
        lastname: self.get('lastname'),
      });

      profiles.save().then(
        function() {
          self.set('errorMessage', "ProfilesController: saved");
        }, 
        function() {
          self.set('errorMessage', "ProfilesController: save failed");
        }
      );
      Ember.Logger.info("ProfilesController:updateProfile");
    }
  }
});

export default ProfilesController;