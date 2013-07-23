/* */
"use strict";

define([
    'backbone',
    'images/views/image',
    'images/collections/images',
    ], function(Backbone, ImageView, Images) {
        var Router = Backbone.Router.extend({
            routes: {
                '*actions':'default'
            }
        });

        var initialize = function() {
            var router = new Router;

            // Handle default Routes
            router.on('route:default',
                function() {
                }
            );

            // Start Backbone History
            Backbone.history.start({pushState:true});
        };

        return {
            initialize: initialize
        };
    }
);
