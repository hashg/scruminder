import CustomAdapter from 'appkit/model';
import Person from 'appkit/models/person';

var Vacation = Ember.Model.extend({
  id: Ember.attr(),
  fromDate: Ember.attr(),
  toDate: Ember.attr(),  
  country: Ember.attr(),
  state: Ember.attr(),
  city: Ember.attr(),  
  comments: Ember.attr(),  
  created: Ember.attr(),
  updated: Ember.attr(),
  person: Ember.belongsTo('Person', {key: 'person', embedded: true})
});
Vacation.adapter = CustomAdapter.create();
Vacation.url = "/api/vacations";
Vacation.rootKey = "";
Vacation.camelizeKeys = true;

export default Vacation;

