/*
	Window widget for Ultimate JavaScript Library
	Copyright (c) 2008 E. Myller (emyller.net)
*/
(function () { try {

// add the stylesheet
utm('head').add('link[rel="stylesheet"][type="text/css"][href="'+utm.path+'mod.window/default.css"]');

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

// a collection of windows
windows: [],

Window: function (opt, c) {
//>> creates a window
	// handles given options
	var opt = this.options = utm.ext({
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
	}, opt || {}),
	
	win = this,
	
	body = this.body = utm.create('div.utm_window'),
	// components
	title = this.titleContainer = this.body.append('div.utm_window_title').add('span'),
	content = this.contentContainer = this.body.append('div.utm_window_content'),
	btns = this.buttonsContainer = this.body.append('div.utm_window_buttons'),
	ctrls = this.controlsContainer = this.body.append('div.utm_window_controls');
	
	// control buttons
	if (opt.minimize) {
		this.minimizeButton = ctrls.append('button.utm_control_btn')
		.click(function () { win.minimize() });
	}
	if (opt.maximize) {
		this.maximizeButton = ctrls.append('button.utm_control_btn')
		.click(function () { win.maximize() })
		.css('background-position', '-22px 0');
		// maximize / restore by title bar
		title.bind('dblclick', function () { win.maximize() }).selectable(false);
	}
	this.closeButton = ctrls.append('button.utm_control_btn')
	.click(function () { win.close() })
	.css({'background-position': '-67px 0', 'width': '32px'});
	
	// hovering
	ctrls.filter('>*').bind('mouseover,mouseout', function (e) {
		utm(this).css('background-position', (utm(this).css('background-position') || '0 0').replace(/ .+$/, e.type == 'mouseover'? ' -15px' : ' 0'));
	});
	
	utm(this).ext({
		restoreData: {},
	/*-----------
	>> UI Methods
	--------------*/
	close: function () {
	//>> closes the window
		// handles the modal
		for (var modals = 0, w = 0; w < utm.windows.length; w++)
		if (utm.windows[w].options.modal) { modals++; }
		
		if (modals < 2) { utm.modal(); }
		else {
			utm('#utm_modal').css('z-index', Math.floor(utm.windows[utm.windows.length - 2].body.css('z-index')) - 1);
		}
		
		// deletes the window from the main collection
		utm.windows.splice(utm(utm.windows).index(this), 1);
		
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
			.move(0, 0, 'faster')
			.resize(mSize.width - 2, mSize.height - 2, {
				speed: 'faster',
				finish: function () { win.size().ghost(); }
			});
		
		this.maximized = true;
		this.maximizeButton.css('background-position', '-44px 0');
		
		return this;
	},
	restore: function () {
	//>> restores the window size
		// a fix for IE6: avoid preservation of maximized container height
		this.contentContainer.css('height', 0);
		
		this.ghost().body
			.move(this.restoreData.left, this.restoreData.top, 'faster')
			.resize(this.restoreData.width, this.restoreData.height, {
				speed: 'faster',
				finish: function () { win.size().ghost(); }
			});
		
		this.maximized = false;
		this.maximizeButton.css('background-position', '-22px 0');
		
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
		if (!add) { this.contentContainer.empty(); }
		var newP = this.contentContainer.append('p'),
		    w = this;
		utm.get(url, function (text) {
			newP.text(text);
			win.size();
		});
		
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
		}, 1);
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
	if (this.options.modal) {
		utm.modal(true);
		utm('#utm_modal').front();
	}
	
	// adds the window to the page
	utm('body').append(this.body).front();
	
	this.body.mousedown(function () { utm(this).front() });
	
	// another fix for IE6: avoid 100% width
	this.body.css('width', 0);
	
	this.body.fadeIn('fast');
	
	// set the title and content
	this.title(this.options.title).text(this.options.text);
	
	// set its position
	setTimeout(function () {
		utm.pos(win.body, win.options.y + ' ' + win.options.x);
	}, 50);
	
	// make the window draggable
	if (opt.drag) { title.draggable({ element: this.body }); }
	// adds some visual / ux enhancements
	this.body.bind('dragstart,dragend', function () { win.ghost() });
	
	// fix the positions
	this.size();
	
	utm.windows.push(this);
}
}

); }
catch (e) { throw new Error('utm error: core not found or dependencies unsatisfied'); } })();
