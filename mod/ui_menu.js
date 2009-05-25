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
			coords: { left: 0, top: 0 }
		}, options || {});

		var menu = this,

		dom = this.DOMElements = {
			main: u.create('ul.utm_menu')
		};

		// set position values
		dom.main.css({ left: options.coords.left, top: options.coords.top });

		// build the items
		this.parse(items);
	},

	parse: function (items, menu) {
		menu = menu || this.DOMElements.main;

		for (var label in items) {
			var item = u.create('li.utm_menu_item'),
				callback = typeof items[label] == 'function' ? items[label] : items[label].action;

			// add icon, if available
			items[label].icon && item.add('img.utm_menu_item_icon', null, { src: items[labe].icon });

			// add label
			item.add('span.utm_menu_item_label', label);

			// add right text, if available
			items[label].right && item.add('img.utm_menu_item_right', items[label].right);

			// add sub items, if defined
			!callback && this.parse(items[label].items || items[label], item.append('ul'))
			||
			// or add a callback to the item
			item.onmousedown(callback);

			// finally, append the parsed item to the menu
			menu.append(item);
		}

		return this;
	}
}),

MenuBar: u.Class({
	__construct: function (items, options) {
		// handles given options
		this.options = options = u.extend({

		}, options || {});

		var menuBar = this,

		dom = this.DOMElements = {
			main: u.create('ul.utm_menubar')
		};

		// render the menu bar
		for (var label in items) (function (label) {
			dom.main.append('li', label)
			.listen('mousedown,mouseover', function (e) {
				var active = menuBar.active();
				// open
				if (e.type == 'mousedown' && !this.submenu) {
					var pos = u(this).pos();
					pos.top += this.offsetHeight;

					this.submenu = u.append(new u.Menu(items[label], { coords: pos }).DOMElements.main);
				}
			})
		})(label);
	},

	active: function () {

		return false;
	}
}),

ContextMenu: u.Class({
	__construct: function (items, options) {
		// handles given options
		this.options = options = u.extend({

		}, options || {});
	}
})
},

/* elements methods */ {

}

);
})(utm);
