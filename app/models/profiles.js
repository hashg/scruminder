import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';
import Projects from 'appkit/models/projects';
import People from 'appkit/models/people';

var Profiles = Eve.extend({
  firstname: Ember.attr(),
  lastname: Ember.attr(),
  username: Ember.attr(),/*readonly - see scrumadapter _ajax::PATCH*/
  email: Ember.attr(),/*readonly - see scrumadapter _ajax::PATCH*/
  country: Ember.attr(),
  state: Ember.attr(),
  city: Ember.attr(),
  manager: Ember.belongsTo(People, {key: 'manager'}),
  // manager: Ember.attr(),
  projects: Ember.hasMany(Projects, {key: 'projects'}),
});

Profiles.adapter = ScrumAdapter.create();
Profiles.url = "/profiles";

export default Profiles;