(function (u) {
/*
	Basic xPath support module for the utm JavaScript library
	Copyright (c) 2009 E. Myller (emyller.net)
*/
var Start = u.Start;

u.mod(
/* info */{
	name: 'xpath',
	version: .1
},

/* dependencies */
[
	// none
],

/* core */ {

Start: function (sel, context)
{
	typeof sel == 'string' && !sel.indexOf('/') && (sel = sel
		.replace(/^\//, '')
		.replace(/\[(\d+)\]/, ':nth-child($1)')
		.replace(/\//g, ' > '));

	return new Start(sel, context);
}

}
);
})(utm);
