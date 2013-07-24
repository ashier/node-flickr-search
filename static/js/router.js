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
      "s/:keyword/:page": "search",
      '*actions': 'default'
    }
  });

  var initialize = function() {
    var router = new Router;
    var search;
    var imageCollection;
    var imageView;
    var currentKeyword;

    // Handle default Routes
    router.on('route:default', function() {
      search = new Search({
        el: $('#contentsearch')
      });

      search.clear();
      search.render();

      search.off("search");
      search.on("search", function(data) {
        router.navigate("s/" + data, {
          trigger: true
        });
      });

    });

    router.on('route:search',
      function(keyword, page) {

        try {
          if (search) {
            search.moveTop();
          } else {
            search = new Search({
              el: $('#contentsearch')
            });
            search.render();

            search.off("search");
            search.on("search", function(data) {
              router.navigate("s/" + data, {
                trigger: true
              });
            });
          }

          $('#search').val(keyword);
          $('#messageAlert').addClass("hidden");
        } catch (e) {}

        currentKeyword = keyword;

        if (imageCollection == null) {
          imageCollection = new Images();
          imageCollection.url = "api/search";
        }

        if (imageView == null) {
          imageView = new ImageView({
            model: imageCollection,
            el: $('#contents')
          });

          imageView.off("navigateToPage");
          imageView.on("navigateToPage", function(p) {
            console.log("navigateToPage", p, currentKeyword);
            imageCollectionFetch(imageCollection, currentKeyword, p, router);
          })
        } else {
          if (imageView) {
            imageView.page = page || 1;
          }
        }

        // fetch
        imageCollectionFetch(imageCollection, keyword, page || 1, router);
      }
    );

    function imageCollectionFetch(imageCollection, keyword, page, router) {
      console.log("k: ", keyword, page);

      $('#contents').empty();
      var loader = new Loader({
        el: $('#contents')
      });
      loader.render();

      imageCollection.fetch({
        data: {
          keyword: keyword,
          page: page || 1
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

    // Start Backbone History
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
