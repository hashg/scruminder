import CustomAdapter from 'appkit/model';

var Holiday = Ember.Model.extend({
  id: Ember.attr(),
  fromDate: Ember.attr(),
  toDate: Ember.attr(),  
  country: Ember.attr(),
  state: Ember.attr(),
  city: Ember.attr(),  
  comments: Ember.attr(),
  desc: Ember.attr(),  
  created: Ember.attr(),
  updated: Ember.attr()
});
Holiday.adapter = CustomAdapter.create();
Holiday.url = "/api/vacations";
Holiday.rootKey = "";
Holiday.camelizeKeys = true;

export default Holiday;
