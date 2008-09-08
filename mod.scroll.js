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
	scrollTo: function (el, coord, speed) {
	//>> scrolls to some position
		// handling arguments
		if (arguments.length == 2) { speed = coord; coord = el; el = 'html'; }
		if (!coord) { coord = el; el = 'html'; }
		
		// grab the real container
		el = utm(el);
		
		// set x & y to numbers
		if (coord.nodeType || typeof coord == 'string') {
			coord = utm(coord);
			coord = {
				x: coord[0].offsetLeft,
				y: coord[0].offsetTop
			};
		}
		
		// scrolls without effects
		if (!utm.isset(speed)) {
			el[0].scrollLeft = coord.x;
			el[0].scrollTop = coord.y;
			
		// puts some effect
		} else {
			var begin = {
				x: el[0].scrollLeft,
				y: el[0].scrollTop
			},
			step = {
				x: (coord.x - begin.x) / 100,
				y: (coord.y - begin.y) / 100
			},
			framerate = 10 / utm.efSpeed(speed);
			
			for (var steps = [], i = 0; i <= 100; i += 4) (function () {
				var s = i;
				steps.push(setTimeout(function () {
					el[0].scrollLeft = Math.ceil(begin.x + s * step.x);
					el[0].scrollTop = Math.ceil(begin.y + s * step.y);
				}, framerate * s));
			})();
		}
		
		return el;
	}
},

/* elements methods */ {
	scrollTo: function (coord, speed) {
		return utm.scrollTo(this, coord, speed);
	}
}

); }
catch (e) { throw new Error('utm error: core not found or dependencies unsatisfied'); } })();
