/* */
"use strict";

define([
  'backbone',
  'images/views/image',
  'images/views/search',
  'images/views/loader',
  'images/models/image',
  'images/collections/images',
], function(Backbone, ImageView, Search, Loader, Image, Images) {
  var Router = Backbone.Router.extend({
    routes: {
      "s/:keyword": "search",
      '*actions': 'default'
    }
  });

  var initialize = function() {
    var router = new Router;
    var search;

    // Handle default Routes
    router.on('route:default', function() {
      search = new Search({
        el: $('#contentsearch')
      });
      search.clear();
      search.render();

      search.on("search", function(data) {
        router.navigate("s/" + data, {
          trigger: true
        });
      });

    });

    router.on('route:search',
      function(keyword) {

        try {
          if (search) {
            search.moveTop();
          } else {
            search = new Search({
              el: $('#contentsearch')
            });
            search.render();

            search.on("search", function(data) {
              router.navigate("s/" + data, {
                trigger: true
              });
            });
          }

          $('#search').val(keyword);
          $('#messageAlert').addClass("hidden");
        } catch (e) {}

        var loader = new Loader({
          el: $('#contents')
        });
        loader.render();

        var imageCollection = new Images();
        imageCollection.url = "api/search";

        var imageView = new ImageView({
          model: imageCollection,
          el: $('#contents')
        });

        // fetch
        imageCollection.fetch({
          data: {
            keyword: keyword
          },

          success: function(model) {
            var photos = model.toJSON()[0];
            console.log("photos loaded", photos);
          },

          error: function(error) {
            console.log("Collection Error", error);
            $('#messageAlert').removeClass("hidden");
            router.navigate("/", {
              trigger: true
            });
          }
        });

      }
    );

    // Start Backbone History
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
