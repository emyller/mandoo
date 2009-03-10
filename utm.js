// main namespace
window.utm = function (s, c) { return new u.Start(s, c); };

(function (u) {

/**********************************************************
 ################ utm JavaScript Library ##################
 **********************************************************/
u.version = 1;

/** Copyright (c) 2009 E. Myller (emyller.net)
 * utm is licensed under the LGPL license.
 *
 * Visit utmproject.org for more information.
 */

u.Start = function (sel, context) {
/********************
 * utm Initializer
 ********************/
	if (sel && sel.__utm)
		return sel;
	else if (!sel)
		return;

	// enable the length property in the utm elenent set
	this.length = 0;

	// set the default context to the document object
	context = context || document;

	// handles css selector strings
	if (typeof sel == 'string') {
		context = u(context)[0];
		if (!context)
			return;
		Array.prototype.push.apply(this, u.grab(sel, context));
	} else {
		// handles collections
		sel.length !== undefined &&
			Array.prototype.push.apply(this, sel instanceof Array? sel : u.array(sel))
		||
		// handles DOM elements
		sel.nodeType && (this[0] = sel) && (this.length = 1);
	}
};

/**********************************
 * utm native static DOM methods
 **********************************/
u.create = function (sel, text, attrs) {
//>> creates a new DOM element
	// if it's already an utm object, return itself
	if (sel.__utm)
		return sel;

	else
	// if it's a DOM node, return it in a new utm object
	if (sel.nodeType)
		return u(sel);

	attrs = attrs || {};
	var el,
	// parses the css selector
	type, step; while (sel) {
		type = sel.charAt(0);
		step = u.grab.selectors.match[
			type = type == '#'? 'ID' :
			type == '.'? 'CLASS' :
			type == '['? 'ATTR' :
			'TAG'
		].exec(sel);
		// removes the processed part
		sel = sel.slice(step[0].length);

		// handles the new element
		type == 'TAG'?
			el = u(document.createElement(step[1])) :
		type == 'ID'?
			attrs.id = step[1] :
		type == 'CLASS'?
			el.addClass(step[1]) :
		//type == 'ATTR'?
			attrs[step[1]] = step[4];
	}

	// adds the attributes
	el.attr(attrs);

	// add text
	el.text(text);

	return el;
};

u.append = function (sel, text, attrs) {
	return u(document.getElementsByTagName('body')[0] || document).append(
		u.create(sel, text, attrs)
	);
};

u.Start.prototype = u.methods = {
/***********************************
 * utm native dynamic DOM methods
 ***********************************/
	// indicates that this object is an utm set
	__utm: true,

	each: function (fn) {
	//>> executes 'fn' for each item in the utm object
		for (var i = -1; this[++i];)
			fn(this[i]);
		return this;
	},

	merge: function () {
	//>> merges utm sets into the current one
		for (var i = -1; arguments[++i];)
			this.push.apply(this, u.array(u(arguments[i])));
		return this;
	},

	push: function () {
	//>> pushes new items into the current utm set
		for (var i = -1; arguments[++i];) if (arguments[i].nodeType)
			Array.prototype.push.call(this, arguments[i]);
		return this;
	},

	filter: function (sel) {
	//>> performs an element filtering
		return u(u.grab.filter(sel, this));
	},

	all: function (sel) {
	//>> gets all elements inside the current
		for (var i = -1, els = u(); this[++i];)
			els.merge
	},

	children: function (crit) {
	//>> looks for the children
		for (var i = -1, els = u(); this[++i];) {
			var el = this[i].firstChild,
			    matches = crit? u.grab.find(crit, this[i]) : undefined;
			while (el) {
				if (el.nodeType == 1 && (matches? u.index(matches.set, el) > -1 : true))
					els.push(el);
				el = el.nextSibling;
			}
		}
		return els;
	},

	append: function (sel, text, attrs) {
	//>> appends elements into existing ones
		for (var i = -1; this[++i];)
			for (var i2 = -1, els = u.create(sel, text, attrs).remove(); els[++i2];)
				this[i].appendChild(els[i2]);
		return els;
	},

	prepend: function (sel, text, attrs) {
	//>> prepends elements into existing ones
		for (var i = -1, first; this[++i];) {
			var els = u.create(sel, text, attrs).remove();
			first = this[i].firstChild;
			while (first && first.nodeType != 1) first = first.nextSibling;
			for (var i2 = -1; els[++i2];) first?
				this[i].insertBefore(els[i2], first) :
				this[i].appendChild(els[i2]);
		}
		return els;
	},

	add: function (sel, text, attrs) {
	//>> appends elements into existing ones and stay in the parent
		return this.append(sel, text, attrs).parent();
	},

	appendTo: function (obj) {
	//>> appends created elements to existing ones
		u(obj).append(this);
		return this;
	},

	before: function (sel, text, attrs) {
	//>> inserts elements before another one
		for (var i = -1; this[++i];)
			for (var i2 = -1, els = u.create(sel, text, attrs).remove(); els[++i2];)
				this[i].parentNode.insertBefore(els[i2], this[i]);
		return els;
	},

	after: function (sel, text, attrs) {
	//>> inserts elements after another one
		for (var i = -1, next; this[++i], next = this[i];) {
			var els = u.create(sel, text, attrs).remove();
			do next = next.nextSibling; while (next && next.nodeType != 1);
			for (var i2 = -1; els[++i2];) next?
				this[i].parentNode.insertBefore(els[i2], next) :
				this[i].parentNode.appendChild(els[i2]);
		}
		return els;
	},

	hasClass: function (cls) {
	//>> checks if the elements have a class name
		var valid = !!this[0];
		for (var i = -1; this[++i];)
			(' '+this[i].className+' ').indexOf(' '+cls+' ') < 0 && (valid = 0);
		return !!valid;
	},

	addClass: function (cls, overwrite) {
	//>> adds class names
		cls = String(cls).split(/\s*,\s*|\s+/);
		for (var i = -1; this[++i];) {
			overwrite && (this[i].className = '');
			for (var i2 = -1; cls[++i2];)
				(' '+this[i].className+' ').indexOf(' '+cls[i2]+' ') < 0 &&
					(this[i].className += (this[i].className? ' ' : '') + cls[i2]);
		}
		return this;
	},

	rmClass: function (cls) {
	//>> removes class names
		var rcls = new RegExp('\\s+(?:'+String(cls).split(/\s*,\s*|\s+/).join('|')+')\\s+', 'g');
		for (var i = -1; this[++i];)
			this[i].className = u.clean((' '+this[i].className+' ').replace(rcls, ' '));
		return this;
	},

	is: function (sel) {
	//>> check if this element match the criteria
		return !!sel && u.grab.filter(sel, this).length > 0;
	},

	not: function (sel) {
	//>> check if this element doesn't match the criteria
		return !this.is(sel);
	},

	attr: function (name, value, style) {
		var attrs = name;
	//>> gets an attribute
		if (typeof name == 'string') {
			name = u.attrName(name);
			if (value === undefined)
				return (
					// returns the opacity
					name == 'opacity'?
						u.opacity(this[0]) :
					// or other style attribute
					style?
						this[0].style[name] ||
						(this[0].currentStyle?
							this[0].currentStyle[name] :
							this[0].ownerDocument.defaultView.getComputedStyle(this[0], null)[name]) :
						this[0].getAttribute(name) || this[0][name]
				);
			else {
				attrs = {};
				attrs[name] = value;
			}
		}
	//>> sets attributes
		for (var i = -1; this[++i];) for (var name in attrs)
			// set css properties
			style?
				this[i].style[u.attrName(name)] =
					// sets opacity
					name == 'opacity'? u.opacity(this[i], attrs[name]) :
					(typeof attrs[name] == 'number' && !/zoom|index/.test(name))?
					// handles numbers
						Math.floor(attrs[name]) + 'px' :
					// or any other value
						attrs[name] :
			// set common attributes
			       this[i].setAttribute(u.attrName(name), attrs[name]);
		return this;
	},

	css: function (name, value) {
	//>> gets/sets style attributes
		return this.attr(name, value, true);
	},

	focus: function () {
		this[0].focus(); return this;
	},

	empty: function () {
	//>> removes every child node
		for (var i = -1; this[++i];) {
			this[i].value = '';
			while (this[i].firstChild)
				this[i].removeChild(this[i].firstChild);
		}
		return this;
	},

	text: function (text, add) {
	//>> gets text content
		if (text === undefined && this[0])
			return this[0].textContent || this[0].innerText || this[0].text;
		else {
	//>> sets text content
			if (!add)
				this.empty();
			for (var i = -1; this[++i];)
				this[i].appendChild(this[i].ownerDocument.createTextNode(String(text)));
			return this;
		}
	},

	val: function (val, add) {
	//>> gets value attribute
		if (val === undefined && this[0])
			return this[0].value || this[0].getAttribute('value');
		else {
	//>> sets value attribute
			for (var i = -1; this[++i];) {
				if (!add)
					this[i].value = '';
				this[i].value += String(val);
			}
			return this;
		}
	},

	remove: function (perm) {
	//>> removes elements from DOM tree and/or from the memory
		for (var i = -1; this[++i];) {
			this[i].parentNode && this[i].parentNode.removeChild(this[i]);
			if (perm) {
				delete this[i];
				this.length--;
			}
		}
		return this;
	},

	nav: function (direction, crit) {
	//>> walks dinamically in the DOM tree
		var el = this[0],
		    walk = 0;

		if (typeof crit == 'string')
			crit = u.grab(crit);
		else if (crit == undefined)
			crit = 1;

		do {
			el =
				direction == 'parent'? el.parentNode :
				direction == 'prev'  ? el.previousSibling :
				direction == 'next'  ? el.nextSibling :
				direction == 'first' ? (el.firstChild && el.firstChild.nodeType != 1? el.firstChild.nextSibling : el.firstChild) :
				direction == 'last'  ? (el.lastChild && el.lastChild.nodeType != 1? el.lastChild.previousSibling : el.lastChild) :
				null;
			if (el && el.nodeType != 3)
				walk++;
		} while (
			el && (crit?
				// jump by numbers
				typeof crit == 'number'? walk < crit :
				// jump by element type
				u.index(crit, el) < 0 :
				// or just go to the nearest element
				el.nodeType == 1)
		);
		return u(el);
	},

	// shorcuts to .nav()
	parent: function (crit) {
		return this.nav('parent', crit);
	},
	up: function (crit) { return this.parent(crit); },
	prev: function (crit) {
		return this.nav('prev', crit);
	},
	next: function (crit) {
		return this.nav('next', crit);
	},
	first: function (crit) {
		return this.nav('first', crit);
	},
	last: function (crit) {
		return this.nav('last', crit);
	},

	// shortcuts to events
	bind: function (type, listener, bubble) {
		return u.event.add(this, type, listener, bubble);
	},
	unbind: function (type, listener, bubble) {
		return u.event.remove(this, type, listener, bubble);
	},
	fire: function (type, listener, event) {
		return u.event.fire(this, type, listener, event);
	},

	pos: function (coords) {
	//>> handles positions
		if (coords === undefined) {
		// get
			var el = this[0],
			    pos = { left:0, right: el.offsetWidth, top: 0, bottom: el.offsetHeight  };
			while (el.offsetParent) {
				// adds values to the new offset
				pos.left += el.offsetLeft;
				pos.right += el.offsetLeft;
				pos.top += el.offsetTop;
				pos.bottom += el.offsetTop;

				// goes up to the parent offset
				el = el.offsetParent;
			}
			return pos;
		} else {
		// set
			arguments[1] != undefined && (coords = u.array(arguments));

			if (typeof coords == 'string') {
				coords = coords.split(/s+/);
				if (coords.length < 2)
					coords[1] = coords[0];
			} else
				coords = [
					coords.left || coords[0] || 0,
					coords.top  || coords[1] || 0
				];

			var viewportSize = u.size(),
			    evalpos = function (pos, x) {
					return (
						pos == 'center' && x? viewportSize.width / 2 - size.width / 2 :
						pos == 'center'? viewportSize.height / 2 - size.height / 2 :
						pos == 'right'?  viewportSize.width - size.width :
						pos == 'bottom'?  viewportSize.height - size.height :
						0
					);
				};

			for (var i = -1, size; this[++i];) {
				size = u.size(this[i]);

				u(this[i]).css({
					left:
					typeof coords[0] == 'number'?
						coords[0] :
						eval(coords[0].replace(/[a-z]+/g, function (pos) { return evalpos(pos, 1); })),
					top:
					typeof coords[1] == 'number'?
						coords[1] :
						eval(coords[1].replace(/[a-z]+/g, evalpos))
				});
			}
			return this;
		}
	},

	// animations shortcuts
	anim: function (props, speed, callback, easing) {
		if (typeof callback != 'function') { easing = callback; callback = null; }
		new u.Animation(this, props, speed, callback, easing);
		return this;
	},
	fade: function (opacity, speed, callback) {
		new u.Animation(this, { opacity:  opacity }, speed, callback);
		return this;
	},
	fadeIn: function (speed, callback) {
		// sets opacity to 0 if it's 100%
		this.css('opacity') == 1 && this.css('opacity', 0);
		new u.Animation(this, { opacity: 1 }, speed, callback);
		return this;
	},
	fadeOut: function (speed, callback) {
		if (speed === true || callback === true)
			callback = function (anim) { anim.target.remove(); };
		new u.Animation(this, { opacity: 0 }, speed, callback);
		return this;
	},
	pulsate: function () {

		return this;
	},
	resize: function () {

		return this;
	},
	move: function (x, y, speed, callback, easing) {
		new u.Animation(this, {
			left: x, 'margin-left': x,
			top: y, 'margin-top': y
		}, speed, callback, easing);
		return this;
	},
	highlight: function(color) {
		new u.Animation(this, { 'background-color': color || '#ff0' }, 'fast', null, 'return');
		return this;
	}
};



u.xhr = {
/************************************
 * utm XMLHttpRequest (Ajax) support
 ************************************/
	create: function () {
	//>> initializes a new xhr object
		return window.ActiveXObject? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest;
	},

	handle: function (xhr, o) {
		(xhr.status == 200 || xhr.status == 304)? o.success(xhr) : o.failure(xhr);
		o.finish(xhr);
	},

	request: function(url, opt, data) {
		// creates a new request object
		var xhr = u.xhr.create();

		// handles options
		opt = u.extend({
			async: true,
			cache: false,
			method: 'GET',
			finish: function () {},
			success: function () {},
			failure: function () {}
		}, opt || {});

		opt.method = opt.method.toUpperCase();

		// handles parameters
		if (typeof data != 'string') {
			var params = []; for (var key in data)
				params.push(key + '=' + data[key]);
			data = params.join('&');
		}

		xhr.open(opt.method, url + (data && opt.method == 'GET'? '?' + data : ''), opt.async);

		// disables cache
		!opt.cache &&
			xhr.setRequestHeader('If-Modified-Since', 'Wed, 01 Jan 1997 00:00:00 GMT');

		// special header for POST requests
		opt.method == 'POST' &&
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xhr.send(opt.method == 'POST'? data : null);

		// handles the request
		opt.async?
			xhr.onreadystatechange = function () {
				xhr.readyState == 4 && u.xhr.handle(xhr, opt);
			} :
			u.xhr.handle(xhr, opt);

		return xhr;
	},

	common: function (url, opt, type, data) {
		var fn;

		opt =
		typeof opt == 'boolean'?
		// sync/async
			{ async: opt } :
		typeof opt == 'function' && (fn = opt)?
		// callback function
			{ finish: function (xhr) {
				fn(type == 'json'? eval('('+xhr.responseText+')') : xhr.responseText);
			} } :
		// normal object or invalid value
			opt || {};

		// force request method
		opt.method = type != 'json'? type : 'get';

		return u.xhr.request(url, opt, data);
	}
};

u.get = function (url, opt, data) { return u.xhr.common(url, opt, 'get', data); };
u.getJSON = function (url, opt, data) { return u.xhr.common(url, opt, 'json', data); };
u.post = function (url, data, opt) { return u.xhr.common(url, opt, 'post', data); };


u.Class = function (inherit, data) {
/********************
 * utm Class support
 ********************/
	!data && (data = inherit) && (inherit = undefined);

	// the "class" itself (constructor)
	var cls = data.__construct = typeof data.__construct == 'function'?
		data.__construct : function () {};
	delete data.__construct;

	// inheritance
	cls.prototype = inherit? new inherit : {};

	// adds defined stuff
	for (var key in data)
		// static
		if (!key.indexOf('__'))
			cls[key.slice(2)] = data[key];
		// dynamic
		else
			cls.prototype[key] = data[key];

	//~ // force constructor property
	//~ cls.prototype.constructor = cls;

	cls.__construct = cls;
	cls.__extend = function (data) {
		u.extend(this.prototype, data);
		return this;
	};

	return cls;
};

/********************
 * utm module system
 ********************/
u.file = function (url) {
//>> loads and provide data about a file
	var req = u.get(url, {
		async: false,
		failure: function () { throw new Error('utm: unable to open file'); }
	});
	return {
		modified: req.getResponseHeader('Last-Modified'),
		name: u.fileName(url),
		path: u.filePath(url),
		size: req.responseText.length,
		text: req.responseText,
		type: req.getResponseHeader('Content-Type'),
		xml: req.responseXML
	};
};

u.fileName = function (str) {
//>> (string) extracts the filename from a path
	return str.slice(str.lastIndexOf('/') + 1);
};

u.filePath = function (str) {
//>> (string) removes the filename from a path
	return str.slice(0, str.lastIndexOf('/') + 1);
};

u.path = (function () {
//>> just finds where is the utm core script
	var all = document.getElementsByTagName('script'),
	i = all.length; while (i--) if (all[i].src.indexOf('utm') >= 0)
		return u.filePath(all[i].src);

	return '';
})();

// collection of loaded modules
u.modules = {};

u.import = function () {
//>> loads an utm module
	for (var i = -1; arguments[++i];) {
		var tries = ['mod/', 'mod.', './'];
		while (!mod && (t = tries.shift())) {
			try { var mod = u.file(u.path + t + arguments[i] + '.js'); } catch (e) {}
		}
		if (mod)
			// module found, execute it
			u.append('script[type=text/javascript]', mod.text).remove();
		else
			// module not found, throw an error
			throw new Error('utm: module not found');
	}
	return utm;
};

u.mod = function (info, deps, core, methods) {
//>> utm module parser
	if (typeof info == 'string')
	// gets a module information
		return u.modules[name] || null;

	else {
		// adds a new module
		u.modules[info.name] = info;

		// adds the stylesheet
		u.useTheme(u.theme, info.name);

		// adds the necessary dependencies
		var dep; while ((dep = deps.shift()) && !u.modules[dep] && u.import(dep));
		// adds new functionalities
		u.extend(utm, core)
		u.extend(u.methods, methods);
	}
	return utm;
};

// the global theme being used by utm
u.theme = 'default';

u.useTheme = function (theme, mod) {
//>> set a theme
	// sets the theme globally
	if (!mod) {
		u.theme = theme;
		for (var mod in u.modules) {
			u.useTheme(theme, mod);
		}

	// sets the theme only for specific modules
	} else {
		mod = mod.split(/\s*,\s*/);
		var i = mod.length; while(i--) {
			u('link#utm_theme_'+mod[i]).remove();
			u('head,body')
			.append(
				'link#utm_theme_'+mod[i]+
				'[rel=stylesheet][type=text/css]'+
				'[href='+u.path+'themes/'+u.theme+'/'+mod[i]+'/style.css]'
			);
		}
	}
};


u.event = {
/**********************
 * utm event handlers
 **********************/
	add: function (els, type, listener, bubble) {
		// get the elements
		els = u(els);

		// split multiple types
		type = type.split(/\s*,\s*/);

		// adds the event listeners
		for (var i = -1; els[++i];) {
			els[i].events || (els[i].events = {});

			for (var t = -1; type[++t];) {
				// store the listeners
				(els[i].events[type[t]] = els[i].events[type[t]] || [])[listener] = listener;

				// try to use the standard event model method
				els[i].addEventListener && !els[i].addEventListener(type[t], listener, !!bubble)

				||// some bytes of code specially written for IE
				els[i].attachEvent('on'+type[t], els[i]['utm_'+type[t]+listener] = function (e) {
					// try to standardize the event object
					!e && (e = u.extend(window.event, {
						charCode: e.type == 'keypress' ? e.keyCode : 0,
						eventPhase: 2,
						isChar: e.keyCode > 0,
						pageX: e.clientX + document.body.scrollLeft,
						pageY: e.clientY + document.body.scrollTop,
						target: e.srcElement,
						relatedTarget: e.toElement,
						timeStamp: +new Date,
						preventDefault: function () { this.returnValue = false; },
						stopPropagation: function () { this.cancelBubble = true; }
					}));

					// sets bubbling
					e.cancelBubble = !bubble;

					// call the handler
					this.events[e.type][listener].call(this, e);
				});
			}
		}

		return els;
	},

	remove: function (els, type, listener, bubble) {
		// get the elements
		els = u(els);

		// split multiple types
		type = type.split(/\s+,?\s+/);

		// removes the event listeners
		for (var i = -1; els[++i];)
			for (var t = -1; type[++t];)
				// the standard event model method
				els[i].removeEventListener && !els[i].removeEventListener(type[t], listener, !!bubble)

				||// more few bytes of code for IE
				els[i].detachEvent('on'+type[t], els[i]['utm_'+type[t]+listener]);

		return els;
	},

	fire: function (els, type, listener, event) {
		// get the elements
		els = u(els);

		// split multiple types
		type = type.split(/\s+,?\s+/);

		for (var i = -1; els[++i];)
			for (var t = -1; type[++t];) {
				event || (event = { type: type[t] });
				if (listener && els[i].events[type[t]][listener])
					listener.call(els[i], event);
				else
					for (listener in els[i].events[type[t]])
						els[i].events[type[t]][listener].call(els[i], event);
			}

		return els;
	}
};
// adds event shortcuts
('blur,change,click,dblclick,focus,keydown,keypress,keyup,load,mousedown,'+
'mousemove,mouseout,mouseover,mouseup,reset,scroll,submit')
.replace(/\w+/g, function (type) {
	u.methods['on' + type] = function (fn) { return this.bind(type, fn); }
});

/****************
 * gfx utilities
 ****************/
u.size = function (el, scrolls) {
	if (el === undefined || typeof el == 'boolean' && (scrolls = el))
		el = document.documentElement;

	el = u(el)[0];

	return {
		width:
		scrolls?
			Math.max(el.scrollWidth, el.clientWidth) :
			el.clientWidth || el.offsetWidth,
		height:
		scrolls?
			Math.max(el.scrollHeight, el.clientHeight) :
			el.clientHeight || el.offsetHeight
	};
};

u.opacity = function (els, value) {
//>> handles the opacity
	els = u(els);

	if (value === undefined && els[0]) return (
	// get
		(u.support.ie && els[0].filter && els[0].filter.indexOf('opacity=') >= 0)?
			+els[0].filter.match(/opacity=([^)]*)/)[1] :
			+els[0].ownerDocument.defaultView.getComputedStyle(els[0], null).opacity
	); else {
	// set
		if (u.support.ie) {
			for (var i = -1; els[++i];) {
				els[i].style.zoom = 1;
				els[i].filter = (els[i].filter || '').replace(/alpha\([^)]*\)/, '') + 'alpha(opacity=' + value*100 + ')';
			}
		} else {
			for (var i = -1; els[++i];)
				els[i].style.opacity = value;
		}

		return this;
	}
};

