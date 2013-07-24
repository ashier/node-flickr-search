/* */
"use strict";

define([
  'backbone',
  'images/models/image'
], function(Backbone, Image) {

  var Images = Backbone.Collection.extend({
    model: Image,
  });

  return Images;
});
