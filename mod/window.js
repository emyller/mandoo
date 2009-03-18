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

		// creates the DOM elements
		var win = this,
		dom = this.DOMElements = {
			main:              u.create('div.utm_window' + (options.id? '#' + options.id : '')),
			controls:          u.create('div.utm_window_controls'),
			resize:            u.create('div.utm_window_resize'),
			resizeHandler:     u.create('div.utm_window_resize_handler'),
			top:               u.create('div'),
				topLeftCorner:     u.create('div.utm_window_top-left-corner'),
				title:             u.create('div.utm_window_title', options.title),
				topRightCorner:    u.create('div.utm_window_top-right-corner'),
			body:              u.create('div'),
				leftBorder:        u.create('div.utm_window_left-border'),
				content:           u.create('div.utm_window_content'),
				rightBorder:       u.create('div.utm_window_right-border'),
			bottom:            u.create('div'),
				bottomLeftCorner:  u.create('div.utm_window_bottom-left-corner'),
				status:            u.create('div.utm_window_status', options.status),
				bottomRightCorner: u.create('div.utm_window_bottom-right-corner')
		};

		/************
		 * rendering
		 ************/
		// builds the window
		dom.top    // top corners + title bar
			.add(dom.topRightCorner)
			.add(dom.topLeftCorner)
			.add(dom.title);
		dom.body   // side borders + content
			.append(dom.leftBorder)
				.append(dom.rightBorder)
					.append(dom.content);
		dom.bottom // bottom corners + status bar
			.add(dom.bottomRightCorner)
			.add(dom.bottomLeftCorner)
			.add(dom.status);
		dom.main   // main window
			.add(dom.controls)
			.add(dom.resize)
			.add(dom.resizeHandler)
			.add(dom.top)
			.add(dom.body)
			.add(dom.bottom);

		// sets the content
		options.content && this.content(options.content);

		// adds the main control buttons
		for (var btn in options.buttons) options.buttons[btn] &&
		(function (btn) {
			dom.controls.append('button.utm_window_button-' + btn)
			.css('opacity', .5)
			.bind('mouseover,mouseout,click', function (e) {
				// default click action
				e.type == 'click'? win[btn]() :
				// buttons rollovers
				u(this).fade(e.type == 'mouseover'? 1 : .5, { speed: 'faster' });
			});
		})(btn);

		dom.title
		// makes the window draggable,
			.draggable({ element: dom.main })
		// maximizable at double-click in the title bar
			.ondblclick(function () { win.max(); });
		// and resizable
		dom.resizeHandler
			.draggable({ transparency: false })
			.ondrag(function () {
				win.options.size.width = this.offsetLeft + this.offsetWidth;
				win.options.size.height = this.offsetTop + this.offsetHeight;
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

		// refreshes the size
		this.refresh = setInterval(function () { win.size() }, 100);

		// sets initial visual options
		setTimeout(function () {
			// title difference
			dom.title
				.css('padding-right', dom.controls[0].offsetWidth);
			// initial positioning and effects
			dom.main
				.pos(options.pos)
				.fadeIn({ speed: 'fast' })
				.css('visibility', 'visible');

			// fix corners in opera
			if (u.support.ua.opera)
				dom.title[0].style.margin = dom.status[0].style.margin = 0;
		}, 150);
	},

	size: function () {
	//>> refreshes the window sizes
		var dom = this.DOMElements,
		    size = this.options.size,
		    min = this.options.minSize;
		// width
		if (size.width < min.width && (size.width = min.width) || size.width)
			dom.main[0].style.width = size.width + 'px';
		// height
		if (size.height < min.height && (size.height = min.height) || size.height)
			dom.content[0].style.height = size.height - dom.top[0].offsetHeight - dom.bottom[0].offsetHeight + 'px';
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
		    options = this.options;
		// maximize
		if (!this.maximized) {
			// back up size and position when not maximized
			this.normalSize = options.size;
			this.normalPos = dom.main.pos();

			// sets the size to fit the viewport
			options.size = u.size();
			dom.main.pos(0, u('html')[0].scrollTop);

		// restore
		} else {
			options.size = this.normalSize;
			dom.main.pos(this.normalPos);
		}

		// refreshes the size to avoid slow sizing
		this.size();

		// toggles maximized status
		this.maximized = !this.maximized;

		return this;
	},

	close: function () {
		this.DOMElements.main.fadeOut('fastest', true);
		return this;
	}
})
}
);
})(utm);
