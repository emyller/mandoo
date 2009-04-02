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
	'dnd'
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

		/************
		 * rendering
		 ************/
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

		// behaviors
		dom.main
			.onmousedown(function () { dom.main.front(); });

		dom.title
		// makes the window draggable,
			.draggable({ element: dom.main })
		// maximizable at double-click in the title bar
			.ondblclick(function () { win.max(); });
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

		// puts the window in the page
		u.append(dom.main);

		// sets initial visual options
		// title width difference
		dom.title.css('padding-right', dom.controls[0].offsetWidth);
		// initial positioning and effects
		dom.main
			.pos(options.pos)
			.css({
				width: options.size.width,
				height: options.size.height,
				visibility: 'visible'
			})
			.fadeIn({ speed: 'faster' });
			win.size();
	},

	size: function (size) {
	//>> refreshes the window sizes
		var dom = this.DOMElements,
		    size = u.size(this.DOMElements.main),
		    min = this.options.minSize,

		containerSize = size.height - dom.topBar[0].offsetHeight - dom.bottomBar[0].offsetHeight,
		contentSize = containerSize - dom.extra[0].offsetHeight;
		// content height
		dom.container[0].style.height = containerSize + 'px';
		dom.content[0].style.height = contentSize + 'px';
	},

	// content methods
	title: function (text) {
		this.DOMElements.title.text(text);
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

	status: function (text) {
		this.DOMElements.status.text(text);
		return this;
	},

	// controls methods
	min: function () {

		return this;
	},

	max: function () {
		var dom = this.DOMElements,
		    _size = u.size();
		// maximize
		if (!this.maximized) {
			// back up size and position when not maximized
			this.normalSize = u.size(dom.main);
			this.normalPos = dom.main.pos();

			// sets the size and position to fit the viewport
			dom.main.anim(
				{ left: document.documentElement.scrollLeft, top: document.documentElement.scrollTop, width: _size.width, height: _size.height },
				{ speed: 'fastest' }
			);
		// restore
		} else {
			dom.main.anim(
				{ left: this.normalPos.left, top: this.normalPos.top, width: this.normalSize.width, height: this.normalSize.height },
				{ speed: 'fastest' }
			);
		}

		// refreshes the size to avoid slow sizing
		this.size();

		// toggles maximized status
		this.maximized = !this.maximized;

		return this;
	},

	close: function () {
		this.DOMElements.main.fadeOut({ speed: 'faster', destroy: true });
		return this;
	}
})
}
);
})(utm);
