import CustomAdapter from 'appkit/model';

var Register = Ember.Model.extend({
  username: Ember.attr(),
  password: Ember.attr(),
  repassword: Ember.attr(),
  email: Ember.attr()
});
Register.adapter = CustomAdapter.create();
Register.url = "/api/register";

export default Register;