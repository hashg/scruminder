import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';

var Profiles = Eve.extend({
  firstname: Ember.attr(),
  lastname: Ember.attr(),
  // born: Ember.attr(),
  // location: Ember.attr(),
  // role: Ember.attr(),
});

Profiles.adapter = ScrumAdapter.create();
Profiles.url = "/profiles";

export default Profiles;