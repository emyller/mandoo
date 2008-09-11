/*
	Window widget for the Ultimate JavaScript Library
	Copyright (c) 2008 E. Myller (emyller.net)
*/
(function () { try {

utm // default stylesheet
.css('div.utm_window', {
	font: '.9em "Sans","Trebuchet MS"',
	position: 'absolute',
	border: '1px solid #000',
	background: '#ADD8E6'
})
.css('div.utm_window_title', {
	padding: '3px',
	cursor: 'default'
})
.css('div.utm_window_controls', {
	position: 'absolute',
	top: '0',
	right: '0',
	'border-left': '1px solid black',
	'border-bottom': '1px solid black'
})
.css('div.utm_window .utm_window_controls button', {
	background: '#C8E6F0',
	border: 'none'
});


utm.module(

/* info */{
	name: 'window',
	version: .1
},

/* dependencies */
[
	'ui' // mod.ui.js :: utm user interface module
],

/* core */ {
	Window: function (options, c) {
	//>> creates a window
		// handles given options
		this.options = utm.ext({
			// data
			title: '',
			text: '',
			status: '',
			// ui
			resize: true,
			drag: true,
			modal: false,
			// control buttons
			minimize: true,
			maximize: true,
			// positions & sizes
			x: 'center',
			y: 'center',
			minWidth: 200,
			minHeight: 100,
			// other
			open: true
		}, options || {});
		
		var win = this;
		
		this.body = utm.create('div.utm_window');
		// components
		this.titleContainer = this.body.append('div.utm_window_title', this.options.title);
		this.contentContainer = this.body.append('div.utm_window_content');
		this.buttonsContainer = this.body.append('div.utm_window_buttons');
		this.controlsContainer = this.body.append('div.utm_window_controls');
		
		// control buttons
		if (this.options.minimize) { this.controlsContainer.append('button', '_').click(function () { win.minimize() }); }
		if (this.options.maximize) { this.controlsContainer.append('button', '^').click(function () { win.maximize() }); }
		this.controlsContainer.append('button', 'x').click(function () { win.close() });
		
		// internal use data
		this.restoreData = {};
		
		this.titleContainer.draggable({
			element: this.body
		});
		
		utm(this).ext({
		/* main methods */
		open: function () {
		//>> shows the window
			if (this.options.modal) { utm.modal(true); }
			utm('body').append(this.body);
			utm.pos(this.body, this.options.y + ' ' + this.options.x);
			this.size();
			return this;
		},
		close: function () {
		//>> closes the window
			this.body.remove();
			return this;
		},
		minimize: function () {
		//>> minimizes the window size
			
			return this;
		},
		maximize: function () {
		//>> maximizes the window size
			if (this.maximized) { return this.restore(); }
			
			var mSize = utm.size(),
			    size = this.body.size(),
			    pos = this.body.pos();
			
			utm.ext(this.restoreData, {
				width: size.width,
				height: size.height,
				left: pos.left,
				top: pos.top
			});
			
			this.body.move(0, 0, 'ultra').css({
				width: mSize.width - 2,
				height: mSize.height - 2
			});
			
			this.maximized = true;
			
			return this;
		},
		restore: function () {
		//>> restores the window size
			this.body.move(this.restoreData.left, this.restoreData.top, 'ultra')
			.css({ width: this.restoreData.width, height: this.restoreData.height });
			
			this.maximized = false;
			
			return this;
		},
		title: function (text) {
		//>> sets a new title
			this.options.title = text;
			this.body.first().text(text);
		},
		
		/* internal methods */
		size: function () {
		//>> fixes the window's size
			var size = this.body.size();
			if (size.width < this.options.minWidth) { this.body.css('width', this.options.minWidth) }
			if (size.height < this.options.minHeight) { this.body.css('height', this.options.minHeight) }
		}
		});
		
		if (this.options.open) { this.open(); }
	}
}

); }
catch (e) { throw new Error('utm error: core not found or dependencies unsatisfied'); } })();
