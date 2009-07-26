(function (u) {
/*
	UI toolbar module for the mandoo JavaScript library
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
			main: u.create('div.mandoo_toolbar')
		};

		// creates and adds all the items
		for (var label in buttons) (function (button) {
			// create button object
			var btn = dom.main.append('button.mandoo_toolbar_button[title=' + (button.title || label) + ']');
			// add an icon, if defined
			buttons[label].icon && btn.append('img[src=' + button.icon + ']').css('width', options.size);
			// add a label
			options.labels && btn.add('span', label);
			// binds an action
			button.action && btn.onclick(function () { button.action(); });
		})(buttons[label]);

	}
})
},

/* elements methods */ {

}

);
})(mandoo);
