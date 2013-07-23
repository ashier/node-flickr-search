"use strict";

(function() {

  var path = require('path'),
    engines = require('consolidate');

  module.exports = function() {

    return {
      initialize: function(app, express) {

        // Node Flickr Search for Pollenizer
        // Key:
        // c4aa8bb5e96ee85dac99c2030bdd0fe8

        // Secret:
        // 38a776bb1d78361f


        // all environments
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/views');
        app.engine('html', engines.hogan);
        app.set('view engine', 'html');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        app.use(express.session({
          secret: 'nodeflickrsearchpollenizer'
        }));
        app.use(express.methodOverride());
        app.use(app.router);

        app.use('/static', express.static(path.join(__dirname, '..', 'static')));

        // development only
        if ('development' == app.get('env')) {
          app.use(express.errorHandler());
        }

      }
    };

  }();

}());
