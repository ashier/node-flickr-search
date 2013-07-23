/**/
requirejs.config({
    baseUrl:'/static/js',
    paths:{
        jquery:'vendors/jquery',
        underscore:'vendors/underscore',
        backbone:'vendors/backbone'
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require([
    'images'
    ], function(App) {
        console.log("Flickr Search Application Initialized...");
        App.initialize();
    }
);
