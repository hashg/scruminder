import Profiles from 'appkit/models/profiles';

var ProfilesRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin,{
  model:function() {
    Ember.Logger.info("ProfilesRoute:Model");
    return Profiles.find();
  }
});

export default ProfilesRoute;