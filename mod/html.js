(function (u) {
/*
	html parser module for the utm JavaScript library
	Copyright (c) 2009 E. Myller (emyller.net)
*/
var
OUTER = /(?:<(\/)?([\w:-]+)((?:\s+[^\s=]+="[^"]*")*)\s*(\/)?>)?([^<]*)/g,
ATTRS = /([\w:-]+)="([^"]*)"/g,
SINGLE = /^(?:area|base|basefont|br|hr|img|input|link|meta)$/i;

u.mod(
/* info */{
	name: 'html',
	version: .1
},

/* dependencies */
[
	/* none */
],

/* core */ {

parseHTML: function (html)
{
	var tree = [],
		curEl;

	html.replace(OUTER, function ()
	{
		// closes one element (double tags)
		if (arguments[1])
		{
			curEl = curEl.parentNode;
			return;
		}

		if (arguments[2])
		{
			// creates one element
			var el = u.create(arguments[2]);

			// adds attributes
			arguments[3].replace(ATTRS, function ()
			{
				el.attr(arguments[1], arguments[2]);
			});

			// puts it in the right place
			el = curEl ? curEl.appendChild(el[0]) : tree.push(el[0]) && el[0];
		}

		if (arguments[5])
		{
			// handles text
			if (el && !arguments[4] && !SINGLE.test(arguments[2]))
				curEl = u(el).text(arguments[5])[0];
			else
			{
				var text = u.create('', arguments[5]);
				curEl && curEl.parentNode ? u(curEl).after(text) : tree.push(text[0]);
			}
		}
	});

	return u(tree);
}

},

/* elements methods */ {

html: function (html)
{
	for (var i = -1; this[++i];)
		u(this).add(u.parseHTML(html));

	return this;
}

}

);

// modifies the native request handler to support html
u.Request.__extend({ handle: function ()
{
	var xhr = this.XMLHttpRequest,
		o = this.options;

	o.async && u.event.fire(xhr, 'readystatechange');

	if (!o.async || xhr.readyState == 4) {
		this.text = xhr.responseText;
		this.xml = xhr.responseXML;
		this.html = u.parseHTML(this.text);
		this.json = null;
		if (o.json || !this.text.indexOf('[') || !this.text.indexOf('{')) try {
			this.json = eval('('+(this.text || [])+')');
		} catch (e) {}

		this.failure = !(xhr.status == 200 || xhr.status == 304);

		// callbacks
		!this.failure ?
			u.event.fire(this, 'success') :
			u.event.fire(this, 'failure');
		u.event.fire(this, 'finish');
	}
}});

})(utm);
