import Profiles from 'appkit/models/profiles';

var ProfilesRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin,{
  model:function() {
    return Profiles.find();
  }
});

export default ProfilesRoute;