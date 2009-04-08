(function (u) {
/*
	UI resizing module for the utm JavaScript library
	Copyright (c) 2009 E. Myller (emyller.net)
*/
u.mod(
/* info */{
	name: 'ui_resize',
	version: .1
},

/* dependencies */
[
	/* none */
],

/* core */ {

},

/* elements methods */ {
	resizable: function (options) {
		for (var i = -1; this[++i];) {
			// handles options
			this[i].resizing = u.extend({

			}, options || {});
		}
		return this;
	}
}

);
})(utm);
