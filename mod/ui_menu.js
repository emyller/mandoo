(function (u) {
/*
	UI menu bar module for the utm JavaScript library
	Copyright (c) 2009 E. Myller (emyller.net)
*/
u.mod(
/* info */{
	name: 'ui_menu',
	version: .1
},

/* dependencies */
[
	/* none */
],

/* core */ {
Menu: u.Class({
	__construct: function (items, options) {
		// handles given options
		this.options = options = u.extend({

		}, options || {});

		var menu = this,

		dom = this.DOMElements = {
			main: u.create('ul.utm_menu')
		};

		for (var item in items) {
			dom.main.append('li', item);
		}
	},

	appendTo: function (place) {
		this.DOMElements.main.appendTo(place);
		return this;
	}
})
},

/* elements methods */ {

}

);
})(utm);
