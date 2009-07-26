(function (u) {
/*
	UI resizing module for the mandoo JavaScript library
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
				transparency: false,
				axis: false,
				snap: false,
				grid: false,
				handles: 'se'
			}, options || {});
		}
		return this;
	}
}

);

// adds event shortcuts
'resizestart,resize,resizeend'
.replace(/\w+/g, function (type) {
	u.methods['on' + type] = function (fn) { return this.listen(type, fn); };
})(mandoo);
