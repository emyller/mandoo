(function (u) {
/*
	UI panels module for the mandoo JavaScript library
	Copyright (c) 2009 Renan Fernandes
*/
u.mod(
/* info */{
	name: 'ui_panel',
	version: 0.1,
	description: 'A simple yet flexible panel system',
	author: 'ShadowBelmolve <renan@kauamanga.com.br>'
},

/* dependencies */[
	/* none */
],

/* core */{

Panel: u.Class({
	__all: [],

	__construct: function (options) {
		// handle given options
		this.options = options = u.extend({
			edge: 'bottom',
			locked: false,
			distance: 'auto',
			size: 'auto',
			height: 24,
			autohide: false
		}, options || {});

		var dom = this.DOMElements = {
			main: u.create('div.mandoo_panel_container'),
			panel: u.create('div.mandoo_panel')
		};

		// build the panel
		dom.main
			.add(dom.panel);

		dom.panel.css('height', options.height);

		// render
		u.append(dom.main);
	},

	__lockAll: function () {
		for (var i = -1; u.Panel.all[++i];)
			u.Panel.all[i].locked = true;
	},

	size: function (size) {
	//>> sets the size of the panel
		this.DOMElements.panel.css('width', size);
		return this;
	},

	distance: function (distance) {
	//>> sets the distance of the panel from the perpendicular edges
		this.DOMElements.panel.css('margin' + (distance == 'auto' ? '' : '-left'), distance);
		return this;
	},

	toggle: function (forceAppear) {

		return this;
	},

	destroy: function () {

	}
})

}
);


})(mandoo);