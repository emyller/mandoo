(function (u) {
/*
	UI desktop package for the utm JavaScript library
	Copyright (c) 2009 E. Myller (emyller.net)
*/
u.mod(
/* info */{
	name: 'ui_desktop',
	version: .1
},

/* dependencies */
[
	'ui_menu', 'ui_toolbar', 'ui_window'
],

/* core */ {

},

/* elements methods */ {

}

);

// force the page margins to be 0
u('html,body').css('margin', 0);

})(utm);
