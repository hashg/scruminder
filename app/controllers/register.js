import Register from 'appkit/models/register';

var RegisterController = Ember.Controller.extend(EmberFormComponents.Form,{
  username:'',
  password:'',
  email:'',
  validateEmail: function (email, callback) {
    // Insert AJAX call here:
    setTimeout(function () {
      callback(true, 'Email address available');
    }, 1000);
  },
  actions: {
    register: function() {
      var self = this;
      //TODO: Currently does not work after first use.
      // if(this.get('isFormValid')){
      //   this.resetProperties();
      //   this.transitionToRoute('index');
      // }
      if(!self.get('isFormValid')){
        self.set('showFieldValidation', true);
      }
      var register = Register.create({
          username : self.get('username'),
          password : self.get('password'),
          email : self.get('email'),
        });
      register.save().then(
        function(){
          //success
          Ember.Logger.info("Register Successfull");
          self.resetProperties();
          self.transitionToRoute('login');
        }, 
        function(){
          //error
        }
      );
    }
  },
  serverFailed: function(msg) {
    this.set('errorMessage', "Server Failure");
  },
  loginFailed: function(msg) {
    this.set('errorMessage', msg);
  },
  resetProperties: function() {
    this.set('username', null);
    this.set('password', null);
    this.set('email', null);
  }
});

export default RegisterController;