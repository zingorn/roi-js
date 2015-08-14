require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
        underscore: '../node_modules/underscore/underscore',
        backbone: '../node_modules/backbone/backbone',
        backboneLocalstorage: '../node_modules/backbone.localstorage/backbone.localStorage',
        text: '../node_modules/requirejs-text/text'
    }
});
require([
    'backbone',
    'views/app',
    'routers/router',
    'common'
], function(Backbone, AppView, Workspace, Common){
    Common.router = new Workspace();
    Backbone.history.start();

    Common.app = new AppView();
});