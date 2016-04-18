define(['Backbone', './router'], function(Backbone, Router) {	
	var AuthApp = function(options) {
		this.mainRegion = options.mainRegion;
		this.router = new Router({app: this});
		Backbone.history.loadUrl();
		
		// this.render();
	};
	_.extend(AuthApp.prototype, {
		initialize: function() {

		},
		
		start: function() {

		},

		close: function() {

		}
	});

	return AuthApp;
});