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
			main: u.create('div.utm_grid_container'),
			table: u.create('table.utm_grid'),
			header: u.create('tr.utm_grid_header').selectable(false),
			body: u.create('tbody')
		};

		if (!data.length)
			return this;

		// parse the header
		if (options.columns) for (var c in options.columns)
			dom.header.add('th', options.columns[c].label || options.columns[c]);
		else for (var key in data[0])
			dom.header.add('th', key);

		this.add(data);

		// row hovering effect
		dom.table.listen('mouseover,mouseout', function (e) {
			u(e.target).parent('tr').color(
				e.type == 'mouseover' ? '#f1f3f4' : '#fff',
				{ speed: 'faster' }
			);
		});

		// render
		dom.main
			.append(dom.table)
				.add(dom.body)
				.prepend('thead')
					.add(dom.header);
	},

	add: function (data) {
		if (data instanceof Array)
			for (var i = -1; data[++i];)
				this.add(data[i]);
		else {
			var row = this.DOMElements.body.append('tr'),
				columns = this.options.columns,
				action = this.options.action;

			// row click action
			this.options.action && row.onclick(function (e) {
				action.call(data, e);
			});

			for (var c in columns || data) {
				var column = row.append('td', data[c] || '');
				// additional options
				if (columns) {
					// alignment
					columns[c].align && column.addClass('utm_grid_cell_align' + columns[c].align);
					// preceding text
					columns[c].before && column.text(columns[c].before + column.text());
					// text after
					columns[c].after && column.text(columns[c].after, true);
				}
			}
		}

		return this;
	},

	empty: function (data) {
		this.DOMElements.body.empty();
		return this;
	}
})
}
);
})(utm);