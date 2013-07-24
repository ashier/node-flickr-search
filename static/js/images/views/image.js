/* */
"use strict";

define([
  'backbone'
], function(Backbone) {

  var View = Backbone.View.extend({

    page: 1,

    events: {
      'click a': 'paginate'
    },

    initialize: function() {
      this.listenTo(this.model, 'sync', this.render);
    },

    render: function() {
      var templateHTML = _.template($('#photos-template').html(), {
        photos: this.model.toJSON()
      });
      this.$el.html(templateHTML);
      return this;
    },

    paginate: function(event) {
      var that = this;
      var target = event.target;
      var data = $(target).attr("data");

      if(data == "prev") {
        that.page -= 1;
        if(that.page < 1) {
          that.page = 1;
        }
      } else {
        that.page += 1;
      }

      this.trigger("navigateToPage", that.page);
    },

    clear: function() {
      this.$el.empty();
    }

  });

  return View;
});