u.color = function (color) {
//>> returns a color in [r,g,b] format
	var parsed, hex;

	// rgb format
	if (/^rgb/.test(color)) parsed = color.match(/(\d+)/g);
	else
	// hex format
	if (hex = /^#/.test(color)) {
		// removes the #
		color = color.slice(1);
		// handles reduced hex color
		color.length == 3 && (color = color.replace(/(.)/g, '$1$1'));
		// splits channels
		parsed = color.match(/(.{2})/g);
	}

	// convert all items to numbers
	for (var i = -1; parsed[++i];)
		parsed[i] = parseInt(parsed[i], hex? 16 : null);

	if (parsed.length == 3) return parsed;
	else u.error('invalid color.');
};


u.Animation = u.Class({
/****************************
 * utm native visual effects
 ****************************/
 	__construct: function (els, props, speed, callback, easing) {
		// get the elements
		els = u(els);

		// set animation properties
		this.startTime = u.now();
		this.speed = u.Animation.speed(speed);
		this.target = els;
		this.callback = callback;
		this.easing = easing || 'linear';

		//# prepares the calculation of the number of frames
		// get all the values of the properties
		var _from = [], _to = []; for (var p in props)
			// numeric values
			if (!/color/.test(p))
			{ _from.push(u.Animation.value(els[0], p)); _to.push(props[p]); }
			// color values, put a symbolic value
			else
			{ _from.push(0); _to.push(100); }
		// get the average of all
		_from = u.average.apply(null, _from); _to = u.average.apply(null, _to);
		// calculates the number of frames using the averages
		this.frames = Math.ceil(Math.abs(_from - _to) / Math.max(_from, _to) * 1000 / this.speed);

		// create a instance pointer so we can use it in internal scopes
		var anim = this;

		// perform the animation
		for (var i = -1, values = {}; els[++i];) {
			// separate the values
			values[i] = {};
			for (var p in props) values[i][p] = {
				from: u.Animation.value(els[i], p),
				to: props[p],
				scroll: !p.indexOf('scroll'),
				color: /color/.test(p)
			}
			// build the animation steps
			for (var f = 1; f <= anim.frames; f++)
			(function (frame, i) {
				setTimeout(function () {
					var value, v; for (var p in props) {
						v = values[i][p];
						// calculate the new value
						value = v.color?
							u.Animation.easing['gradient'](v.from, v.to, anim.frames, frame, anim.easing) :
							u.Animation.easing[anim.easing](v.to - v.from, anim.frames, frame);
						//~ // and set it
						v.scroll?
							els[i][p] = v.from + value :
							u(els[i]).css(p, v.color? value : v.from + value);
					}
					// fire events
					anim.target.fire('anim' + anim.frames == frame? 'finish' : '', undefined, anim);
					// animation ending
					if (anim.frames == frame) {
						anim.endTime = u.now();
						typeof anim.callback == 'function' && anim.callback.call(anim.target[0], anim);
					}
				}, frame * 20);
			})(f, i);
		}
	},

	__speed: function (s) {
	//>> parses a given speed
		return (
			s == 'slowest'?       1   :
			s == 'slower'?        5   :
			s == 'slow'?          10  :
			s == 'fast'?          50  :
			s == 'faster'?        70  :
			s == 'fastest'?       100 :
			typeof s != 'number'? 25  :
			s < 1?                1   :
			s > 100?              100 :
			s
		);
	},

	__easing: {
		linear: function (diff, frames, step) {
			return diff / frames * step;
		},
		smooth: function (diff, frames, step) {
			return diff * (3 * Math.pow(step/frames, 2) - 2 * Math.pow(step/frames, 3));
		},
		accelerated: function (diff, frames, step) {
			return diff * (3 * Math.pow(step/frames, 2) - 2 * Math.pow(step/frames, 2));
		},
		impulse: function (diff, frames, step) {
			return diff * (3 * Math.pow(step/frames, 3) - 2 * Math.pow(step/frames, 2));
		},
		splash: function (diff, frames, step) {
			return diff * (4 * Math.pow(step/frames, 2) - 3 * Math.pow(step/frames, 3.2));
		},
		'return': function () {
			return diff * (2 * Math.pow(step/frames, 2) - 2 * Math.pow(step/frames, 8));
		},
		gradient: function (from, to, frames, step, easing) {
			// color specifically
			from = u.color(from); to = u.color(to);
			for (var i = 0, value = []; i < 3; i++)
			if (easing == 'linear')
				value.push(from[i] + Math.round((to[i] - from[i]) / frames * step));
			else
			if (easing == 'return')
				value.push(from[i] + Math.round((to[i] - from[i]) * (2 * Math.pow(step/frames, 2) - 2 * Math.pow(step/frames, 3))));

			return 'rgb(' + value.join() + ')';
		}
	},

	__value: function (el, prop) {
		return (
			// scroll values
			!prop.indexOf('scroll')?
				el[prop] :
			// color values
			/color/.test(prop)?
				u(el).css(prop) :
			// other values
			parseFloat(u(el).css(prop)) || el[u.camelCase('offset-'+prop)] || 0
		);
	},

	play: function () {

	},
	pause: function () {

	},
	stop: function () {

	},
	finish: function () {

	},
	destroy: function () {

	}
});

