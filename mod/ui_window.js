(function (u) {
/*
	Window UI module for the utm JavaScript library
	Copyright (c) 2009 E. Myller (emyller.net)
*/
u.mod(
/* info */{
	name: 'window',
	version: .2
},

/* dependencies */
[
	'ui_dnd'
],

/* core */ {
Window: u.Class({
	__construct: function (options) {
		// handles given options
		this.options = options = u.extend({
			// content
			title: '',
			status: '',
			content: '',
			// position and size
			size: { width: 250, height: 100 },
			minSize: { width: 150, height: 75 },
			maxSize: {},
			pos: 'center',
			// controls
			buttons: { min: true, max: true, close: true }
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
				content:           u.create('div.utm_window_content'),
				extra:             u.create('div.utm_window_extra'),
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
						.add(dom.content)
						.add(dom.extra);
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
			.listen('dragstart,dragend,animationstart,animationend', function (e) { win.ghost(); });

		// makes the window draggable,
		dom.title.draggable({ element: dom.main });

		// maximizable at double-click in the title bar
		options.buttons.max && dom.title.ondblclick(function () { win.max(); });

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

		// adds the main control buttons
		for (var btn in options.buttons) options.buttons[btn] &&
		(function (btn) {
			dom.controls.append('button.utm_window_button-' + btn)
				.css('opacity', .5)
				.listen('mouseover,mouseout,click', function (e) {
					// default click action
					e.type == 'click'? win[btn]() :
					// buttons rollovers
					u(this).fade(e.type == 'mouseover'? 1 : .5, { speed: 'faster' });
				});
		})(btn);

		// puts the window in the page
		u.append(dom.main);

		// sets initial visual options
		setTimeout(function () {
			// title width difference
			dom.title.css('padding-right', dom.controls[0].offsetWidth);
			// initial positioning and effects
			dom.main.css({
				width: options.size.width,
				height: options.size.height,
				visibility: 'visible'
			})
			win.size();
			dom.main.pos(options.pos);
		}, 100);
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
				{ time: 200 }
			);
		} else {

		}

		// toggles maximized status
		this.maximized = !this.maximized;

		return this;
	},

	close: function () {
		this.DOMElements.main.fadeOut({ speed: 'faster', destroy: true });
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

	extra: function (content, add) {
		var container = this.DOMElements.extra;

		!add && container.empty();

		container.append(content);

		return this;
	},

	//>> internal methods
	size: function (size) {
		var dom = this.DOMElements,
		    min = this.options.minSize,

		containerSize = dom.main[0].offsetHeight - dom.topBar[0].offsetHeight - dom.bottomBar[0].offsetHeight,
		contentSize = containerSize - dom.extra[0].offsetHeight;

		// content height
		dom.container[0].style.height = containerSize + 'px';
		dom.content[0].style.height = contentSize + 'px';
	},

	ghost: function () {
		var dom = this.DOMElements;
		// hides all the content
		u().merge(dom.content, dom.extra)
			.css('display', (this.ghosted = !this.ghosted) ? 'none' : 'block');
		// make window translucent
		dom.main.css('opacity', this.ghosted ? .5 : 1);
		return this;
	}
})
}
);
})(utm);
