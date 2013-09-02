// var IndexRoute = Ember.Route.extend({
//   model: function() {
//     return ['red', 'yellow', 'blue'];
//   }
// });

var IndexRoute = Ember.Route.extend({
  redirect: function(){
    this.transitionToRoute('projects');
  }
});

export default IndexRoute;
