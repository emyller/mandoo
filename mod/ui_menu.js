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

		// creates and adds all the items
		(function parse(items, ul) {
			for (var label in items) {
				var item = ul.append('li.utm_menu_item').add('span.utm_menu_item_label', label);

				if (typeof items[label] == 'function')
					item.onmousedown(items[label])
				else {
					!ul.is('.utm_menu') && item.prepend('span.utm_menu_item_right', '»');
					parse(items[label], item.append('ul.utm_menu_sub'));
				}
			}
		})(items, dom.main);

		// hovering effect
		u('li', dom.main).hover({ 'background-color': '#cbd6d7' }, { speed: 'faster' });

		// submenu opening / closing
		u('li:has(ul)', dom.main)
		.listen('click,mouseover,mouseout', function (e) {
			// is this item on the main bar?
			var main = u(e.target).parent('ul').is('.utm_menu'),
				active = u('ul:visible', dom.main).length;

			main && e.type == 'mouseover' && active && u.Menu.closeAll();

			if (main && e.type == 'click' || e.type == 'mouseover' && active)
				menu.openMenu(u(this).children('ul'));
		})

	},

	openMenu: function (menu) {
		var item = menu.parent(),
			pos = {};

		item.parent().is('.utm_menu') ?
			(pos = item.pos()) && (pos.top += item[0].offsetHeight) :
			pos = { left: item[0].offsetWidth, top: item[0].offsetTop };

		menu.css('display', 'block').pos(pos).front();

		u(document).onmousedown(u.Menu.closeAll);
	},

	__closeAll: function () {
		u('.utm_menu_sub').css('display', 'none');
		u(document).unbind('mousedown', u.Menu.closeAll);
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
