/*
	Window widget for the Ultimate JavaScript Library
	Copyright (c) 2008 E. Myller (emyller.net)
*/
(function () { try {

utm // default stylesheet
.css('.utm_window', {
	font: '.9em "Sans","Trebuchet MS"',
	position: 'absolute',
	border: '1px solid #000',
	'background-color': '#ADD8E6'
})
.css('.utm_window_title', {
	padding: '3px',
	cursor: 'default'
})
.css('.utm_window_controls', {
	position: 'absolute',
	top: '0',
	right: '0',
	'border-left': '1px solid black',
	'border-bottom': '1px solid black'
})
.css('.utm_control_btn', {
	'background-image': 'url('+utm.path+'window/btns.png)',
	border: 'none',
	width: '24px',
	height: '18px'
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
		var title = this.titleContainer = this.body.append('div.utm_window_title').add('span', this.options.title),
		    content = this.contentContainer = this.body.append('div.utm_window_content'),
		    btns = this.buttonsContainer = this.body.append('div.utm_window_buttons'),
		    ctrls = this.controlsContainer = this.body.append('div.utm_window_controls');
		
		// control buttons
		if (this.options.minimize) {
			this.controlsContainer.append('button.utm_control_btn', '_').click(function () { win.minimize() });
		}
		if (this.options.maximize) {
			this.controlsContainer.append('button.utm_control_btn', '^').click(function () { win.maximize() });
		}
		title.bind('dblclick', function () { win.maximize() });
		this.controlsContainer.append('button.utm_control_btn', 'x').click(function () { win.close() }).css('background: #950000');
		
		// internal use data
		this.restoreData = {};
		
		// make the window draggable
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
			
			this.body
				.move(0, 0, 'faster')
				.resize(mSize.width - 2, mSize.height - 2, 'faster');
			
			this.maximized = true;
			
			return this;
		},
		restore: function () {
		//>> restores the window size
			this.body
				.move(this.restoreData.left, this.restoreData.top, 'ultra')
				.resize(this.restoreData.width, this.restoreData.height, 'ultra');
			
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
			if (size.width < this.options.minWidth) { this.body.css('width', this.options.minWidth); }
			if (size.height < this.options.minHeight) { this.body.css('height', this.options.minHeight); }
		}
		});
		
		if (this.options.open) { this.open(); }
	}
}

); }
catch (e) { throw new Error('utm error: core not found or dependencies unsatisfied'); } })();
