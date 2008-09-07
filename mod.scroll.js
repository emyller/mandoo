/*
	Scrolling effects for the Ultimate JavaScript Library
	Copyright (c) 2008 E. Myller (emyller.net)
*/
(function () {

try { utm.module(

/* info */{
	name: 'scroll',
	version: .1
},

/* dependencies */
[/* none */],

/* core */ {
	scrollTo: function (container, y, x) {
	//>> scrolls to some position
		// setting default container
		if (!utm.isset(y)) {
			y = container;
			container = 'html';
		}
		
		// grab the real container
		container = utm(container)[0];
		
		// set x & y to numbers
		if (y.nodeType || typeof y == 'string') {
			var el = utm(y);
			x = el[0].offsetLeft;
			y = el[0].offsetTop;
		}
		
		container.scrollLeft = x;
		container.scrollTop = y;
	}
}

); }
catch (e) { throw new Error('utm error: core not found or dependencies unsatisfied'); } })();
