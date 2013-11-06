var LoginRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.setProperties({
      identification: undefined, password: undefined, errorMessage: undefined
    });
  }
});

export default LoginRoute;