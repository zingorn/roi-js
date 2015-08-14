define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    /**
     * Слайды сайта
     */
    var Slide = Backbone.Model.extend({
        defaults: {
            name: '',
            view: null
        }
    });
    return Slide;
});