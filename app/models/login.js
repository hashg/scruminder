import CustomAdapter from 'appkit/model';

var Login = Ember.Model.extend({
  username: Ember.attr(),
  password: Ember.attr()
});
Login.adapter = CustomAdapter.create();
Login.url = "/api/login";

export default Login;