/*******************
 * static utilities
 *******************/
u.extend = function (obj, data) {
//>> extends some object
	for (var key in data) if (data.hasOwnProperty(key))
		obj[key] = data[key];
	return obj;
};

u.trim = function (str) {
//>> removes trailing spaces from strings
	return (''+str || '').replace(/^\s+|\s+$/g, '');
};

u.clean = function (str) {
//>> removes consecutive and trailing spaces on strings
	if (typeof str == 'string')
		return u.trim(str).replace(/\s{2,}/g, ' ');
	else {
//>> removes repeated items from collections
		var array = [],
		    u = str.__utm;

		for (var i = 0, l = str.length; i < l; i++)
			if (u.index(array, str[i]) < 0)
				array.push(str[i]);

		return u? u(array) : array;
	}
};

u.index = function (col, item) {
//>> universal indexOf
	if (col.indexOf)
		return col.indexOf(item);

	for (var i = 0, l = col.length; i < l; i++)
		if (col[i] === item)
			return i;
	return -1;
};

u.shuffle = function (col) {
//>> shuffles a collection of items
	var u = col.__utm;

	!(col instanceof Array) && (col = u.array(col));

	// protect the array from being overwritten and shuffle it
	col = col.slice().sort(function () { return .5 - Math.random() });

	return u? u(col) : col;
};

