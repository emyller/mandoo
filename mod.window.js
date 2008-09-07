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
	background: '#ADD8E6'
})
.css('.utm_window_title', {
	padding: '.1em'
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
			// positions & sizes
			x: 'center',
			y: 'center',
			minWidth: 200,
			minHeight: 100,
			// other
			open: true
		}, options || {});
		
		this.body = utm.create('div.utm_window');
		// components
		this.titleContainer = this.body.append('div.utm_window_title', this.options.title);
		this.contentContainer = this.body.append('div.utm_window_content');
		this.buttonsContainer = this.body.append('div.utm_window_buttons');
		this.controlsContainer = this.body.append('div.utm_window_controls');
		
		utm(this).ext({
		/* main methods */
		open: function () {
		//>> shows the window
			utm('html').add(this.body);
			utm.pos(this.body, this.options.y + ' ' + this.options.x, true);
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
			
			return this;
		},
		restore: function () {
		//>> restores the window size
			
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
			
		}
		});
		
		if (this.options.open) { this.open(); }
	}
}

); }
catch (e) { throw new Error('utm error: core not found or dependencies unsatisfied'); } })();
