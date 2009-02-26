/*
	Scrolling effects for Ultimate JavaScript Library
	Copyright (c) 2008 E. Myller (emyller.net)
*/
utm.mod(

/* info */{
	name: 'scroll',
	version: .1
},

/* dependencies */
[/* none */],

/* core */ {
	scrollTo: function (el, coords, fx) {
	//>> scrolls to a position

	},

	scrollTo: function (el, coord, speed) {
	//>> scrolls to some position
		// handling arguments
		if (arguments.length == 2) { speed = coord; coord = el; el = 'html'; }
		if (!coord) { coord = el; el = 'html'; }

		// try to get a named anchor
		if (typeof coord == 'string' && !coord.indexOf('#')) {
			var _coord = utm('a[name="' + coord.substring(1, coord.length) + '"]');
			if (_coord.length) { coord = _coord; }
		}

		// grab the real container
		el = utm(el);

		// set x & y to numbers
		if (coord.nodeType || coord._utm || typeof coord == 'string') {
			coord = utm(coord).pos();
			coord = {
				x: coord.left,
				y: coord.top
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

			el[0]._utmScrollSteps = [];
			for (i = 0; i <= 100; i += 4) (function () {
				var s = i;
				el[0]._utmScrollSteps.push(setTimeout(function () {
					el[0].scrollLeft = Math.ceil(begin.x + s * step.x);
					el[0].scrollTop = Math.ceil(begin.y + s * step.y);
				}, framerate * s));
			})();
		}

		return el;
	},

	scrollStop: function (el) { return utm(el).each(function (el) {
	//>> stops any animated scrolling
		var steps = el._utmScrollSteps? el._utmScrollSteps.length : 0;
		while (steps--) { clearTimeout(el._utmScrollSteps[steps]); }
	});}
},

/* elements methods */ {
	scrollTo: function (coord, speed) {
		return utm.scrollTo(this[0], coord, speed);
	},

	scrollStop: function () {
		return utm.scrollStop(this);
	},

	scrollLeft: function (speed) { return this.each(function (el) {
	//>> scrolls to the left
		utm(el).scrollTo({ x: 0 }, speed);
	});},

	scrollRight: function (speed) { return this.each(function (el) {
	//>> scrolls to the right
		utm(el).scrollTo({ x: el.scrollWidth - el.clientWidth }, speed);
	});},

	scrollTop: function (speed) { return this.each(function (el) {
	//>> scrolls to the top
		utm(el).scrollTo({ y: 0 }, speed);
	});},

	scrollBottom: function (speed) { return this.each(function (el) {
	//>> scrolls to the bottom
		utm(el).scrollTo({ y: el.scrollHeight - el.clientHeight }, speed);
	});},

	atLeft: function () {
	//>> checks if the element is scrolled at bottom
		return !this[0].scrollLeft;
	},

	atRight: function () {
	//>> checks if the element is scrolled at bottom
		return this[0].scrollLeft >= this[0].scrollWidth - this[0].clientWidth;
	},

	atTop: function () {
	//>> checks if the element is scrolled at bottom
		return !this[0].scrollTop;
	},

	atBottom: function () {
	//>> checks if the element is scrolled at bottom
		return this[0].scrollTop >= this[0].scrollHeight - this[0].clientHeight;
	}
}

);