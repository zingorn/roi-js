define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/pagination.html'
], function($, _, Backbone, template){
    /**
     *
     */
    var Pagination = Backbone.View.extend({
        template: _.template(template),

        /**
         *
         */
        render: function(){}
    });

    return Pagination;
});