u.array = function () {
//>> turns indexable objects into one array
	var array = [];
	for (var i = -1; arguments[++i];) {
		if (arguments[i] instanceof Array)
			Array.prototype.push.apply(array, arguments[i]);
		else
			array.concat(Array.prototype.slice.call(arguments[i]));
	}
	return array;
};

u.camelCase = function (str) {
//>> sets a name into camel case
	return str.replace(/\W([a-z])/g, function (s, m) {
		return m.toUpperCase();
	});
};

u.mult = function (str, n) {
//>> repeats a string n times
	return new Array(n + 1).join(str);
};

u.percent = function (total, part) {
//>> calculates a percentage
	return part * 100 / total;
};

u.average = function () {
	var sum = 0; for (var i = -1; arguments[++i];)
		sum += arguments[i];
	return sum / arguments.length ;
};

u.now = function () {
//>> returns a timestamp
	return +new Date;
};

// some useful information of what we're dealing with
u.support = {
	ie: window.attachEvent && !window.opera,
	opera: window.opera
};

// some specific attributes that need some attention
u.fix = {
	'cellspacing': 'cellSpacing',
	'class': u.support.ie? 'className' : 'class',
	'for': 'htmlFor',
	'float': u.support.ie? 'styleFloat' : 'cssFloat',
	'maxlength': 'maxLength',
	'readonly': 'readOnly',
	'rowspan': 'rowSpan'
};

