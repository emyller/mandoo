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
		var modal = u('#utm_modal');

		enable = enable === undefined ?
			enable = !modal[0] :
			!!enable;

		// creates the modal
		if (enable && !modal[0])
		{
			modal = u.append('div#utm_modal', ' ')
				.css('opacity', 0).fade(.7, { duration: 300 })
				.front();

			// refreshes the modal size constantly
			u.overlay.refresh = setInterval(function () {
				modal.css({ width: 0, height: 0 });
				modal.css(u.size(true));
			}, 100);
		}

		// removes the overlay
		else if (!enable)
		{
			modal.fadeOut({ duration: 300, destroy: 1 });
			clearInterval(u.modal.refresh);
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
