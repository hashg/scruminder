import ScrumAdapter from 'appkit/adapters/scrumadapter';
import Eve from 'appkit/models/eve';

var Persons = Eve.extend({
  name: Ember.attr(),
});

Persons.adapter = ScrumAdapter.create();
Persons.url = "/persons";


export default Persons;

/*
import ScrumAdapter from 'appkit/adapter';
// import Project from 'appkit/models/project';
// import Vacation from 'appkit/models/vacation';

var Person = Ember.Model.extend({
  id: Ember.attr(),
  username: Ember.attr(),
  bugdbId: Ember.attr(),
  email: Ember.attr(),
  country: Ember.attr(),
  state: Ember.attr(),
  city: Ember.attr(),  
  managerId: Ember.attr(),
  isActive: Ember.attr(),
  created: Ember.attr(),
  updated: Ember.attr(),
  // vacations: Ember.hasMany(Vacation, {key: 'vacations', embedded: true}),
  // project: Ember.belongsTo(Project, {key: 'project_id', embedded: true})
});
Person.adapter = ScrumAdapter.create();
Person.url = "/api/persons";
Person.rootKey = "";
Person.collectionKey = "objects";
Person.camelizeKeys = true;

export default Person;
*/