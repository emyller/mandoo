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
	__construct: function (table, options) {
		// handles given options
		this.options = options = u.extend({
			sortable: true,
			editable: false
		}, options || {});
	},

	add: function (data) {

	}
})
}
);
})(utm);