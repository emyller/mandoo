/*
	Balloons and tooltips for Ultimate JavaScript Library
	Copyright (c) 2008 E. Myller (emyller.net)
*/
(function () { try { utm.mod(

/* info */{
	name: 'balloon',
	version: .1
},

/* dependencies */
[
	'ui' // mod.ui.js :: utm user interface module
],

/* core */ {

Tooltip: function (opt) {
//>> tooltip widget
	// handles given options
	var opt = typeof opt == 'string'?
		{ text: opt } :
	this.options = utm.ext({
		// data
		title: '',
		text: '',
		timeout: 10,
		// positions & sizes
		x: 'right',
		y: 'bottom',
		opacity: 100
	}, opt || {}),
	
	tooltip = this,
	
	body = this.body = utm.create('div.utm_tooltip'),
	// components
	title = this.titleContainer = body.append('div.utm_tooltip_title').add('strong'),
	content = this.content = body.append('div.utm_tooltip_content');
	
	body.append('button.utm_balloon_close').click(function () { tooltip.close(); })
	.bind('mouseover,mouseout', function (e) { u(this).css('background-position',
		e.type == 'mouseover'? '0 -16px' : '0 0');
	});
	
	utm(this).ext({
	/*-----------
	>> UI Methods
	--------------*/
	close: function () {
	//>> closes the tooltip
		this.closed = true;
		this.body.fadeOut(true);
	},

	/*----------------
	>> Content methods
	-------------------*/
	title: function (t) {
	//>> sets the tooltip title
		this.options.title = t;
		this.titleContainer.first().text(t);
		
		return this;
	},
	text: function (t) {
	//>> sets the tooltip text
		this.content.text(t);
		
		return this;
	}
	});
	
	// renders the tooltip on the page
	u.append(this
		.title(opt.title)
		.text(opt.text)
		.body
	).fadeIn();
	// position
	setTimeout(function () {
		body.pos(opt.x + ' ' + opt.y);
		var size = body.size();
		// uses proper animations
		opt.y == 'top'?
			body.css('top', -size.height).moveBy(0, size.height+10, 'faster') :
			body.moveBy(0, -10, 'faster');
	}, 50);
	
	// auto-close
	if (opt.timeout > 0)
	this.timeout = setTimeout(function () {
		if (!tooltip.closed) { tooltip.close(); }
	}, opt.timeout * 1000);
},

Balloon: function (el, opt) {
//>> a customizable balloon
	// handles given options
	var opt = typeof opt == 'string'?
		{ text: opt } :
	this.options = utm.ext({
		// data
		title: '',
		text: '',
		timeout: 0,
		opacity: 100
	}, opt || {}),
	
	el = this.element = utm(el),
	
	balloon = this,
	
	body = this.body = utm.create('div.utm_balloon'),
	// components
	arrow = this.arrow = body.append('div.utm_balloon_arrow'),
	title = this.titleContainer = body.append('div.utm_balloon_title')
		.append('button.utm_balloon_close').click(function () { balloon.close(); })
		.bind('mouseover,mouseout', function (e) { u(this).css('background-position',
			e.type == 'mouseover'? '0 -16px' : '0 0');
		}).parent()
		.add('strong'),
	content = this.content = body.append('div.utm_balloon_content');
	
	utm(this).ext({
	/*-----------
	>> UI Methods
	--------------*/
	close: function () {
	//>> closes the tooltip
		this.closed = true;
		this.body.fadeOut(true);
	},

	/*----------------
	>> Content methods
	-------------------*/
	title: function (t) {
	// sets the balloon title
		this.options.title = t;
		this.titleContainer.last().text(t);
		
		return this;
	},
	text: function (t) {
	//>> sets the balloon text
		this.content.text(t);
		
		return this;
	},
	
	refresh: function () {
	//>> updates the balloon position/visibility and the arrow
		if (balloon.closed) { return clearInterval(balloon.refresh); }
		var pos = body.pos(),
		size = body.size(),
		_pos = el.pos(),
		_size = el.size(),
		arsize = arrow.size(),
		__size = utm.size(true),
		atBottom = _pos.bottom + size.height <= __size.height,
		atRight = _pos.right + size.width <= __size.width;
		
		body.css({
			left: atRight? _pos.left : _pos.right - size.width,
			top: atBottom? _pos.bottom : _pos.top - size.height,
			paddingTop: atBottom? 15 : 0,
			paddingBottom: atBottom? 0 : 15,
			zIndex: balloon.element.css('zIndex')
		});
		arrow.css({
			left: atRight? _size.width/3-arsize.width/2 : '', right: atRight? '' : _size.width/3-arsize.width/2,
			top: atBottom? 0 : '', bottom: atBottom? '' : 0,
			backgroundPosition: atBottom? '0 0' : '0 -'+arsize.height+'px'
		});
	}
	});
	
	// renders the balloon
	utm.append(this
		.title(opt.title)
		.text(opt.text)
		.body
	)
	.fadeIn()
	.bind('mouseover,mouseout', function (e) {
		if (e.type == 'mouseover') {
			clearInterval(balloon.refreshing);
			utm(this).front();
		} else {
			balloon.refreshing = setInterval(balloon.refresh, 100);
		}
	});
	
	// position
	this.refreshing = setInterval(this.refresh, 100);
}

}

); }
catch (e) { throw new Error('utm error: core not found or dependencies unsatisfied'); } })();
