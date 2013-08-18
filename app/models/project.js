import CustomAdapter from 'appkit/model';
import Person from 'appkit/models/person';

var Project = Ember.Model.extend({
  id: Ember.attr(),
  name: Ember.attr(),
  desc: Ember.attr(),  
  isActive: Ember.attr(),
  created: Ember.attr(),
  updated: Ember.attr(),
  // persons: Ember.hasMany('Person', {key: 'persons', embedded: true})
});
Project.adapter = CustomAdapter.create();
Project.url = "/api/projects";
Project.rootKey = "";
Project.collectionKey = "objects";
Project.camelizeKeys = true;

export default Project;