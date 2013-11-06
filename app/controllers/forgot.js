var ForgotController = Ember.Controller.extend(EmberFormComponents.Form,{
  email:'',
  validateEmail: function (email, callback) {
    // Insert AJAX call here:
    setTimeout(function () {
      callback(true, 'Email address available');
    }, 1000);
  },
  actions: {
    forgot: function() {
      if(this.get('isFormValid')){
        this.resetProperties();
        this.transitionToRoute('index');
      }
      else{
        this.set('showFieldValidation', true);
      }
    }
  },
  serverFailed: function(msg) {
    this.set('errorMessage', "Server Failure");
  },
  loginFailed: function(msg) {
    this.set('errorMessage', msg);
  },
  resetProperties: function() {
    this.set('email', null);
  }
});

export default ForgotController;