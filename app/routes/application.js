import Profiles from 'appkit/models/profiles';

var ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  actions: {
    logout: function() {
      var self = this;
      var authToken = (document.cookie.match(/authToken=([^;]+)/) || [])[1];
      var username = (document.cookie.match(/username=([^;]+)/) || [])[1];
      var etag = (document.cookie.match(/etag=([^;]+)/) || [])[1];
      var _id = (document.cookie.match(/_id=([^;]+)/) || [])[1];
      Ember.$.ajax(Ember.SimpleAuth.serverTokenEndpoint + "/" + _id, {type: 'DELETE', headers:{ "If-Match": etag} });
      self.get('session').destroy();
      self.transitionTo(Ember.SimpleAuth.routeAfterLogout);
    }
  }
});

export default ApplicationRoute;
