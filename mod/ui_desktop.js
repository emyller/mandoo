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
	'ui_menu', 'ui_toolbar', 'ui_window', 'ui_panel', 'ui_notification'
],

/* core */ {

},

/* elements methods */ {

}

);

// some necessary style
u('html,body').css({ margin: 0, overflow: 'hidden' });

})(utm);
