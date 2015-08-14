define([
    'jquery',
    'underscore',
    'backbone',
    'common',
    'text!templates/thumb.html'
], function($, _, Backbone, Common, template){
    var ThumbView = Backbone.View.extend({
        /**
         * Класс элемента таблицы фотографий
         */
        tagName: 'td',

        /**
         * view template
         */
        template: _.template(template),

        /**
         * listeners
         */
        events: {
            'click .thumb img' : 'showPhoto'
        },

        /**
         *
         */
        showPhoto: function(e){
            Common.router.navigate('photo/' + $(e.target).data('photo-id'), {trigger: true});
        },

        /**
         *
         */
        initialize: function(){
            this.listenTo(this.model, 'loaded', this.updateView);
        },

        /**
         *
         */
        updateView: function(){

            if (this.model.get('link') != '') {
                $('img',this.$el).attr('src', this.model.get('link'));
            }
            if (this.model.get('size').length !== null) {
                $('img',this.$el).attr('src', this.model.link);
            }
        },

        /**
         *
         * @returns {ThumbView}
         */
        render: function(){
            this.$el.html(this.template($.extend(true, {css: 'thumb'}, this.model.toJSON())));
            return this;
        }
    });

    return ThumbView;
});