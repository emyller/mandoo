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
	zIndex: 100,

	overlay: function (enable)
	{
		var overlay = u('#u-overlay');

		enable = enable === undefined ?
			enable = !overlay[0] :
			!!enable;

		// creates the overlay
		if (enable && !overlay[0])
		{
			overlay = u.append('div#u-overlay', ' ')
				.css('opacity', 0).fade(.7, { duration: 200 })
				.front();

			// refreshes the overlay size constantly
			u.overlay.refresh = setInterval(function () {
				overlay.css({ width: 0, height: 0 });
				overlay.css(u.size(true));
			}, 100);
		}

		// removes the overlay
		else if (!enable)
		{
			overlay.fadeOut({ duration: 200, destroy: 1 });
			clearInterval(u.overlay.refresh);
		}
	}
},

/* elements methods */ {
	front: function ()
	{
		for (var i = -1; this[++i];)
			this[i].style.zIndex = u.zIndex++;

		return this;
	},

	selectable: function (enable)
	{//>> [de]activates content selection on elements
	// note: in Opera, the [event].preventDefault method must be called.
		this
		.css('-moz-user-select', enable? '' : 'none')
		.attr('unselectable', enable? 'off' : 'on');

		enable ?
			this.listen('selectstart', preventSelect) :
			this.unlisten('selectstart', preventSelect);

		return this;
	}
}

);

// simple standard function to prevent selection
function preventSelect(e) {
	e.preventDefault();
}

})(utm);
