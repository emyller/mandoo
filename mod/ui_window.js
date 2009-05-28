(function (u) {
/*
	Window UI module for the utm JavaScript library
	Copyright (c) 2009 E. Myller (emyller.net)
*/
u.mod(
/* info */{
	name: 'ui_window',
	version: .2
},

/* dependencies */
[
	'ui_dnd'
],

/* core */ {
Window: u.Class({
	__all: [],

	__construct: function (options) {
		// handles given options
		this.options = options = u.extend({
			// content
			title: '',
			status: '',
			content: '',
			// position and size
			size: {},
			minSize: { width: 150, height: 75 },
			maxSize: {},
			pos: 'center',
			// controls
			controls: { min: true, max: true, close: true },
			// extra
			open: true,
			modal: false
		}, options || {});

		// enclose the instance so we can use it in internal scopes
		var win = this,

		// creates the DOM elements
		dom = this.DOMElements = {
			main:              u.create('div.utm_window' + (options.id? '#' + options.id : '')),
			controls:          u.create('div.utm_window_controls'),
			resize:            u.create('div.utm_window_resize'),
			resizeHandler:     u.create('div.utm_window_resize_handler'),
			topBar:            u.create('div'),
				topLeftCorner:     u.create('div.utm_window_top-left-corner'),
				title:             u.create('div.utm_window_title', options.title),
				topRightCorner:    u.create('div.utm_window_top-right-corner'),
			topContent:        u.create('div'),
			body:              u.create('div'),
				leftBorder:        u.create('div.utm_window_left-border'),
				container:         u.create('div.utm_window_container'),
				contentTop:        u.create('div.utm_window_content-top'),
				content:           u.create('div.utm_window_content'),
				contentBottom:     u.create('div.utm_window_content-bottom'),
				rightBorder:       u.create('div.utm_window_right-border'),
			bottomBar:         u.create('div'),
				bottomLeftCorner:  u.create('div.utm_window_bottom-left-corner'),
				status:            u.create('div.utm_window_status', options.status),
				bottomRightCorner: u.create('div.utm_window_bottom-right-corner')
		};

		// builds the window
		dom.topBar   // top corners + title bar
			.add(dom.topRightCorner)
			.add(dom.topLeftCorner)
			.add(dom.title);
		dom.body     // side borders + content
			.append(dom.leftBorder)
				.append(dom.rightBorder)
					.append(dom.container)
						.add(dom.contentTop)
						.add(dom.content)
						.add(dom.contentBottom);
		dom.bottomBar // bottom corners + status bar
			.add(dom.bottomRightCorner)
			.add(dom.bottomLeftCorner)
			.add(dom.status);
		dom.main   // main window
			.add(dom.topBar)
			.add(dom.body)
			.add(dom.bottomBar)
			.add(dom.controls)
			.add(dom.resize)
			.add(dom.resizeHandler);

		// sets the content
		options.content && this.content(options.content);

		// behaviors
		dom.main
			.onmousedown(function () { dom.main.front(); })
			.onanimation(function (e) { 'height' in e.attributes && win.size(); })
			.listen(
				'dragstart,dragend,animationstart,animationend,resizestart,resizeend',
				function (e) { win.ghost(); }
			);

		// makes the window draggable,
		dom.title.draggable({ element: dom.main });

		// maximizable at double-click in the title bar
		options.controls.max && dom.title.ondblclick(function () { win.max(); });

		// and resizable
		dom.resizeHandler
			.draggable({ transparency: false })
			.ondrag(function () {
				win.DOMElements.main.css({
					width: this.offsetLeft + this.offsetWidth,
					height: this.offsetTop + this.offsetHeight
				});
				win.size();
			})
			.ondragend(function () {
				// we use a timeout here to avoid weird results due to rapid mouse movements
				var r = this; setTimeout(function () {
					u(r).css({
						left: dom.main[0].offsetWidth - r.offsetWidth,
						top: dom.main[0].offsetHeight - r.offsetHeight
					});
				}, 50);
			});

		// adds the main control controls
		for (var btn in options.controls) (function (btn) {
			dom.controls.append('button.utm_window_button-' + btn)
				.css('opacity', .5)
				.listen('mouseover,mouseout,click', function (e) {
					// default click action
					e.type == 'click'? win[btn]() :
					// controls rollovers
					u(this).fade(e.type == 'mouseover'? 1 : .5, { speed: 'faster' });
				});
		})(btn);

		options.open && this.open();
	},

	//>> control methods
	min: function () {

		return this;
	},

	max: function () {
		var dom = this.DOMElements;

		if (!this.maximized) {
			var size = u.size();

			this.__oldSize = u.size(dom.main);

			dom.main.anim(
				{ left: 0, top: 0, width: size.width, height: size.height },
				{ time: 50 }
			);
		} else {

		}

		// toggles maximized status
		this.maximized = !this.maximized;

		return this;
	},

	open: function () {
		u.Window.all.push(this);

		var dom = this.DOMElements,
			options = this.options,
			win = this;

		options.modal && u.modal(true);

		// puts the window in the page
		u.append(dom.main).front();

		// sets initial visual options
		setTimeout(function () {
			// title width difference
			dom.title.css('padding-right', dom.controls[0].offsetWidth);
			// initial positioning and effects
			!options.size.width &&
				(options.size.width = dom.main[0].offsetWidth);
			!options.size.height &&
				(options.size.height = dom.main[0].offsetHeight);
			dom.main
			.css({
				width: options.size.width,
				height: options.size.height,
				visibility: 'visible'
			})
			.pos(options.pos);

			win.size();
		}, 100);

		return this;
	},

	close: function () {
		// close modal, if possible
		if (this.options.modal) {
			for (var w = -1, modals = 0; u.Window.all[++w]; u.Window.all[w].options.modal && modals++);
			modals == 1 && u.modal(false);
		}

		u.Window.all.splice(u.index(u.Window.all, this), 1);

		this.DOMElements.main.remove();
		return this;
	},

	//>> content methods
	title: function (text) {
		this.DOMElements.title.text(text);
		return this;
	},

	status: function (text) {
		this.DOMElements.status.text(text);
		return this;
	},

	content: function (content, add) {
		var container = this.DOMElements.content;

		!add && container.empty();

		content.__utm || content.nodeType?
			container.append(content) :
			container.append('p', content);

		return this;
	},

	//>> internal methods
	size: function (size) {
		var dom = this.DOMElements,
		    min = this.options.minSize,

		containerSize = dom.main[0].offsetHeight - dom.topBar[0].offsetHeight - dom.bottomBar[0].offsetHeight,
		contentSize = containerSize - dom.contentTop[0].offsetHeight - dom.contentBottom[0].offsetHeight;

		// content height
		dom.container[0].style.height = containerSize + 'px';
		dom.content[0].style.height = contentSize + 'px';
	},

	ghost: function () {
		var dom = this.DOMElements;
		// hides all the content
		u().merge(dom.contentTop, dom.content, dom.contentBottom)
			.css('display', (this.ghosted = !this.ghosted) ? 'none' : 'block');
		// make window translucent
		dom.main.css('opacity', this.ghosted ? .6 : 1);
		return this;
	}
})
}
);
})(utm);
