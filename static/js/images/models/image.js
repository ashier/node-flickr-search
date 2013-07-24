/* */
"use strict";

define([
  'backbone'
], function(Backbone) {

  var Image = Backbone.Model.extend({
    url:"api/search/image/"
  });

  return Image;
});
