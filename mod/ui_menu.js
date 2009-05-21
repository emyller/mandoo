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
			coords: [0, 0]
		}, options || {});

		var menu = this,

		dom = this.DOMElements = {
			main: u.create('ul.utm_menu')
		};

		// build the items
		parse(items);
	},

	parse: function (items, menu) {
		menu = menu || this.DOMElement.main;

		for (var key in items) {
			var item = u.create('li.utm_item_item', item)
		}

		return this;
	}
}),

MenuBar: u.Class({
	__construct: function (items, options) {
		// handles given options
		this.options = options = u.extend({

		}, options || {});
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

u.getJSON('cidades', function (cidades) {
	for (var i = -1; cidades[++i];)
		u('#combobox').append('option[value=' + cidades[i].id + ']', cidades[i].nome);
});
