(function (u) {
/*
	Tooltip module for the utm JavaScript library
	Copyright (c) 2009 E. Myller (emyller.net)
*/
u.mod(
/* info */{
	name: 'ui_tooltip',
	version: .1
},

/* dependencies */
[
	'ui_basics'
],

/* core */ {

Tooltip: u.Class(
{
	__construct: function (element, content, options)
	{
		this.element = u(element);

		this.options = options = u.extend(
		{
			open: true
		}, options || {});

		var
		_this = this.element[0].tooltip = this,
		dom = this.DOMElements = {
			main: u.create('div.utm_tooltip'),
			pointer: u.create('div.utm_tooltip_pointer'),
			body: u.create('div.utm_tooltip_body'),
			topBar: u.create('div'),
			topLeftCorner: u.create('div.utm_tooltip_top-left-corner'),
			title: u.create('div.utm_tooltip_title', options.title),
			topRightCorner: u.create('div.utm_tooltip_top-right-corner'),
			middle: u.create('div'),
			leftBorder: u.create('div.utm_tooltip_left-border'),
			content: u.create('div.utm_tooltip_content'),
			rightBorder:u.create('div.utm_tooltip_right-border'),
			bottomBar: u.create('div'),
			bottomLeftCorner: u.create('div.utm_tooltip_bottom-left-corner'),
			bottom: u.create('div.utm_tooltip_bottom'),
			bottomRightCorner: u.create('div.utm_tooltip_bottom-right-corner')
		};

		// build the tooltip
		dom.main
		.add(dom.pointer)
		.append(dom.body)
			.append(dom.topBar)
				.add(dom.topRightCorner)
				.add(dom.topLeftCorner)
				.add(dom.title)
			.up()
			.append(dom.middle)
				.append(dom.leftBorder)
					.append(dom.rightBorder)
						.add(dom.content)
			.up(3)
			.append(dom.bottomBar)
				.add(dom.bottomRightCorner)
				.add(dom.bottomLeftCorner)
				.add(dom.bottom);

		this.content(content);

		options.open && this.open();
	},

	content: function (content, add)
	{
		content = typeof content == 'string' ? u.create('p', content) : u(content);

		!add && this.DOMElements.content.empty();

		this.DOMElements.content.add(content);

		return this;
	},

	open: function ()
	{
		u.append(this.DOMElements.main).fadeIn({speed:'fastest'});
		return this.pos();
	},

	close: function ()
	{
		this.DOMElements.main.remove();
		return this;
	},

	pos: function ()
	{
		var pos = this.element.pos(),
			size = u.size(this.element);

		this.DOMElements.main
		.front()
		.css(
		{
			left: pos.left,
			top: pos.top + size.height
		});

		return this;
	}
})

},

/* elements methods */ {

}
);
})(utm);
