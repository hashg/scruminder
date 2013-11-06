var LoginController = Ember.Controller.extend(Ember.SimpleAuth.LoginControllerMixin, EmberFormComponents.Form,{
  // serialize the credentials from the view to what the server expects
  username:'',
  password:'',
  actions: {
    login: function() {
      if(!this.get('isFormValid')){
        this.set('showFieldValidation', true);
      }
      var self = this;
      var data = this.getProperties('identification', 'password');
      if (!Ember.isEmpty(data.identification) && !Ember.isEmpty(data.password)) {
        var postData = JSON.stringify(self.serializeCredentials(data.identification, data.password));
        Ember.$.ajax(Ember.SimpleAuth.serverSessionRoute, {
          type:        'POST',
          data:        postData,
          contentType: 'application/json',
          success: function(data, textStatus, jqXHR)
          {
            Ember.Logger.info("Login success");
            
            var response = data;
            var error = false;
            var err_mesg = "";
            if(response) {              
              if (response && response.status === 'ERR')
              {
                //Eve server send HTTP 200 and includes ERR inside the data.
                error = true;
                err_mesg = response.issues;
              }
              else if ( response[0] === '<') {
                //Server should return json. It it emits html then something went wrong
                error = true;
                err_mesg = ["Server error !"];
              }
            } else {
              error = true;
              err_mesg = ['No Data!'];
            }

            if (error) {
              Ember.tryInvoke(self, 'serverFailed', err_mesg);
            } else {
              self.get('session').setup(data);
              var attemptedTransition = self.get('session.attemptedTransition');
              if (attemptedTransition) {
                attemptedTransition.retry();
                self.set('session.attemptedTransition', null);
              } else {
                self.transitionToRoute(Ember.SimpleAuth.routeAfterLogin);
              }
            }
          },
          error: function (jqXHR, textStatus, errorThrown)
          {
            /*
            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                alert('Time out error.');
            } else if (exception === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }
            */
            Ember.tryInvoke(self, 'loginFailed', arguments);
          }
        });
      }
      this.resetProperties();
    }
  },
  serializeCredentials: function(identification, password) {
    return  { "auth": btoa(identification+":"+password) } ;
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
  }
});

export default LoginController;