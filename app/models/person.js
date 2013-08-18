import CustomAdapter from 'appkit/model';
import Project from 'appkit/models/project';
import Vacation from 'appkit/models/vacation';

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
  vacations: Ember.hasMany('Vacation', {key: 'vacations', embedded: true}),
  project: Ember.belongsTo('Project', {key: 'project', embedded: true})
});
Person.adapter = CustomAdapter.create();
Person.url = "/api/persons";
Person.rootKey = "";
Person.camelizeKeys = true;

export default Person;

