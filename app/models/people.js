import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';
import Projects from 'appkit/models/projects';

var People = Eve.extend({
  firstname: Ember.attr(),
  lastname: Ember.attr(),
  manager: Ember.attr(),
  description: Ember.attr(),
  country: Ember.attr(),
  state: Ember.attr(),
  city: Ember.attr(),
  Projects: Ember.hasMany(Projects, {key: 'projects'}),
});

People.adapter = ScrumAdapter.create();
People.url = "/people";

export default People;

