var RegisterController = Ember.ObjectController.extend({
  content: [],
  signup: function(){
    // Ember.Logger.info(this.get('username'));
    // Ember.Logger.info(this.get('password'));
    // Ember.Logger.info(this.get('repassword'));
    // Ember.Logger.info(this.get('email'));

    var self = this;
    var url = '/api/register';
    var data = this.getProperties('username', 'password', 'repassword', 'email');
    $.ajax({
      contentType: "application/json",
      dataType: 'json',
      type: 'post', 
      url: url, 
      cache: false,
      data: JSON.stringify(data)
    })
    .done(function(response){
      // $.cookie('token', response.token, { path: '/' });
      // self.set('token', response.token);
      var attemptedTransition = self.get('attemptedTransition');
      if(attemptedTransition) {
        attemptedTransition.retry();
        self.set('attemptedTransition', null);
      } else {
        this.setProperties({'username': '', 
                            'password': '', 
                            'repassword': '', 
                            'email': ''});
        self.transitionToRoute('login');
      }
    })
    .fail(function(response) {
      Ember.Logger.error(response.message);
    });

    // var newRegister = Register.create({
    //   username: this.get('username'),
    //   password: this.get('password'),
    //   repassword: this.get('repassword'),
    //   email: this.get('email')
    // });
    // newRegister.save();
  }
});

export default RegisterController;