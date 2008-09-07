(function () {
/*
 * Ultimate JavaScript Library (utm)
 * development version, 0.1 pre alpha (not for use)
 * 
 * Copyright (c) 2008 E. Myller (emyller.net)
 * utm is licensed under the LGPL license.
 * 
 * Visit www.utmproject.org for more information.
 * 
 * Edition date: 2008/09/04 00:15:23 (GMT - 3)
 */

//>> the main utm namespace
var utm = window.u = window.utm = function (sel, context) {
	return new utm.start(sel, context);
};

// I think that something like 'yes' is more human-like than 'true', sometimes.
window.yes = true;
window.no = false;

utm.start = function (sel, context) {
//>> the main utm grabber
	sel = utm.isset(sel)? sel : document;
	
	// return the object itself if it's already 'grabbed'
	if (sel._utm) { return sel; }
	
	// returns the results of a css selector query
	if (typeof sel == 'string') {
		return utm.grab(sel, context);
		
	// handles an array
	} else if (sel.push || utm.isset(sel[0])) {
		this.length = 0;
		Array.prototype.push.apply(this, sel);
		return this;
		
	// or returns any other object inside a new utm instance
	} else {
		this[0] = sel;
		this.length = 1;
		return this;
	}
};

utm.ext = utm.extend = function () {
//>> extends any other object
	for (var i = 0; i < arguments.length; i++) if (i % 2) {
		for (var prop in arguments[i]) if (arguments[i].hasOwnProperty(prop)) {
			arguments[i - 1][prop] = arguments[i][prop];
		}
	}
	return arguments[0];
};

/*--------------------
>> Main static methods
-----------------------*/
utm.ext(utm, {
	// this running version
	version: .1,

	// alias to the utm object
	toString: function () { return 'UlTiMate JavaScript Library [version: ' + utm.version + ']'; },

	/*-------------------
	>> System information
	----------------------*/
	lang: (function () {
	//>> let me know what language we're in...
		return (navigator.language || navigator.userLanguage || 'en-us').toLowerCase();
	})(),

	path: (function () {
	//>> just finds where are the utm modules files
		var all = document.getElementsByTagName('script');
		for (var i = 0; i < all.length; i++) if (/utm\/|\/utm\.js/i.test(all[i].src)) {
			return all[i].src.slice(0, all[i].src.lastIndexOf('/') + 1);
		}
		return '';
	})(),

	isset: function (obj) {
	//>> (any) is the object undefined?
		return typeof obj != 'undefined';
	},

	trim: function (str) {
	//>> (string) removes trailing spaces
		return str.replace(/^\s*|\s*$/g, '');
	},

	clean: function (str) {
	//>> (string) removes unnecessary spaces
		return utm.trim(str).replace(/\s{2,}/g, ' ');
	},

	fileName: function (str) {
	//>> (string) extracts the filename from a path
		return str.slice(str.lastIndexOf('/') + 1);
	},

	filePath: function (str) {
	//>> (string) removes the filename from a path
		return str.slice(0, str.lastIndexOf('/') + 1);
	},

	array: function (obj, ut) {
	//>> (any) transforms any indexable object into an array
		// var arr = Array.prototype.slice.call(obj);
		var arr = [];
		for (var i = 0, l = obj.length; i < l; i++) {
			arr.push(obj[i]);
		}
		return ut? utm(arr) : arr;
	},
	
	camel: function (str) {
		//>> (string) 'camelize' a string (JS notation)
		return str.replace(/\W([a-z])/g, function (s, m) {
			return m.toUpperCase();
		});
	},

	mult: function (str, n) {
	//>> (string) multiplies a strng
		return (new Array(n + 1)).join(str);
	},

	nav: (function () {
	//>> sometimes we really need to know what browser we're include
		var ua = navigator.userAgent;
		return (/webkit/i).test(ua)? 'safari' :
		       (/opera/i).test(ua)?  'opera'  :
		       (/msie/i).test(ua)?   'ie'     :
		       (/mozilla/i).test(ua)?'moz'    : 'other';
	})(),
	
	key: function (key) {
	// escapes some specific keys
		return utm.camel(
			key == 'class'? 'className' :
			key == 'for'? 'htmlFor' :
			key == 'float'? (utm.nav == 'ie'? 'styleFloat' : 'cssFloat') :
		key);
	},

	css: function (sel, prop, value) {
	//>> gets/sets rules directly to stylesheets
		var found = false,
		    get = typeof prop == 'string' && !utm.isset(value),
		    styles = utm.array(document.styleSheets);
		
		if (typeof prop == 'string') {
		// if we receive a property and a value, as strings:
			var style = {}; style[prop] = value;
		} else { var style = prop; }
		
		// looks for the rule and gets/sets the property
		var l = styles.length; while (l--) {
			var rules = utm.array(styles[l].cssRules || styles[l].rules),
			    r = rules.length;
			while (r--) if (rules[r].selectorText == sel) {
				found = true;
				
				// getter
				if (get) { return rules[r].style[utm.key(prop)]; }
				
				// setter
				utm.ext(rules[r].style, utm(style).escapeKeys());
				
				return utm;
			}
		}
		
		// inserts a new rule, if necessary
		if (!found && !get) {
			if (utm.CSS.addRule) {
				utm.CSS.addRule(sel, '0:0', utm.CSS.rules.length);
			} else {
				utm.CSS.insertRule(sel + ' {}', utm.CSS.cssRules.length);
			}
			return utm.css(sel, style);
		}
	},

	/*-----------------
	>> Handling modules
	--------------------*/
	include: function () {
	//>> includes an utm module (just evaluates a script)
		for (var i = 0, l = arguments.length; i < l; i++) {
			arguments[i] = utm.fileName(arguments[i]);
			// tries to find the module source
			try {
				var exe = utm.file(utm.path + 'mod.' + arguments[i] + '.js');
			} catch (e) { try {
				var exe = utm.file(utm.path + 'utm.' + arguments[i] + '.js');
			} catch (e) { try {
				var exe = utm.file(utm.path + arguments[i] + '.js');
			} catch (e) {
				throw 'utm: module not found';
			}}}
			// module found, execute it
			var script = utm.create('script', {type: 'text/javascript'});
			utm.nav == 'ie' ?
				script[0].text = exe.text :
				script.text(exe.text);
			utm('body').append(script);
			script.remove();
		}
		return utm;
	},

	module: function (info, deps, core, toNodes) {
	//>> utm plugins container
		if (info.constructor == String) {
		// gets a plugin information
			return utm.module[name] || null;
		} else {
		// adds a new plugin
			utm.module[info.name] = info;
			utm(deps).each(function (dep) {
			// adds the necessary dependencies
				if (!utm.module[dep]) { utm.include(dep); }
			});
			utm.ext(
				utm, core,
				utm.nodeMethods, toNodes
			);
			return utm;
		}
	}
});
/*--------------------------------
>> XMLHttpRequest (Ajax) utilities
-----------------------------------*/
utm.ext(utm, {
	XHR: function () {
	//>> initializes a new XHR object
		try {
			xhr = new XMLHttpRequest;
		} catch(e) { try {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
			return false;
		}}
		return xhr;
	},

	Request: function (url, o) {
	// performs a new xhr
		var xhr = new utm.XHR;
		if (xhr) {
			o = utm.ext({
				method: 'GET',
				async: true,
				success: function () {},
				failure: function () {},
				finish: function () {},
				cache: false
			}, o || {});
			xhr.open(o.method, url, o.async);
			
			if (!o.cache) {
			// disables cache
				xhr.setRequestHeader('If-Modified-Since', 'Wed, 01 Jan 1997 00:00:00 GMT');
			}
			
			xhr.send(o.args || null);
			if (o.async) {
			// synchronous requests
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) { utm.handleRequest(xhr, o); }
				};
			} else {
			// asynchronous requests
				utm.handleRequest(xhr, o);
			}
			return xhr;
		} else {
			throw 'utm: failed to initialize the XHR engine';
		}
	},

	handleRequest: function (xhr, o) {
	//>> simply handles the request
		if (xhr.status == 200 || xhr.status == 304) { o.success(xhr); }
		else { o.failure(xhr); }
		o.finish(xhr);
	},

	get: function (url, options) {
	//>> shortcut to GET requests
		return new utm.Request(url,
			typeof options == 'boolean'? { async: options } :
			typeof options == 'function'? { finish: function (xhr) { options(xhr.responseText); } } :
			options);
	},

	file: function (url) {
	//>> loads and provide data about a file
		var req = utm.get(url, {
			async: false,
			failure: function () {
				throw 'utm: unable to open file';
			}
		});
		return {
			size: req.responseText.length,
			text: req.responseText,
			xml: req.responseXML
		};
	}
});
/*-----------------
>> Number utilities
--------------------*/
utm.ext(utm, {
	percent: function (num, t) {
	//>> returns a percentage
		return num / 100 * t;
	}
});
/*----------------
>> DOM Manipulator
-------------------*/
utm.ext(utm, {
	selectors: {
	// the css selector engine
		0: /^([#\.]?)([\w-]+|\*)$/, // simple selector
		1: / *, */, // commas
		2: / *> */, // child combinator
		3: /[ >]+|(?:[#\.]?[\w-]+|\*)|:[\w-]+\(.*\)|\[.+\]/g, // multi-type
		4: /.*\[\]/g, // attributes
		
		// selectors
		'#': function (s, c) {
		//>> get by id
			if (c.getElementById) { var el = c.getElementById(s); return el? [el] : []; }
			for (var all = utm('*', c), els = [], i = 0, l = all.length; i < l; i++) {
				if (all[i].id == s) { els.push(all[i]); }
			}
			return els;
		},
		'.': function (s, c) {
		//>> get by class
			for (var all = utm('*', c), els = [], i = 0, l = all.length; i < l; i++) {
				if ((' ' + all[i].className + ' ').indexOf(' ' + s + ' ') >= 0) { els.push(all[i]); }
			}
			return els;
		},
		'': function (s, c) {
		//>> get by tag name
			s = s || '*';
			// if there's something on the context cache, get it from there.
			// it will boost up a lot the grabbing performance
			if (c._utmCache && c._utmCache[s]) {
				return utm.array(c._utmCache[s]);
			}
			
			// first selection
			if (!c._utmCache) { c._utmCache = {}; }
			c._utmCache[s] = c.getElementsByTagName(s);
			return utm.array(c._utmCache[s]);
		},
		',': function (s, c) {
		//>> get various selectors
			for (var els = [], i = 0, l = s.length; i < l; i++) {
				els = els.concat(utm.array(utm(s[i])));
			}
			return utm(els).clean();
		},
		' ': function (ss, c) {
		//>> get descendants
			var l = ss.length; while (l--) { ss[l] = ss[l].join(''); }
			var _els = els = utm(ss[0], c);
			for (s = 1, sl = ss.length; s < sl; s++) {
				els = [];
				for (var i = 0, l = _els.length; i < l; i++) {
					els = els.concat(utm.array(utm(ss[s], _els[i])));
				}
				_els = els;
			}
			return utm(els).clean();
		},
		'>': function (ss, c) {
		//>> get by children
			var _els = utm(ss[0], c); els = [];
			for (var s = 1, sl = ss.length; s < sl; s++) {
				els = [];
				for (var i = 0, l = _els.length; i < l; i++) {
					els = els.concat(utm(_els[i]).children(ss[s], false));
				}
				_els = els;
			}
			return _els;
		},
		'*': function (ss, c) {
		//>> get by multiple selectors
			for (var els, s = 0, l = ss.length; s < l; s++) if (ss[s + 1]) {
				els = (els || utm(ss[s], c)).intersect(utm(ss[s + 1]));
			}
			return els;
		},
		'@': function (ss, c) {
		//>> get by matching attribute
			alert(ss.join(' - '))
		},
		':': function (ss, c) {
		//>> get by pseudo-classes
			// writing now
		}
	},

	grab: function (sel, context) {
	//>> grabs nodes by css selectors
		
		// only proceed if we have a string.
		if (typeof sel != 'string') { return sel; }
		
		// do we really have a selector?
		if (!sel.length) { return utm(); }
		
		// removes unnecessary whitespaces
		if (sel.indexOf(' ') >= 0) { sel = utm.clean(sel); }
		
		// shortcut to regexps
		var s = utm.selectors;
		
		// sets a default context
		context = context? utm(context)[0] : document;
		
		// handles simple selectors
		//>> utm('#id'); utm('.class'); utm('tag');
		var simple = s[0].exec(sel); if (simple) {
			return utm(s[simple[1]](simple[2], context));
		}
		
		// handles multiples selectors
		//>> utm('p, a:link, strong');
		if (sel.indexOf(',') >= 0) {
			return utm(s[','](sel.split(s[1]), context));
		}
		/* complex selectors */
		// division of selectors
		var a = sel.match(s[3]);
		
		// handles descendant selectors
		//>> utm('ul.list em');
		if (a && utm(a).index(' ') >= 0) {
			return utm(s[' '](utm(a).split(' '), context));
		}
		
		// handles parent > child selectors
		//>> utm('html > body > ul > li');
		if (sel.indexOf('>') >= 0) {
			return utm(s['>'](sel.split(s[2]), context));
		}
		
		// handles multi-type selectors
		//>> utm('div#item.text:has(some):odd');
		if (a && a.length > 1) {
			return utm(s['*'](a, context));
		}
		
		// handles complex selectors
		if (sel.indexOf('[') >= 0) {
			return utm(s['@'](a, context));
		}
		
		
		throw 'utm: invalid selector';
	},

	create: function (name, text, attrs) {
	//>> creates a new html element
		// if we get a node
		if (name.nodeType || name[0] && name[0].nodeType) { return utm(name); }
		
		// handles the name
		name = name.match(utm.selectors[3]);
		
		var el = utm(document.createElement(name[0]));
		
		// adds other properties
		for (var i = 1, data; name[i]; i++) {
			data = name[i].match(utm.selectors[0]);
			data[1] == '.'? el.addClass(data[2]) :
			data[1] == '#'? el.attr('id', data[2]) :
			false;
		}
		
		// we must have the right attrs container
		if (text && text.constructor == Object) {
			attrs = text; text = '';
		}
		// make sure that we have a text
		text = text && text.constructor != Object? text.toString() : '';
		
		// set the attrs and text
		el.attr(attrs || {});
		
		// inserts the text
		if (text) { el.text(text); }
		
		return el;
	},

	append: function (tag, text, attrs) {
	// appends an element to the <body>
		return utm('body').append(tag, text, attrs);
	}
});
/*------------------
>> Graphic utilities
---------------------*/
utm.ext(utm, {
	size: function (el, scrolls) {
	//>> gets the size of an element or of the viewport
		// alternate between el|scrolls
		if (el && typeof el == 'boolean') { scrolls = el; el = 'html'; }
		// sets the default to the main element
		if (!el) { el = 'html'; }
		// gets the sizes
		return {
			width: utm(el)[0][(scrolls? 'scroll': 'client') + 'Width'] || utm(el)[0].offsetWidth,
			height: utm(el)[0][(scrolls? 'scroll': 'client') + 'Height'] || utm(el)[0].offsetHeight
		};
	},
	
	pos: function (el, where, scrolls) {
	//>> gets the position of an element relative to the viewport
	//>> or apply a preset position to an element
		el = utm(el)[0];
		if (!where) {
		// getting the position
			var pos = { top: 0, bottom: 0 };
			while (el.offsetParent) {
				// adds values to the new offset
				pos.top += el.offsetLeft;
				pos.bottom += el.offsetTop;
				// goes up to the parent offset
				el = el.offsetParent;
			}
			return pos;
		} else {
		// setting a preset position
			where = where.split(' ');
			if (where.length < 2) { where[1] = where[0]; }
			var size = utm.size(), _size = utm.size(el, true);
			return utm(el).css({
				top: '', left: '', // reset the actual positions
				top:  (where[0] == 'bottom'? size.height - _size.height :
				       where[0] == 'center'? size.height/2 - _size.height/2 :
				      (Math.floor(where[0])? Math.floor(where[0]) : 0))
				       + (scrolls? (el.parentNode || el.ownerDocument.documentElement).scrollTop : 0),
				left: (where[1] == 'right'? size.width - _size.width :
				       where[1] == 'center'? size.width/2 - _size.width/2 :
				      (Math.floor(where[1])? Math.floor(where[1]) : 0))
				       + (scrolls? (el.parentNode || el.ownerDocument.documentElement).scrollLeft : 0),
			});
		}
	},

	opacity: function (els, op) {
	//>> gets/sets opacity from an element
		// set
		if (utm.isset(op)) return utm(els).each(function (el) {
			// some special attention to MSIE, again
			utm.nav == 'ie'?
				el.filter = 'alpha(opacity=' + op + ')' :
			// for all other browsers
				el.style.opacity = op / 100;
		
		// get
		}); else {
			var el = utm(els)[0];
			return utm.nav == 'ie'?
				el.filter && el.filter.indexOf('opacity=') >= 0?
					Math.ceil(el.filter.match(/opacity=(\d+)/)[1]) :
					100 :
				parseFloat(el.ownerDocument.defaultView.getComputedStyle(el, null).opacity) * 100;
		}
	}
});
/*---------------------
>> Basic visual effects
------------------------*/
utm.ext(utm, {
	efSpeed: function (s) {
	//>> calculates the speed from a value
		return (s == 'slower'? 25  : 
		        s == 'slow'?   50 :
		        s == 'fast'?   120 :
		        s == 'faster'? 200:
		        s == 'ultra'?  300:
		        (typeof s != 'number')? 100 :
		        s <= 0? 1 : s >= 400? 400 : s) / 100;
	},

	anim: function (els, prop, opt, speed) {
	//>> smoothly modifies the style of an element
		if (typeof opt == 'number') { opt = { end: opt }; }
		else if (typeof opt == 'function') { opt = { finish: opt }; }
		if (utm.isset(speed)) { opt.speed = speed; }
		return utm(els).each(function (el) {
			el = utm(el);
			opt.begin = utm.isset(opt.begin)? opt.begin : el.css(prop);
			if (typeof parseFloat(opt.begin) == 'number') { opt.begin = parseFloat(opt.begin); }
			var step = (opt.end - opt.begin) / 100,
			    framerate = 10 / utm.efSpeed(opt.speed);
			for (var steps = [], i = 0; i <= 100; i += 2) (function () {
				var s = i;
				steps.push(setTimeout(function () {
					el.css(prop, Math.ceil(opt.begin + s * step));
					// executes callback
					if (s == 100 && opt.finish) { opt.finish(el); }
				}, framerate * s));
			})();
		});
	}
});

/*----------------------
>> Direct access methods
-------------------------*/
utm.methods = utm.prototype = {
	_utm: true,

	/*----------------
	>> Array utilities
	-------------------*/
	each: function (fn) {
	//>> executes 'fn' for each item
		// for collections
		for (var i = 0, l = this.length; i < l; i++) {
			fn(this[i]);
		}
		return this;
	},
	index: function (item) {
	//>> returns the position of an item
		for (var i = 0, l = this.length; i < l; i++) if (this[i] === item) {
			return i;
		}
		return -1;
	},
	clean: function () {
	//>> removes duplicated items
		for (var c = utm([]), i = 0, l = this.length; i < l; i++) if (c.index(this[i]) < 0) {
			c.push(this[i]);
		};
		return utm.array(c);
	},
	intersect: function (arr) {
	//>> intersects to another array
		for (var i = 0, _arr = [], length = arr.length; i < length; i++)
		if (this.index(arr[i]) >= 0) {
			_arr.push(arr[i]);
		}
		return _arr;
	},
	push: function () {
	//>> puts items into an utm object
		for (var i = 0, l = arguments.length; i < l; i++) {
			this[this.length] = arguments[i]; this.length++;
		}
	},
	split: function (key) {
	//>> splits in more arrays
		var arr = [[]], pos = 0;
		for (var i = 0, l = this.length; i < l; i++) {
			if (this[i] != key) { arr[pos].push(this[i]); }
			else { pos++; arr[pos] = []; }
		}
		return arr;
	},

	/*-----------------
	>> Object utilities
	--------------------*/
	ext: function () {
	//>> merge objects to this
		var obj = this[0];
		for (var i = 0, l = arguments.length; i < l; i++) {
			utm.ext(obj, arguments[i]);
		}
		return this;
	},
	escapeKeys: function () {
	//>> escapes the keys (camel case + specific keys)
		var obj = {};
		for (var key in this[0]) { obj[utm.key(key)] = this[0][key]; }
		return obj;
	},


	/*------------------------------------------------------
	>> DOM Elements custom methods (can be extended anytime)
	---------------------------------------------------------*/
	filter: function (filter) {
	//>> filters a collection of nodes
		
	},

	addClass: function (cl) { return this.each(function (el) {
	//>> adds a class
		utm(cl.split(/\s+/)).each(function (c) {
			if ((' ' + el.className + ' ').indexOf(' ' + cl + ' ') < 0) {
				el.className = utm.trim(el.className) + ' ' + c;
			}
		});
	}); },

	isInput: function () {
	//>> is it an input?
		return (/^(?:input|select|textarea)$/i).test(this[0].nodeName);
	},

	is: function (sel) {
	//>> checks if the element has a characteristic
		return utm(sel).index(this[0]) >= 0;
	},

	grab: function (sel) {
	//>> grabs elements from another one
		return utm(sel, this);
	},

	children: function (filter, ut) {
	//>> the colletion of html nodes
		if (filter) { filter = utm(filter); }
		if (!utm.isset(ut)) { ut = true; }
		for (var els = [], i = 0, children = this[0].childNodes, l = children.length; i < l; i++)
		if (children[i].nodeType == 1 && (filter? filter.index(children[i]) >=0 : true)) {
			els.push(children[i]);
		}
		return ut? utm(els) : els;
	},

	nav: function (where, crit) {
	//>> finds an element at certain position
		var el = this[0], n = 0; do { try {
			el =
				where == 'first'? (el.parentNode == this[0]? el.nextSibling : el.firstChild) :
				where == 'last'? (el.parentNode == this[0]? el.previousSibling : el.lastChild) :
				where == 'prev'? el.previousSibling :
				where == 'next'? el.nextSibling :
				where == 'parent'? el.parentNode :
				null;
			if (el.nodeType != 3) { n++; }
			} catch (e) { el = null; }
		} while (el &&
			(crit? (typeof crit == 'number'?
				n < crit : !utm(el).is(crit)) : el.nodeType != 1));
		return utm (el || []);
	},

	// some shortcuts to {utm}.nav()
	prev: function (crit) { return this.nav('prev', crit); },
	next: function (crit) { return this.nav('next', crit); },
	first: function (crit) { return this.nav('first', crit); },
	last: function (crit) { return this.nav('last', crit); },
	parent: function (crit) { return this.nav('parent', crit); },

	prepend: function (tag, text, attrs) {
	//>> prepends a new child
		return this.first().before(tag, text, attrs);
	},

	append: function (tag, text, attrs) { 
	//>> appends a new child
		return utm(this[0].appendChild(utm.create(tag, text, attrs)[0]));
	},

	add: function (tag, text, attrs) {
	//>> appends a new child and returns the parent
		return this.append(tag, text, attrs).parent();
	},

	before: function (tag, text, attrs) {
	//>> adds a new element before
		return utm(this.parent()[0].insertBefore(utm.create(tag, text, attrs)[0], this[0]));
	},

	after: function (tag, text, attrs) {
	//>> adds a new element after
		return utm(this.parent()[0].insertBefore(utm.create(tag, text, attrs)[0], this.next()[0]));
	},

	remove: function () { return this.each(function (el) {
	//>> removes a child
		utm(el).parent()[0].removeChild(el);
	}); },

	empty: function () { return this.each(function (el) {
	//>> removes every child
		el.value = '';
		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}
	}); },

	text: function (t, add) {
	//>> gets/sets a text
		if (!utm.isset(t)) {
		// getter
			// or get all the text from all the children
			t = ''; utm(utm.array(this[0].childNodes)).each(function (node) {
				t += node.nodeType == 3? node.nodeValue : utm(node).text();
			});
			return t;
		} else {
		// setter
			this.each(function (el) {
				// clear the element
				if (!add) { utm(el).empty(); }
				
				// or adds a new text node
				el.appendChild((el.ownerDocument || document).createTextNode(t));
			});
			return this;
		}
	},

	attr: function (prop, value, css) {
	//>> gets/sets a property
		var attrs;
		if (typeof prop == 'string') {
			prop = utm.trim(prop);
			if (!utm.isset(value) && prop.indexOf(':') < 0) {
			// getter
				prop = utm.key(prop);
				if (prop == 'opacity') { return this.opacity(); }
				return css?
				// css value
					// try to get from the .style
					this[0].style[prop] ||
					// or from the computed style
					(this[0].currentStyle? this[0].currentStyle[prop] : // IE
					document.defaultView.getComputedStyle(this[0], null)[prop]) || // normal
					null :
					this[0].getAttribute(prop) || this[0][prop];
			// if we have a key and a value
			} else {
				attrs = {};
				if (prop.indexOf(':') > 0) {
					var d = prop.match(/^ *([\w-]+) *: *(.+)$/);
					attrs[d[1]] = d[2];
				} else { attrs[prop] = value; }
			}
		}
		
		return this.each(function (el) {
		// setter
			var _attrs = attrs || prop; attrs = {};
			for (var key in _attrs) {
				// adds 'px' to css numbers, if there's not a type
				if (typeof _attrs[key] == 'number' && key != 'opacity') { _attrs[key] = _attrs[key] + 'px'; }
				// handles opacity
				if (key == 'opacity') { utm.opacity(el, _attrs[key]); _attrs[key] = undefined; }
				// escapes the keys and prepare the object
				attrs[utm.key(key)] = _attrs[key];
			}
			utm.ext(css? el.style : el, attrs);
		});
	},

	css: function (prop, value) {
	//>> gets/sets a style value
		return this.attr(prop, value, true);
	},

	toggle: function (ef) {
	//>> toggles the visibility
		
	},
	
	// shortcuts to ajax
	get: function (url, add) {
	//>> loads a text and insert it into elements
		var els = this;
		utm.get(url, { success: function (xhr) {
			els.each(function (el) { utm(el).text(xhr.responseText, add); });
		}});
	},
	
	// events
	bind: function (type, fn) {
	//>> adds an event listener
		this.each(function (el) {
			// we must have an event collector
			el.events = el.events || {};
			// and also a sub-collector to that type of event
			el.events[type] = el.events[type] || [];
			
			// now, i'll just add the handler
			if (utm(el.events[type]).index(fn) < 0) { el.events[type].push(fn); }
			
			// and get it ready for user
			el['on' + type] = function (e) {
				for (var i = 0; i < this.events[type].length; i++) {
					// i'll store the handler directly into the element,
					// so we can use 'this' from the handler properly.
					this._utmTmpEventHandler = this.events[type][i];
					// make the event standard also for non DOM compliant browsers
					if (!e) { e = window.event; utm.ext(e, {
						charCode: e.type == 'keypress' ? e.keycode : 0,
						eventPhase: 2,
						isChar: e.keycode > 0,
						pageX: e.clientX + utm('body')[0].scrollLeft,
						pageY: e.clientY + utm('body')[0].scrollTop,
						target: e.srcElement,
						relatedTarget: e.toElement,
						timeStamp: (new Date).getTime(),
						preventDefault: function () { this.returnValue = false; },
						stopPropagation: function () { this.cancelBubble = true; }
					}); }
					// fires the event
					this._utmTmpEventHandler(e);
					// and then, delete the temp method
					this._utmTmpEventHandler = undefined;
				}
			};
		});
		return this;
	},

	unbind: function (type, fn) {
	//>> removes an event listener
		this.each(function (el) {
			// check if there's that handler
			if (el.events && el.events[type]) {
				var i = utm(el.events[type]).index(fn);
				// and removes it.
				if (i >= 0) { el.events[type].splice(i, 1); }
			}
		});
		return this;
	},

	fire: function (type) {
	//>> fires one type of event
		// TODO
	},

	// some shortcuts to events
	// mouse events
	click: function (f) { return this.bind('click', f) },
	hover: function (f) { return this.bind('mouseover', f) },
	mouseover: function (f) { return this.bind('mouseover', f) },
	mouseout: function (f) { return this.bind('mouseout', f) },
	mousemove: function (f) { return this.bind('mousemove', f) },
	mousedown: function (f) { return this.bind('mousedown', f) },
	mouseup: function (f) { return this.bind('mouseup', f) },
	// keyboard events
	keypress: function (f) { return this.bind('keypress', f) },
	keydown: function (f) { return this.bind('keydown', f) },
	keyup: function (f) { return this.bind('keyup', f) },
	// ui events
	focus: function (f) { return this.bind('focus', f) },
	blur: function (f) { return this.bind('blur', f) },
	
	/* Graphic utilities - shortcuts */
	opacity: function (op) { return utm.opacity(this, op); },
	
	/* Basic visual effects - shortcuts */
	anim: function (prop, options, speed) { return utm.anim(this, prop, options, speed); },
	fade: function (to, opt) {
	//>> fades an element
		opt = opt || {};
		if (typeof opt == 'function') { opt = { finish: opt }; }
		opt.end = to;
		return this.anim('opacity', opt);
	},
	fadeIn: function (opt) {
	//>> fades in any element
		// sets the opacity to 0 if it's 100
		return this.each(function (el) {
			if (utm.opacity(el) == 100) { utm.opacity(el, 0); }
		}).fade(100, opt);
	},
	fadeOut: function (opt) {
	//>> fades out any element
		return this.fade(0, opt);
	}
};

// gives all the utm methods to later grabbing
utm.start.prototype = utm.methods;

// utm cascading style sheets
if (document.styleSheets) {
	utm('head,html').add('style');
	utm.CSS = document.styleSheets[document.styleSheets.length - 1];
}

})();
