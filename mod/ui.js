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

	modal: function (activate, fade) {
	//>> blocks the viewport usage by creating a modal
		// creates the modal
		if (activate) { if(!utm.selectors.grab('#utm_modal')[0]) {
			// create the element
			var modal = utm.append('div#utm_modal');
			modal[0].fade = fade? modal.fadeIn(50) : modal.opacity(50);
			
			utm.modalResize();
			// updates the modal size when the viewport is resized
			utm(window).bind('resize', utm.modalResize);
		// destroys it
		}} else {
			var modal = utm('#utm_modal');
			if (modal[0]) {
				modal[0].fade? modal.fadeOut(true) : modal.remove();
				utm(window).unbind('resize', utm.modalResize);
			}
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
				});
			}, 1);
	},

	selection: function (els, enable) {
	//>> activates / deactivates text selection on elements
		els = utm(els);
		els.attr('unselectable', (enable? 'off' : 'on'))
				.css('-moz-user-select', (enable? '' : 'none'))[0]
				.onselectstart = enable? null : function () { return false; };
		return els;
	},

	isOver: function (el, e) {
	//>> checks if the mouse is over an element
		var pos = utm.pos(el);
		return e.pageX >= pos.left &&
		       e.pageX <= pos.right &&
		       e.pageY >= pos.top &&
		       e.pageY <= pos.bottom;
	},

	draggable: function (el, opt) {
	//>> makes an element draggable
		el = utm(el);
		
		// handles options
		var opt = el[0]._utmDragOptions = utm.ext({
			element: el,
			x: true,
			y: true
		}, opt || {});
		
		opt.element = utm(opt.element);
		
		// set position: absolute if the element is static/relative
		if (opt.element.css('position') == 'static') {
			opt.element.css({
				left: opt.element[0].offsetLeft - (opt.element.css('margin-left').slice(0,-2)-0 || 0),
				top: opt.element[0].offsetTop - (opt.element.css('margin-top').slice(0,-2)-0 || 0)
			});
			setTimeout(function () { opt.element.css('position', 'absolute'); }, 1);
		}
		
		return el.bind('mousedown', utm.dnd.draginit);
	},

	dnd: {
	/* draggable */
		draginit: function (e) {
		//>> starts the dragging engine
			utm.dnd.options = this._utmDragOptions;
			var el = utm.dnd.element = this._utmDragOptions.element;
			
			// creates offset difference
			utm.dnd.diff = {
				x: e.pageX - (el[0].offsetLeft - (el.css('margin-left').slice(0,-2)-0 || 0)),
				y: e.pageY - (el[0].offsetTop - (el.css('margin-top').slice(0,-2)-0 || 0))
			};
			
			// makes the page contents unselectable
			utm('html').selectable(false);
			
			// binds the needed events to start dragging
			utm(document)
				.bind('mousemove', utm.dnd.dragstart)
				.bind('mouseup', utm.dnd.dragcancel);
		},
		dragcancel: function () {
		//>> cancels the dragging
			utm(document).unbind('mousemove', utm.dnd.dragstart)
						 .unbind('mouseup', utm.dnd.dragcancel);
		},
		/* dragging controls */
		dragstart: function (e) {
		//>> starting to drag
			utm.dnd.dragcancel();
			var callback = utm.dnd.element[0].onUtm_dragstart? utm.dnd.element[0].onUtm_dragstart(e) : true;
			callback = utm.isset(callback)? callback : true;
			if (callback)
			utm(document).bind('mousemove', utm.dnd.drag)
						 .bind('mouseup', utm.dnd.dragend);
		},
		drag: function (e) {
		//>> dragging now
			var callback = utm.dnd.element[0].onUtm_drag? utm.dnd.element[0].onUtm_drag(e) : true;
			callback = utm.isset(callback)? callback : true;
			if (callback) {
				if (utm.dnd.options.x) { utm.dnd.element.css('left', e.pageX - utm.dnd.diff.x); }
				if (utm.dnd.options.y) { utm.dnd.element.css('top', e.pageY - utm.dnd.diff.y); }
			}
		},
		dragend: function (e) {
		//>> drag ending
			var callback = utm.dnd.element[0].onUtm_dragend? utm.dnd.element[0].onUtm_dragend(e) : true;
			callback = utm.isset(callback)? callback : true;
			if (callback) {
				utm(document).unbind('mousemove', utm.dnd.drag)
							 .unbind('mouseup', utm.dnd.dragend);
				utm('html').selectable(true);
				
				// unset temporary data
				delete utm.dnd.element;
				delete utm.dnd.options;
			}
		},
		
	/* droppable */
		droppable: function (e) {
		//>> element dropped
			this.dragover(function () {
				if (!utm.dnd.element) { alert('dropped!'); }
			});
		}
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
	front: function () {
	//>> brings some element to front
		return this.css('z-index', utm.zIndex++);
	},
	
	draggable: function (opt) { return this.each(function (el) {
	//>> shortcut for draggable
		utm.draggable(el, opt);
	}); },
	
	droppable: function (opt) { return this },
	
	dragover: function (f) { return this.each(function (el) {
	//>> mouse is above some element while dragging
		u(document).mousemove(function (e) {
			if (utm.isOver(el, e) && utm.dnd.element) { f.call(el, e); }
		});
	}); },
	
	selectable: function (enable) {
	//>> shortcut for selectable
		return utm.selection(this, enable);
	}

}

); }
catch (e) { throw new Error('utm error: core not found or dependencies unsatisfied'); } })();