u.attrName = function (str) {
	return u.camelCase(u.fix[str] || str);
};

u.error = function (msg) {
	throw new Error('utm: ' + msg);
};

/**********************************************************
 ############ Sizzle CSS Selector Engine - v1.0 ###########
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
*/
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
	done = 0,
	toString = Object.prototype.toString,
	arraySplice = Array.prototype.splice,
	arrayPush = Array.prototype.push,
	arraySort = Array.prototype.sort;

var Sizzle = function(selector, context, results, seed) {
	results = results || [];
	var origContext = context = context || document;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var parts = [], m, set, checkSet, check, mode, extra, prune = true, contextXML = isXML(context);

	// Reset the position of the chunker regexp (start from head)
	chunker.lastIndex = 0;

	while ( (m = chunker.exec(selector)) !== null ) {
		parts.push( m[1] );

		if ( m[2] ) {
			extra = RegExp.rightContext;
			break;
		}
	}

	if ( parts.length > 1 && origPOS.exec( selector ) ) {
		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );
		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] )
					selector += parts.shift();

				set = posProcess( selector, set );
			}
		}
	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
			var ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ? Sizzle.filter( ret.expr, ret.set )[0] : ret.set[0];
		}

		if ( context ) {
			var ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
			set = ret.expr ? Sizzle.filter( ret.expr, ret.set ) : ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray(set);
			} else {
				prune = false;
			}

			while ( parts.length ) {
				var cur = parts.pop(), pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}
		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		throw "Syntax error, unrecognized expression: " + (cur || selector);
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			arrayPush.apply( results, checkSet );
		} else if ( context && context.nodeType === 1 ) {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i])) ) {
					arrayPush.call( results, set[i] );
				}
			}
		} else {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					arrayPush.call( results, set[i] );
				}
			}
		}
	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function(results){
	if ( sortOrder ) {
		hasDuplicate = false;
		arraySort.call(results, sortOrder);

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[i-1] ) {
					arraySplice.call(results, i--, 1);
				}
			}
		}
	}
};

