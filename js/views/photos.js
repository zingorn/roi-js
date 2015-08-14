define([
    'jquery',
    'underscore',
    'backbone',
    'common',
    'text!templates/photos.html',
    'collections/photos',
    'views/thumb',
    'views/pagination'
], function($, _, Backbone, Common, template, Photos, ThumbView, PaginationView) {
    /**
     *
     */
    var PhotosView = Backbone.View.extend({
        /**
         *
         */
        el: '#photos',

        /**
         *
         */
        photoPerRow: 5,

        /**
         *
         */
        template: _.template(template),

        /**
         *
         */
        initialize: function(){
            Common.router.on('route:photos', this.onRoute);
            this.listenTo(Photos, 'add', this.addPhoto);
            this.listenTo(Photos, 'reset', this.showPhotos);

            this.$el.html(this.template({
                pagination: ''
            }));
            Photos.fetch({ reset: true });
        },

        /**
         * Обработчик перехода на слайд просмотра всех фото
         */
        onRoute: function(){

            Common.app.move('photos');
        },

        /**
         * Load photos
         */
        showPhotos: function(){
            var pagination = new PaginationView();
            this.$el.html(this.template({
                pagination: pagination.render()
            }));

            Photos.each(function(photo){
                var view = new ThumbView({ model: photo }),
                    tr = $('tr:last', this.$el);
                tr.append(view.render().el);
                if ($('td', tr).length == this.photoPerRow) {
                    $('table', this.$el).append('<tr>');
                }
            }, this);

        },

        /**
         *
         */
        show: function(){
            this.$el.show();
        },

        /**
         *
         */
        hide: function(){}
    });

    return PhotosView;
});