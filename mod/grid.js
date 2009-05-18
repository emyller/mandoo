(function (u) {
/*
	Data grid module for the utm JavaScript library
	Copyright (c) 2009 E. Myller (emyller.net)
*/
u.mod(
/* info */{
	name: 'grid',
	version: .1
},

/* dependencies */
[
	// none
],

/* core */ {
Grid: u.Class({
	__construct: function (data, options) {
		// handles given options
		this.options = options = u.extend({
			sortable: true,
			editable: false
		}, options || {});

		var grid = this,

		dom = this.DOMElements = {
			main: u.create('table.utm_grid'),
			header: u.create('thead').append('tr.utm_grid_header')
		};

		if (!data.length) {
			dom.main.text('No items.');
			return this;
		}

		// parse the header
		if (options.labels) for (var l in options.labels)
			dom.header.add('th', options.labels[l]);
		else for (var key in data[0])
			dom.header.add('th', key);

		dom.main
			.add(dom.header);

		this.add(data);
	},

	add: function (data) {
		if (data instanceof Array)
			for (var i = -1; data[++i];)
				this.add(data[i]);
		else {
			var row = this.DOMElements.main.append('tr');
			for (var key in data) if (!this.options.labels ||  this.options.labels[key])
				row.append('td', data[key]);
		}

		return this;
	}
})
}
);
})(utm);