define([
    'jquery',
    'backbone',
    'common'
], function($, Backbone, Common){
    /**
     * Класс роутера
     */
    var Router = Backbone.Router.extend({
        routes: {
            '': 'photos',
            'photo/:id': 'photo'
        }
    });

    return Router;
});