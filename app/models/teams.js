import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';
import Projects from 'appkit/models/projects';
import Persons from 'appkit/models/persons';


var Teams = Eve.extend({
  name: Ember.attr(),
  project_id: Ember.attr(),
  persons: Ember.hasMany(Persons, {key: 'persons'}),
  role: Ember.attr()
});

Teams.adapter = ScrumAdapter.create();
Teams.url = "/teams";

export default Teams;