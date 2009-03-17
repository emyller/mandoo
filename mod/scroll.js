(function (u) {
/*
	scrolling helpers module for the utm JavaScript library
	Copyright (c) 2009 E. Myller (emyller.net)
*/
u.mod(
/* info */{
	name: 'scroll',
	version: .2
},

/* dependencies */
[
	/* none */
],

/* core */ {

},

/* elements methods */ {
	scroll: function (x, y, options) {
		var target = this;

		// handles an element
		if (typeof x != 'number' && x !== null) {
			target = u(this[0]);

			y && (options = y);

			// cache the elements positions
			var _coords = [ target.pos(), u(x).pos() ];

			x = _coords[1].left - _coords[0].left;
			y = _coords[1].top - _coords[0].top;
		}
		// handles numbers or null values
		else {
			x === null && (x = target[0].scrollLeft);
			y === null && (y = target[0].scrollTop);
		}

		// animated scrolling
		if (options)
			return target.anim(
				{ scrollLeft: x, scrollTop: y },
				options
			);

		// static scrolling
		else {
			target[0].scrollLeft = x;
			target[0].scrollTop = y;
			return target;
		}
	},

	scrollStop: function () {
		for (var i = -1; this[++i];) if (this[i].animations) {
			var a = this[i].animations.length;
			while(a--) if ('scrollLeft' in this[i].animations[a].attributes || 'scrollTop' in this[i].animations[a].attributes)
				this[i].animations[a].stop();
		}
	},

	hasScroll: function () {
		return this[0].scrollWidth > this[0].clientWidth || this[0].scrollHeight > this[0].clientHeight;
	},

	atLeft: function () {
		return !this[0].scrollLeft;
	},

	atRight: function () {
		return this[0].scrollLeft == this[0].scrollWidth - this[0].clientWidth;
	},

	atTop: function () {
		return !this[0].scrollTop;
	},

	atBottom: function () {
		return this[0].scrollTop == this[0].scrollHeight - this[0].clientHeight;
	}
}

);
})(utm);
