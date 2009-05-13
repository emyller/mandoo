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

		(function parse(items, ul) {
			for (var label in items) typeof items[label] == 'function' ?
				(ul).append('li.utm_menu_item', label).onclick(items[label]) :
				parse(items[label], ul.append('li.utm_menu_item', label).append('ul.utm_menu_sub'));
		})(items, dom.main);

		u('li', dom.main)
		.listen('mouseover,mouseout', function (e) {
			// add hovering effects
			u(this).color(e.type == 'mouseover' ? '#ccc' : '#ddd', { speed: 'faster' });
			// and submenus opening
		});
		// main items
		dom.main.children().onclick(function () {
			var pos = u(this).pos();
			pos.top += this.offsetHeight;
			u(this).first().toggle('opacity', { speed: 'faster' }).pos(pos);
		});
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
