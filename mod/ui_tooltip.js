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
	__construct: function (content, options)
	{
		this.options = options = u.extend(
		{
			shadow: true
		});

		var
		_this = this,
		dom = this.DOMElements = {
			main: u.create('div.utm_tooltip'),
				pointer: u.create('div.utm_tooltip_pointer'),
				content: u.create('div.utm_tooltip_content')
		};

		// build the tooltip
		dom.main
			.add(dom.pointer)
			.add(dom.content);

		this.content(content);

		u.append(dom.main);
	},

	content: function (content, add)
	{
		content = typeof content == 'string' ? u.create('p', content) : u(content);

		!add && this.DOMElements.content.empty();

		this.DOMElements.content.add(content);

		return this;
	},

	close: function ()
	{
		this.DOMElements.main.remove();
	}
})

},

/* elements methods */ {

}
);
})(utm);