Sizzle.matches = function(expr, set){
	return Sizzle(expr, null, null, set);
};

Sizzle.find = function(expr, context, isXML){
	var set, match;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var type = Expr.order[i], match;

		if ( (match = Expr.match[ type ].exec( expr )) ) {
			var left = RegExp.leftContext;

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );
				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName("*");
	}

	return {set: set, expr: expr};
};

Sizzle.filter = function(expr, set, inplace, not){
	var old = expr, result = [], curLoop = set, match, anyFound,
		isXMLFilter = set && set[0] && isXML(set[0]);

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.match[ type ].exec( expr )) != null ) {
				var filter = Expr.filter[ type ], found, item;
				anyFound = false;

				if ( curLoop == result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;
					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;
								} else {
									curLoop[i] = false;
								}
							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr == old ) {
			if ( anyFound == null ) {
				throw "Syntax error, unrecognized expression: " + expr;
			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],
	match: {
		ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
	},
	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},
	attrHandle: {
		href: function(elem){
			return elem.getAttribute("href");
		}
	},
	relative: {
		"+": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag && !isXML ) {
				part = part.toUpperCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},
		">": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string";

			if ( isPartStr && !/\W/.test(part) ) {
				part = isXML ? part : part.toUpperCase();

				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName === part ? parent : false;
					}
				}
			} else {
				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},
		"": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( !part.match(/\W/) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
		},
		"~": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( typeof part === "string" && !part.match(/\W/) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
		}
	},
	find: {
		ID: function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? [m] : [];
			}
		},
		NAME: function(match, context, isXML){
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [], results = context.getElementsByName(match[1]);

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},
		TAG: function(match, context){
			return context.getElementsByTagName(match[1]);
		}
	},
	preFilter: {
		CLASS: function(match, curLoop, inplace, result, not, isXML){
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").indexOf(match) >= 0) ) {
						if ( !inplace )
							result.push( elem );
					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},
		ID: function(match){
			return match[1].replace(/\\/g, "");
		},
		TAG: function(match, curLoop){
			for ( var i = 0; curLoop[i] === false; i++ ){}
			return curLoop[i] && isXML(curLoop[i]) ? match[1] : match[1].toUpperCase();
		},
		CHILD: function(match){
			if ( match[1] == "nth" ) {
				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] == "even" && "2n" || match[2] == "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},
		ATTR: function(match, curLoop, inplace, result, not, isXML){
			var name = match[1].replace(/\\/g, "");

			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},
		PSEUDO: function(match, curLoop, inplace, result, not){
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( match[3].match(chunker).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);
				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
					if ( !inplace ) {
						result.push.apply( result, ret );
					}
					return false;
				}
			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}

			return match;
		},
		POS: function(match){
			match.unshift( true );
			return match;
		}
	},
	filters: {
		enabled: function(elem){
			return elem.disabled === false && elem.type !== "hidden";
		},
		disabled: function(elem){
			return elem.disabled === true;
		},
		checked: function(elem){
			return elem.checked === true;
		},
		selected: function(elem){
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			elem.parentNode.selectedIndex;
			return elem.selected === true;
		},
		parent: function(elem){
			return !!elem.firstChild;
		},
		empty: function(elem){
			return !elem.firstChild;
		},
		has: function(elem, i, match){
			return !!Sizzle( match[3], elem ).length;
		},
		header: function(elem){
			return /h\d/i.test( elem.nodeName );
		},
		text: function(elem){
			return "text" === elem.type;
		},
		radio: function(elem){
			return "radio" === elem.type;
		},
		checkbox: function(elem){
			return "checkbox" === elem.type;
		},
		file: function(elem){
			return "file" === elem.type;
		},
		password: function(elem){
			return "password" === elem.type;
		},
		submit: function(elem){
			return "submit" === elem.type;
		},
		image: function(elem){
			return "image" === elem.type;
		},
		reset: function(elem){
			return "reset" === elem.type;
		},
		button: function(elem){
			return "button" === elem.type || elem.nodeName.toUpperCase() === "BUTTON";
		},
		input: function(elem){
			return /input|select|textarea|button/i.test(elem.nodeName);
		}
	},
	setFilters: {
		first: function(elem, i){
			return i === 0;
		},
		last: function(elem, i, match, array){
			return i === array.length - 1;
		},
		even: function(elem, i){
			return i % 2 === 0;
		},
		odd: function(elem, i){
			return i % 2 === 1;
		},
		lt: function(elem, i, match){
			return i < match[3] - 0;
		},
		gt: function(elem, i, match){
			return i > match[3] - 0;
		},
		nth: function(elem, i, match){
			return match[3] - 0 == i;
		},
		eq: function(elem, i, match){
			return match[3] - 0 == i;
		}
	},
	filter: {
		PSEUDO: function(elem, match, i, array){
			var name = match[1], filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || "").indexOf(match[3]) >= 0;
			} else if ( name === "not" ) {
				var not = match[3];

				for ( var i = 0, l = not.length; i < l; i++ ) {
					if ( not[i] === elem ) {
						return false;
					}
				}

				return true;
			}
		},
		CHILD: function(elem, match){
			var type = match[1], node = elem;
			switch (type) {
				case 'only':
				case 'first':
					while (node = node.previousSibling)  {
						if ( node.nodeType === 1 ) return false;
					}
					if ( type == 'first') return true;
					node = elem;
				case 'last':
					while (node = node.nextSibling)  {
						if ( node.nodeType === 1 ) return false;
					}
					return true;
				case 'nth':
					var first = match[2], last = match[3];

					if ( first == 1 && last == 0 ) {
						return true;
					}

					var doneName = match[0],
						parent = elem.parentNode;

					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						}
						parent.sizcache = doneName;
					}

					var diff = elem.nodeIndex - last;
					if ( first == 0 ) {
						return diff == 0;
					} else {
						return ( diff % first == 0 && diff / first >= 0 );
					}
			}
		},
		ID: function(elem, match){
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},
		TAG: function(elem, match){
			return (match === "*" && elem.nodeType === 1) || elem.nodeName === match;
		},
		CLASS: function(elem, match){
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},
		ATTR: function(elem, match){
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value != check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},
		POS: function(elem, match, i, array){
			var name = match[2], filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS;

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + /(?![^\[]*\])(?![^\(]*\))/.source );
}

