/*
	Gallery utilities for Ultimate JavaScript Library
	Copyright (c) 2008 E. Myller (emyller.net)
*/
(function () {

try { utm.module(

/* info */{
	name: 'gallery',
	version: .1
},

/* dependencies */
[/* none */],

/* core */ {
showPicture: function (opt) {
//>> shows a image above any content
	var opt = utm.ext({
		// data
		title: '',
		text: '',
		size: 80
	}, opt || {});
	
	
}
}

); }
catch (e) { throw new Error('utm error: core not found or dependencies unsatisfied'); } })();
