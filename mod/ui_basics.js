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

	modal: function (enable) {
		var modal = u('#utm_modal');

		enable = enable === undefined ?
			enable = !modal[0] :
			!!enable;

		// creates the modal
		if (enable && !modal[0]) {
			modal = u.append('div#utm_modal')
				.css('opacity', .5)
				.front();

			// refreshes the modal size constantly
			u.modal.refresh = setInterval(function () {
				modal.css({ width: 0, height: 0 });
				modal.css(u.size(true));
			}, 100);
		}

		// removes the modal
		else if (!enable) {
			modal.remove();
			clearInterval(u.modal.refresh);
		}
	}
},

/* elements methods */ {
	front: function () {
		for (var i = -1; this[++i];)
			this[i].style.zIndex = u.zIndex++;

		return this;
	},

	selectable: function (enable) {
	//>> [de]activates content selection on elements
	// note: in Opera, the [event].preventDefault method must be called.
		return this
			.css('-moz-user-select', enable? '' : 'none')
			.attr('unselectable', enable? 'off' : 'on')
			.listen('selectstart', enable? null : function (e) { e.preventDefault(); });
	}
}

);
})(utm);
