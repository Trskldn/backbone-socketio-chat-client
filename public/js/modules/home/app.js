define(['backbone', './router'], function(Backbone, Router) {	
	var homePageApp = function(options) {
		this.region = options.region;
		this.router = new Router({app: this});
		Backbone.history.loadUrl();
	};
	_.extend(homePageApp.prototype, {
		initialize: function() {

		},
		
		start: function() {

		},

		close: function() {

		}
	});

	return homePageApp;
});
