/*
	Window widget for the Ultimate JavaScript Library
	Copyright (c) 2008 E. Myller (emyller.net)
*/
(function () { try {

utm // default stylesheet
.css('.utm_window', {
	'font': '.9em "Sans","Trebuchet MS"',
	'position': 'absolute',
	'border': '1px solid #000',
	'background-color': '#a3bac4'
})
.css('.utm_window_title', {
	'padding': '3px',
	'cursor': 'default',
	'background-color': '#90afbd',
	'border': '1px solid #fff',
	'border-bottom': 'none',
	'height': '18px'
})
.css('.utm_window_content', {
	'overflow': 'auto',
	'border': '1px solid #fff',
	'border-top': 'none',
	'top': '20px',
	'bottom': '0',
	'padding': '0 1em'
})
.css('.utm_window_controls', {
	'position': 'absolute',
	'top': '1px',
	'right': '4px',
	'height': '20px'
})
.css('.utm_control_btn', {
	'background-image': 'url('+utm.path+'window/btns.png)',
	'width': '22px',
	'height': '19px',
	'border': 'none',
	'float': 'left',
	'cursor': 'pointer'
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
	var title = this.titleContainer = this.body.append('div.utm_window_title').add('span'),
		content = this.contentContainer = this.body.append('div.utm_window_content'),
		btns = this.buttonsContainer = this.body.append('div.utm_window_buttons'),
		ctrls = this.controlsContainer = this.body.append('div.utm_window_controls');
	
	// control buttons
	if (this.options.minimize) {
		this.minimizeButton = this.controlsContainer.append('button.utm_control_btn')
			.click(function () { win.minimize() }); }
	if (this.options.maximize) {
		this.maximizeButton = this.controlsContainer.append('button.utm_control_btn')
			.click(function () { win.maximize() })
			.css('background-position', '-22px 0'); }
	this.closeButton = this.controlsContainer.append('button.utm_control_btn')
		.click(function () { win.close() })
		.css({'background-position': '-67px 0', 'width': '32px'});
	
	title.bind('dblclick', function () { win.maximize() }).selectable(false);
	
	// make the window draggable
	this.titleContainer.draggable({
		element: this.body
	});
	
	utm(this).ext({
		restoreData: {},
	/*-----------
	>> UI Methods
	--------------*/
	close: function () {
	//>> closes the window
		return this.ghost().body.shrink(true);
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

		this.ghost().body
			.move(0, 0, 'ultra')
			.resize(mSize.width - 2, mSize.height - 2, {
				speed: 'ultra',
				finish: function () { win.size().ghost(); }
			});
		
		this.maximized = true;
		
		return this;
	},
	restore: function () {
	//>> restores the window size
		this.ghost().body
			.move(this.restoreData.left, this.restoreData.top, 'ultra')
			.resize(this.restoreData.width, this.restoreData.height, {
				speed: 'ultra',
				finish: function () { win.size().ghost(); }
			});
		
		this.maximized = false;
		
		return this;
	},
	title: function (text) {
	//>> sets a new title
		this.options.title = text;
		this.body.first().text(text);
		
		return this;
	},

	text: function (text, add) {
	//>> sets a text for the window
		if (!add) { this.contentContainer.empty(); }
		this.contentContainer.add('p', text);
		
		return this;
	},

	get: function (url, add) {
		if (add) { this.contentContainer.empty(); }
		var newP = this.contentContainer.append('p');
		utm.get(url, function (text) { newP.text(text) });
		
		return this;
	},

	/*-----------------
	>> Internal methods
	--------------------*/
	size: function () {
	//>> fixes the window's size
		var win = this; setTimeout(function () {
			var size = win.body.size();
			// min / normal size
			win.body.css('width', size.width < win.options.minWidth? win.options.minWidth : size.width);
			win.body.css('height', size.height < win.options.minHeight? win.options.minHeight : size.height);
			// content container size
			win.contentContainer.css('height', win.body[0].clientHeight - win.titleContainer[0].offsetHeight - win.buttonsContainer[0].offsetHeight - 1);
		}, 50);
		return this;
	},
	ghost: function () {
	//>> toggles the window's visibility, to speed up dragging, resizing, etc
		this.body.filter('>*').css('display', this.transparent? 'block' : 'none')
		this.body.opacity(this.transparent? 100 : 80);
		
		this.transparent = !this.transparent;
		return this;
	}
	});
	
	// creates a modal
	if (this.options.modal) { utm.modal(true); }
	
	// adds the window to the page
	utm('body').append(this.body);
	
	this.body.fadeIn('fast');
	
	// set the title and content
	this.title(this.options.title).text(this.options.text);
	
	// set its position
	utm.pos(this.body, this.options.y + ' ' + this.options.x);
	
	// fix the positions
	this.size();
	
	// adds some visual / ux enhancements
	this.body.bind('dragstart,dragend', function () { win.ghost() });
}
}

); }
catch (e) { throw new Error('utm error: core not found or dependencies unsatisfied'); } })();
