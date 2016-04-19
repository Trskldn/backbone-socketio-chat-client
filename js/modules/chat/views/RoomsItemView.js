define(['Backbone', 
	"text!./../templates/RoomsItemView.html",
	"core/common"
	],	function(Backbone, RoomsItemViewTmpl, Common) {

		var RoomsItemView =  Common.ModelView.extend({
			tagName: 'a',
			className: 'list-group-item',
			template: RoomsItemViewTmpl,

			events: {
				'click': '_onRoomClick'
			},

			initialize: function() {
				// this.listenTo(this.model, 'destroy', _.bind(this.remove,this));
			},

			_onRoomClick: function(evt) {
				evt.preventDefault();
				// console.log(arguments);
				// this.model.destroy();
				this.trigger('click', this.model);
			}
		});

		return RoomsItemView;
});