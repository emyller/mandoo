(function (u) {
/*
	Drag and drop UI module for the utm JavaScript library
	Copyright (c) 2009 E. Myller (emyller.net)
*/
u.mod(
/* info */{
	name: 'dnd',
	version: .2
},

/* dependencies */
[
	'ui_basics'
],

/* core */ {
dnd: {
	draginit: function (e) {
	//>> initializes the dragging process (goes to start or cancel)
		var el = this.dragging.element;

		// uses a temporary object
		u.dnd.tmpData = {
			element: u(this),
			// difference values (mouse cursor - element position)
			diffX: e.pageX - el[0].offsetLeft,
			diffY: e.pageY - el[0].offsetTop
		};

		/** browser issues **/
		// avoiding real dragging in Firefox 3+ when element is empty
		!this.firstChild && u(this).text('');
		// avoiding content selection
		u('html').selectable(false);
		e.preventDefault();

		// starts the dragging process
		u(document)
			.onmousemove(u.dnd.dragstart)
			.onmouseup(u.dnd.dragcancel);
	},

	dragcancel: function (e) {
	//>> cancels the dragging before dragstart fires
		u(document)
			.unbind('mousemove', u.dnd.dragstart)
			.unbind('mouseup', u.dnd.dragcancel);

		u('html').selectable(true);
	},

	/* real dragging event controls */
	dragstart: function (e) {
		var el = u.dnd.tmpData.element[0].dragging.element;

		// transparency effect
		u.dnd.tmpData.element[0].dragging.transparency && el.css('opacity', el.css('opacity') / 2);

		u(document)
			.unbind('mousemove', u.dnd.dragstart)
			.unbind('mouseup', u.dnd.dragcancel)
			.onmousemove(u.dnd.drag)
			.onmouseup(u.dnd.dragend);

		u.dnd.tmpData.element.fire('dragstart', undefined, e);
	},
	drag: function (e) {
		var dragging = u.dnd.tmpData.element[0].dragging;

		u.dnd.tmpData.element.fire('drag', undefined, e);

		dragging.axis != 'y' && (dragging.element[0].style.left = e.pageX - u.dnd.tmpData.diffX + 'px');
		dragging.axis != 'x' && (dragging.element[0].style.top = e.pageY - u.dnd.tmpData.diffY + 'px');
	},
	dragend: function (e) {
		var el = u.dnd.tmpData.element[0].dragging.element;

		// transparency effect
		u.dnd.tmpData.element[0].dragging.transparency && el.css('opacity', el.css('opacity') * 2);

		u(document)
			.unbind('mousemove', u.dnd.drag)
			.unbind('mouseup', u.dnd.dragend);

		u.dnd.tmpData.element.fire('dragend', undefined, e);

		// unset temporary data
		delete u.dnd.tmpData;

		u('html').selectable(true);
	}
}
},

/* elements methods */ {
	draggable: function (options) {
		for (var i = -1; this[++i];) {
			// handles options
			this[i].dragging = options = u.extend({
				element: this[i],
				transparency: true,
				axis: false,
				snap: false,
				grid: false
			}, options || {});

			options.element = u(options.element);

			u(this[i]).onmousedown(u.dnd.draginit);
		}
		return this;
	}
}

);

// adds event shortcuts
'dragstart,drag,dragend'
.replace(/\w+/g, function (type) {
	u.methods['on' + type] = function (fn) { return this.bind(type, fn); };
});

})(utm);
