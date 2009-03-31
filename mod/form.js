(function (u) {
/*
	Form helpers module for the utm JavaScript library
	Copyright (c) 2009 E. Myller (emyller.net)
*/
u.mod(
/* info */{
	name: 'form',
	version: .1
},

/* dependencies */
[ /* none */ ],

/* core */ {

},

/* elements methods */ {
	serialize: function (filter) {
		// use only the first form
		var form = this.filter('form')[0],

		// get all the fields
		fields = u(form.elements).filter(':input');

		for (var i = -1; fields[++i];)
			f
	}
}

);
})(utm);