var makeArray = function(array, results) {
	array = Array.prototype.slice.call( array );

	if ( results ) {
		arrayPush.apply( results, array );
		return results;
	}

	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
try {
	Array.prototype.slice.call( document.documentElement.childNodes );

// Provide a fallback method if it does not work
} catch(e){
	makeArray = function(array, results) {
		var ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );
		} else {
			if ( typeof array.length === "number" ) {
				for ( var i = 0, l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}
			} else {
				for ( var i = 0; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( "sourceIndex" in document.documentElement ) {
	sortOrder = function( a, b ) {
		var ret = a.sourceIndex - b.sourceIndex;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( document.createRange ) {
	sortOrder = function( a, b ) {
		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.selectNode(a);
		aRange.collapse(true);
		bRange.selectNode(b);
		bRange.collapse(true);
		var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("form"),
		id = "script" + (new Date).getTime();
	form.innerHTML = "<input name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	var root = document.documentElement;
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( !!document.getElementById( id ) ) {
		Expr.find.ID = function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
			}
		};

		Expr.filter.ID = function(elem, match){
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function(match, context){
			var results = context.getElementsByTagName(match[1]);

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";
	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {
		Expr.attrHandle.href = function(elem){
			return elem.getAttribute("href", 2);
		};
	}
})();

if ( document.querySelectorAll ) (function(){
	var oldSizzle = Sizzle, div = document.createElement("div");
	div.innerHTML = "<p class='TEST'></p>";

	// Safari can't handle uppercase or unicode characters when
	// in quirks mode.
	if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
		return;
	}

	Sizzle = function(query, context, extra, seed){
		context = context || document;

		// Only use querySelectorAll on non-XML documents
		// (ID selectors don't work in non-HTML documents)
		if ( !seed && context.nodeType === 9 && !isXML(context) ) {
			try {
				return makeArray( context.querySelectorAll(query), extra );
			} catch(e){}
		}

		return oldSizzle(query, context, extra, seed);
	};

	for ( var prop in oldSizzle ) {
		Sizzle[ prop ] = oldSizzle[ prop ];
	}
})();

if ( document.getElementsByClassName && document.documentElement.getElementsByClassName ) (function(){
	var div = document.createElement("div");
	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	if ( div.getElementsByClassName("e").length === 0 )
		return;

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 )
		return;

	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function(match, context, isXML) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ){
				elem.sizcache = doneName;
				elem.sizset = i;
			}
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ) {
				elem.sizcache = doneName;
				elem.sizset = i;
			}
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}
					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

var contains = document.compareDocumentPosition ?  function(a, b){
	return a.compareDocumentPosition(b) & 16;
} : function(a, b){
	return a !== b && (a.contains ? a.contains(b) : true);
};

var isXML = function(elem){
	return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
		!!elem.ownerDocument && elem.ownerDocument.documentElement.nodeName !== "HTML";
};

var posProcess = function(selector, context){
	var tmpSet = [], later = "", match,
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE

u.grab = Sizzle;

})();

// utm shortcut
window.u = u;

})(utm);
