define("appkit/tests/acceptance/index_test",
  ["appkit/routes/index","appkit/app"],
  function(Index, App) {
    "use strict";

    module("Acceptances - Index", {
      setup: function(){
        App.reset();
      }
    });

    test("index renders", function(){
      expect(3);

      visit('/').then(function(){
        ok(exists("h2:contains('Welcome to Ember.js')"));

        var list = find("ul li");
        equal(list.length, 3);
        equal(list.text(), "redyellowblue");
      });
    });

  });
define("appkit/tests/unit/routes/index_test",
  ["appkit/routes/index","appkit/app"],
  function(Index, App) {
    "use strict";

    var route;

    module("Unit - IndexRoute", {
      setup: function(){
        route = App.__container__.lookup('route:index');
      }
    });

    test("it exists", function(){
      ok(route);
      ok(route instanceof Ember.Route);
    });

    test("#model", function(){
      deepEqual(route.model(), ['red', 'yellow', 'blue']);
    });

  });
//@ sourceMappingURL=tests.js.map