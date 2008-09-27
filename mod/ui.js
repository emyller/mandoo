/*
	User interface module for the Ultimate JavaScript Library
	Copyright (c) 2008 E. Myller (emyller.net)
*/
(function () { try { utm.mod(

/* info */{
	name: 'ui',
	version: .1
},

/* dependencies */
[/* none */],

/* core */ {

// it'll help us to control the visibility of some stuff
zIndex: 0,

modal: function (activate) {
//>> blocks the viewport usage by creating a modal
	// creates the modal
	if (activate) { if(!utm('#utm_modal')[0]) {
		// create the element
		utm.append('div#utm_modal').opacity(50);
		
		utm.modalResize();
		// updates the modal size when the viewport is resized
		utm(window).bind('resize', utm.modalResize);
	// destroys it
	}} else {
		utm('#utm_modal').remove();
		utm('body').unbind('resize', utm.modalResize);
	}
},
modalResize: function () {
	utm('#utm_modal')
	// resets the size
	.css({ width: 0, height: 0 });
	// sets the new size
	setTimeout(function () {
	utm('#utm_modal').css({
		width: utm.size(true).width,
		height: utm.size(true).height
	});}, 1);
},

selection: function (els, enable) {
//>> activates / deactivates text selection on elements
	els = utm(els);
	els.attr('unselectable', (enable? 'off' : 'on'))
			.css('-moz-user-select', (enable? '' : 'none'))[0]
			.onselectstart = enable? null : function () { return false; };
	return els;
},

draggable: function (el, opt) {
//>> makes an element draggable
	el = utm(el);
	el[0]._utmDragOptions = utm.ext({
		element: el,
		x: true,
		y: true
	}, opt || {});
	return el.bind('mousedown', utm.dnd.draginit);
},

dnd: {
draginit: function (e) {
//>> starts the dragging engine
	var el = utm.dnd.element = utm(this._utmDragOptions.element),
		pos = el.pos();
	utm.dnd.options = this._utmDragOptions;
	utm.dnd.diff = {
		x: e.pageX - pos.left,
		y: e.pageY - pos.top
	};
	
	utm(document).bind('mousemove', utm.dnd.dragstart)
				 .bind('mouseup', utm.dnd.dragcancel);
	utm('html').selectable(false);
},
dragcancel: function () {
//>> cancels the dragging
	utm(document).unbind('mousemove', utm.dnd.dragstart)
				 .unbind('mouseup', utm.dnd.dragcancel);
},
/* dragging controls */
dragstart: function (e) {
	utm.dnd.dragcancel();
	var callback = utm.dnd.element[0].onUtm_dragstart? utm.dnd.element[0].onUtm_dragstart(e) : true;
	callback = utm.isset(callback)? callback : true;
	if (callback)
	utm(document).bind('mousemove', utm.dnd.drag)
				 .bind('mouseup', utm.dnd.dragend);
},
drag: function (e) {
	var callback = utm.dnd.element[0].onUtm_drag? utm.dnd.element[0].onUtm_drag(e) : true;
	callback = utm.isset(callback)? callback : true;
	if (callback) {
	if (utm.dnd.options.x) { utm.dnd.element.css('left', e.pageX - utm.dnd.diff.x); }
	if (utm.dnd.options.y) { utm.dnd.element.css('top', e.pageY - utm.dnd.diff.y); }
}},
dragend: function (e) {
	var callback = utm.dnd.element[0].onUtm_dragend? utm.dnd.element[0].onUtm_dragend(e) : true;
	callback = utm.isset(callback)? callback : true;
	if (callback) {
	utm(document).unbind('mousemove', utm.dnd.drag)
				 .unbind('mouseup', utm.dnd.dragend);
	utm('html').selectable(true);
	
	// unset temporary data
	utm.dnd.element = utm.dnd.options = undefined;
}}
},

resizable: function (el, opt) {
//>> makes an element resizable
	el = utm(el);
	opt = utm.ext({
		x: true,
		y: true
	}, opt || {});
	
}
},

/* elements methods */ {

draggable: function (opt) { return this.each(function (el) {
	utm.draggable(el, opt);
}); },
selectable: function (enable) {
	return utm.selection(this, enable);
},

front: function () {
//>> brings some element to front
	return this.css('z-index', utm.zIndex++);
}

}

); }
catch (e) { throw new Error('utm error: core not found or dependencies unsatisfied'); } })();
