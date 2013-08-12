import Register from 'appkit/models/Register';

var RegisterController = Ember.ObjectController.extend({
  content: [],
  signup: function(){
    Ember.Logger.info(this.get('username'));
    Ember.Logger.info(this.get('password'));
    Ember.Logger.info(this.get('repassword'));
    Ember.Logger.info(this.get('email'));

    var newRegister = Register.create({
      username: this.get('username'),
      password: this.get('password'),
      repassword: this.get('repassword'),
      email: this.get('email')
    });
    newRegister.save();
  }
});

export default RegisterController;