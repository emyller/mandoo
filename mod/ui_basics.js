(function (u) {
/*
	UI basic elements module for the utm JavaScript library
	Copyright (c) 2009 E. Myller (emyller.net)
*/
u.mod(
/* info */{
	name: 'ui_basics',
	version: .1
},

/* dependencies */
[
	/* none */
],

/* core */ {

},

/* elements methods */ {
	selectable: function (enable) {
	//>> [de]activates content selection on elements
	// note: in Opera, the [event].preventDefault method must be called.
		return this
			.css('-moz-user-select', enable? '' : 'none')
			.attr('unselectable', enable? 'off' : 'on')
			.bind('selectstart', enable? null : function () { return false; });
	}
}

);
})(utm);
