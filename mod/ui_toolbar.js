(function (u) {
/*
	UI toolbar module for the utm JavaScript library
	Copyright (c) 2009 E. Myller (emyller.net)
*/
u.mod(
/* info */{
	name: 'ui_toolbar',
	version: .1
},

/* dependencies */
[
	/* none */
],

/* core */ {
Toolbar: u.Class({
	__construct: function (buttons, options) {
		// handles given options
		this.options = options = u.extend({
			size: 'auto',
			labels: true
		}, options || {});

		var menu = this,

		dom = this.DOMElements = {
			main: u.create('div.utm_toolbar')
		};

		// creates and adds all the items
		for (var label in buttons) {
			// create button object
			var btn = dom.main.append('button.utm_toolbar_button[title=' + (buttons[label].title || label) + ']');
			// add an icon, if defined
			buttons[label].icon && btn.append('img[src=' + buttons[label].icon + ']').css('width', options.size);
			// add a label
			options.labels && btn.add('span', label);
			// binds an action
			buttons[label].action && btn.onclick(buttons[label].action);
		}

	},

	appendTo: function (place) {
		this.DOMElements.main.appendTo(place);
		return this;
	},
})
},

/* elements methods */ {

}

);
})(utm);
