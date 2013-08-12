var LoginController = Ember.ObjectController.extend({
  content: [],
  // token: $.cookie('token'),
  token: '',
  reset: function(){
    this.setProperties({
      username:"",
      password:""
    });
  },
  login: function(){
    var self = this;
    var data = this.getProperties('username', 'password');   
    $.ajax({
      contentType: "application/json",
      dataType: 'json',
      type: 'post', 
      url: '/api/login', 
      cache: false,
      data: JSON.stringify(data)
    })
    .done(function(response){
      // $.cookie('token', response.token, { path: '/' });
      self.set('token', response.token);
      var attemptedTransition = self.get('attemptedTransition');
      if(attemptedTransition){
        attemptedTransition.retry();
        self.set('attemptedTransition', null);
      } else {
        self.transitionToRoute('projects');
      }
    })
    .fail(function(response){
      Ember.Logger.error("failed!");
    });
    


    // $.post('/api/login', data, json).then(
    // function (response) {
    //   console.log(response);
    //   if (response.success){
        // self.set('token', response.token);
        // var attemptedTransition = self.get('attemptedTransition');
        // if(attemptedTransition){
        //  attemptedTransition.retry();
        //  self.set('attemptedTransition', null)
        // } else {
        //  self.transitionToRoute('projects');
        // }
    //   }
    // },
    // function (json){
    //   log.error('Error');
    // });
    // record.save();
    // record.on("didCreateRecord", function(data) {
    //   var self = this;
    //   log.info(this._data.token);
    //   self.set('token', this._data.token);
    // });
  }
});

export default LoginController;