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
 * Edition date: 2008/09/17 01:40:36 (GMT - 3)
 */

//>> the main utm namespace
var utm = window.u = window.utm = function (sel, context, noutm) {
	return new utm.start(sel, context, noutm);
};

// I think that something like 'yes' is more human-like than 'true', sometimes.
window.yes = true;
window.no = false;

utm.start = function (sel, context, noutm) {
//>> the main utm grabber
	sel = utm.isset(sel)? sel : document;
	
	// return the object itself if it's already 'grabbed'
	if (sel._utm) { return sel; }
	
	// returns the results of a css selector query
	if (typeof sel == 'string') {
		return utm.grab(sel, context, noutm);
		
	// handles an array
	} else if (sel.constructor == Array) {
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
	//>> let me know what language we're in...
	lang: (navigator.language || navigator.userLanguage || 'en-us').toLowerCase(),

	isset: function (obj) {
	//>> (any) is the object undefined?
		return obj !== undefined;
	},

	trim: function (str) {
	//>> (string) removes trailing spaces
		str = str.replace(/^\s+/, '');
		var ws = /\s/, s = str.length;
		while (ws.test(str.charAt(--s)));
		return str.slice(0, s + 1);
	},

	clean: function (str) {
	//>> (array,string) removes unnecessary spaces / repeated items
		// cleans a string
		if (typeof str == 'string') {
			return utm.trim(str).replace(/\s{2,}/g, ' ');
		
		// cleans a collection
		} else {
			for (var a = 0, al = arguments.length, arr = []; a < al; a++)
			if (typeof arguments[a] != 'boolean') {
				for (var i = 0, l = arguments[a].length; i < l; i++)
				if (utm.index(arr, arguments[a][i]) < 0) {
					arr.push(arguments[a][i]);
				}
			} else if (arguments[a]) { return utm(arr); }
			return arr;
		}
	},

	array: function (obj, ut) {
	//>> (any) transforms any indexable object into an array
		for (var arr = [], i = 0, l = obj.length; i < l; i++) {
			arr.push(obj[i]);
		}
		return ut? utm(arr) : arr;
	},

	index: function (arr, item) {
	//>> returns the position of an item
		for (var i = 0, l = arr.length; i < l; i++) if (arr[i] === item) {
			return i;
		}
		return -1;
	},

	intersect: function () {
	//>> (array) intersect one array with another one
		for (var a = 0, al = arguments.length, arr; a < al; a++)
		if (typeof arguments[a] != 'boolean') {
			var i = arguments[a].length, _arr = []; while (i--)
			if (!arr || utm.index(arr, arguments[a][i]) >= 0) {
				_arr.push(arguments[a][i]);
			}
			arr = _arr;
		} else if (arguments[a]) { return utm(arr); }
		return arr;
	},

	split: function (arr, key) {
	//>> splits an array
		for (var _arr = [[]], pos = 0, i = 0, l = arr.length; i < l; i++) {
			if (arr[i] != key) { _arr[pos].push(arr[i]); }
			else { _arr[++pos] = []; }
		}
		return _arr;
	},

	camel: function (str) {
	//>> (string) 'camelize' a string (JS notation)
		return str.replace(/\W([a-z])/g, function (s, m) {
			return m.toUpperCase();
		});
	},

	mult: function (str, n) {
	//>> (string) multiplies a string
		return (new Array(n + 1)).join(str);
	},

	nav: (function () {
	//>> sometimes we really need to know what browser we're include
	// TEMPORARY CODE, it'll be rewritten
		var ua = navigator.userAgent;
		return (/webkit/i).test(ua)? 'webkit' :
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
	path: (function () {
	//>> just finds where are the utm modules files
		var all = document.getElementsByTagName('script');
		for (var i = 0; i < all.length; i++) if (all[i].src.indexOf('utm') >= 0) {
			return all[i].src.slice(0, all[i].src.lastIndexOf('/') + 1);
		}
		return '';
	})(),

	fileName: function (str) {
	//>> (string) extracts the filename from a path
		return str.slice(str.lastIndexOf('/') + 1);
	},

	filePath: function (str) {
	//>> (string) removes the filename from a path
		return str.slice(0, str.lastIndexOf('/') + 1);
	},

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
				utm.methods, toNodes
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

	Request: function (url, opt) {
	// performs a new xhr
		var xhr = new utm.XHR;
		if (xhr) {
			var opt = utm.ext({
				async: true,
				cache: false,
				failure: function () {},
				finish: function () {},
				method: 'GET',
				params: '',
				success: function () {}
			}, opt || {});
			
			opt.method = opt.method.toUpperCase();
			
			xhr.open(opt.method, url + (opt.params && opt.method == 'GET'? '?' + opt.params : ''), opt.async);
			
			if (!opt.cache) {
			// disables cache
				xhr.setRequestHeader('If-Modified-Since', 'Wed, 01 Jan 1997 00:00:00 GMT');
			}
			if (opt.method == 'POST') {
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			}
			xhr.send(opt.method == 'POST'? opt.params : null);
			
			if (opt.async) {
			// asynchronous requests
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) { utm.handleRequest(xhr, opt); }
				};
			} else {
			// synchronous requests
				utm.handleRequest(xhr, opt);
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
		var opt = typeof options == 'boolean'? { async: options } :
		          typeof options == 'function'? { finish: function (xhr) { options(xhr.responseText); } } :
		          options;
		opt.method = 'GET';
		return new utm.Request(url, opt);
	},

	post: function (url, args, opt) {
	//>> shortcut to POST requests
		var options = typeof opt == 'boolean'? { async: opt } :
		          typeof opt == 'function'? { finish: function (xhr) { opt(xhr.responseText); } } :
		          opt || {};
		// handles objects as args
		if (args.constructor == Object) {
			var _args = []; for (var key in args) {
				_args.push(key + '=' + args[key]);
			}
			args = _args.join('&');
		}
		options.params = args;
		options.method = 'POST';
		return new utm.Request(url, options);
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
			modified: req.getResponseHeader('Last-Modified'),
			name: utm.fileName(url),
			path: utm.filePath(url),
			size: req.responseText.length,
			text: req.responseText,
			type: req.getResponseHeader('Content-Type'),
			xml: req.responseXML
		};
	}
});
/*-----------------
>> Number utilities
--------------------*/
utm.ext(utm, {
	percent: function (num, t) {
	//>> calculates percentage
		return num / 100 * t;
	}
});
/*----------------
>> DOM Manipulator
-------------------*/
utm.ext(utm, {
	selectors: {
	// the css 3 selector engine
		0: /^([#\.]?)([\w-]+|\*)$/, // simple selector
		1: / *, */, // commas
		2: / *> */, // child combinator
		3: /[ >]+|(?:[#\.]?[\w-]+|\*)|:[\w-]+(?:\([^\)]*\))?|\[[^\]]+\]/g, // multi-type
		4: /^\[ *@?([\w-]+)(?: *([!~^$*\|=]{1,2}) *["']?([^"'\]]+)["']?)? *\]$/, // attributes
		5: /^:([\w-]+)(?:\( *(["'])?([^"'\)]+)\2? *\))?$/, // pseudo-classes
		6: /^(\w+|\*)$/, // just tag names
		
		// selectors
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
				els = els.concat(utm(s[i], c, true));
			}
			return utm.clean(els);
		},
		' ': function (ss, c) {
		//>> get descendants
			var l = ss.length; while (l--) { ss[l] = ss[l].join(''); }
			for (var _els = utm.grab(ss[0], c, true), s = 1; s < ss.length; s++) {
				for (var els = [], i = 0, l = _els.length; i < l; i++) {
					els = els.concat(utm.grab(ss[s], _els[i], true));
				}
				_els = els;
			}
			return utm.clean(els);
		},
		'>': function (ss, c) {
		//>> get by children
			for (els = utm(ss[0] || c, c, true), s = 1, sl = ss.length; s < sl; s++) {
				for (var _els = [], i = 0, l = els.length; i < l; i++) {
					_els = _els.concat(utm.intersect(utm(ss[s], els[i], true), els[i].childNodes));
				}
				els = _els;
			}
			
			return els;
		},
		'*': function (ss, c) {
		//>> get by multiple selectors
			for (var els = utm(ss[0], c), i = 1, l = ss.length; i < l; i++) {
				els = utm.selectors[ss[i].charAt(0)](ss[i], c, els);
			}
			return utm.clean(els);
		},
		'#': function (s, c, col) {
		//>> get by id
			// HTML documents
			s = s.replace('#', '');
			if (c.getElementById) {
				var el = c.getElementById(s); return el? [el] : [];
			}
			// any other XML document
			for (var col = col || utm('*', c), els = [], i = 0, l = col.length; i < l; i++)
				if (col[i].getAttribute('id') == s || col[i].id == s) {
					els.push(col[i]);
				}
			return els;
		},
		'.': function (s, c, col) {
		//>> get by class
			s = s.replace('.', '');
			return c.getElementsByClassName && !col?
				utm.array(c.getElementsByClassName(s)) :
				utm.selectors['[']('[class='+s+']', c, col);
		},
		'[': function (s, c, col) {
		//>> get by matching attribute
			for (var attr, _s = s.match(utm.selectors[4]), col = col || utm('*', c), els = [], i = 0, l = col.length; i < l; i++) {
				attr = col[i].getAttribute(_s[1]) || col[i][_s[1]];
				// process matching
				if (attr && (
					!_s[3] ||
					_s[2] == '='  && attr == _s[3] ||
					_s[2] == '!=' && attr != _s[3] ||
					_s[2] == '~=' && (' ' + attr + ' ').indexOf(' ' + _s[3] + ' ') >= 0 ||
					_s[2] == '^=' && !attr.indexOf(_s[3]) ||
					_s[2] == '$=' && attr.substr(attr.length - _s[3].length) == _s[3] ||
					_s[2] == '*=' && attr.indexOf(_s[3]) >= 0 ||
					_s[2] == '|=' && !attr.indexOf(_s[3] + '-')
				)) { els.push(col[i]) }
			}
			return els;
		},
		':': function (s, c, col) {
		//>> get by pseudo-classes
			for (var _s = s.match(utm.selectors[5]), col = col || utm('*', c), els = [], i = 0, l = col.length; i < l; i++) {
				// pseudo-classes
				if (!utm.isset(_s[3])) {
					if (_s[1] == 'root') { return [col[i].ownerDocument.documentElement] } else
					if (_s[1] == 'odd' && !(i % 2) || _s[1] == 'even' && i % 2) { els.push(col[i]); } else
					if (_s[1] == 'enabled' && !col[i].getAttribute('disabled')) { els.push(col[i]); } else
					if (_s[1] == 'disabled' && col[i].getAttribute('disabled')) { els.push(col[i]); } else
					if (_s[1] == 'first-child') { els.push(utm(col[i]).first()[0]); } else
					if (_s[1] == 'last-child') { els.push(utm(col[i]).last()[0]); } else
					if (_s[1] == 'only-child' && (col[i] = utm(col[i])) && col[i].first() === col[i].last()) { els.push(utm(col[i]).last()[0]); } else
					if (_s[1] == 'parent') { els.push(col[i].parentNode) } else
					if (_s[1] == 'visible' && (col[i] = utm(col[i])) && (col[i].css('display') != 'none' && col[i].css('visibility') != 'hidden')) { els.push(col[i][0]) } else
					if (_s[1] == 'hidden' && (col[i] = utm(col[i])) && (col[i].css('display') == 'none' || col[i].css('visibility') == 'hidden')) { els.push(col[i][0]) }
				
				// pseudo-methods
				} else {
					if (_s[1] == 'contains' && (col[i].innerText || col[i].textContent || '').indexOf(_s[3]) >= 0) { els.push(col[i]); } else
					if (_s[1] == 'not') { return utm.selectors.pseudo.not(col, _s[3]); }
				}
			}
			return els;
		},
		pseudo: {
		// a collection of functions that provides css3 pseudo methods
			not: function (col, s) {
				for (var els = [], s = utm(s), i = 0, l = col.length; i < l; i++)
					if (s.index(col[i]) < 0) { els.push(col[i]) }
				return els;
			}
		}
	},

	grab: function (sel, context, noutm) {
	//>> grabs nodes by css selectors
		
		// only proceed if we have a string.
		if (typeof sel != 'string') { return sel; }
		
		// do we really have a selector?
		if (!sel.length) { return utm(); }
		
		// removes unnecessary whitespaces
		if (sel.indexOf(' ') >= 0) { sel = utm.trim(sel); }
		if (sel.indexOf('  ') > 0) { sel = utm.clean(sel); }
		
		// shortcut to regexps
		var s = utm.selectors;
		
		// sets a default context
		context = context? utm(context)[0] : document;
		
		// handles simple selectors
		//>> utm('#id'); utm('.class'); utm('tag');
		if (s[6].test(sel)) { return noutm? s[''](sel, context) : utm(s[''](sel, context)); }
		
		var simple = s[0].exec(sel); if (simple) {
			return noutm? s[simple[1]](simple[2], context) : utm(s[simple[1]](simple[2], context));
		}
		
		// handles multiples selectors
		//>> utm('p, a:link, strong');
		if (sel.indexOf(',') >= 0) {
			return noutm? s[','](sel.split(s[1]), context) : utm(s[','](sel.split(s[1]), context));
		}
		/* complex selectors */
		// division of selectors
		var a = sel.match(s[3]);
		
		// handles descendant selectors
		//>> utm('ul.list em');
		if (a && utm.index(a, ' ') >= 0) {
			return noutm? s[' '](utm.split(a, ' '), context) : utm(s[' '](utm.split(a, ' '), context));
		} else
		
		// handles parent > child selectors
		//>> utm('html > body > ul > li');
		if (sel.indexOf('>') >= 0) {
			return noutm? s['>'](sel.split(s[2]), context) : utm(s['>'](sel.split(s[2]), context));
		} else
		
		// handles multi-type selectors
		//>> utm('div#item.text[attr="value"]:contains("some"):odd');
		if (a && a.length > 1) {
			return noutm? s['*'](a, context) : utm(s['*'](a, context));
		} else
		
		// handles matching property and pseudo stuff
		// these functions are here to boost up common selectors
		//>> utm('[type^="text/"]')
		//>> utm(':contains("some text")')
		if (sel.charAt(0) == '[' || sel.charAt(0) == ':') {
			return noutm? s[sel.charAt(0)](sel, context) : utm(s[sel.charAt(0)](sel, context));
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
			// properties
			if (name[i].indexOf('[') >= 0) {
				data = name[i].match(utm.selectors[4]);
				el.attr(data[1], data[3]);
			
			// ids and classes
			} else {
				data = name[i].match(utm.selectors[0]);
				data[1] == '.'? el.addClass(data[2]) :
				data[1] == '#'? el.attr('id', data[2]) :
				false;
			}
		}
		
		// we must have the right attrs container
		if (text && text.constructor == Object) {
			attrs = text; text = '';
		}
		// make sure that we have a text
		text = text && text.constructor != Object? new String(text) : '';
		
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
		if (typeof el == 'boolean') { scrolls = el; el = 'html'; }
		// sets the default to the main element
		if (!el) { el = 'html'; }
		
		// grab the real element
		el = utm(el);
		
		// gets and return the sizes
		return {
			width: (scrolls?
				(el[0].scrollWidth < el[0].clientWidth? el[0].clientWidth : el[0].scrollWidth) :
				 el[0].clientWidth) || el[0].offsetWidth,
			height: (scrolls?
				(el[0].scrollHeight < el[0].clientHeight? el[0].clientHeight : el[0].scrollHeight) :
				 el[0].clientHeight) || el[0].offsetHeight
		};
	},
	
	pos: function (el, where, scrolls) {
	//>> gets the position of an element relative to the viewport
	//>> or apply a preset position to an element
		el = utm(el)[0];
		if (!where) {
		// getting the position
			var pos = { top: 0, left: 0 };
			while (el.offsetParent) {
				// adds values to the new offset
				pos.left += el.offsetLeft;
				pos.top += el.offsetTop;
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
				       + (scrolls? (el.parentNode || el.ownerDocument.documentElement).scrollLeft : 0)
			});
		}
	},

	opacity: function (els, op) {
	//>> gets/sets opacity from an element
		// set
		if (utm.isset(op)) return utm(els).each(function (el) {
			// some special attention to MSIE, again
			el.style.zoom = 1;
			utm.nav == 'ie'?
				el.style.filter = 'alpha(opacity=' + op + ')' :
			// for all other browsers
				el.style.opacity = op / 100;
		
		// get
		}); else {
			var el = utm(els)[0];
			return utm.nav == 'ie'?
				el.style.filter && el.style.filter.indexOf('opacity=') >= 0?
					Math.ceil(el.style.filter.match(/opacity=(\d+)/)[1]) :
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
		        s == 'fast'?   200 :
		        s == 'faster'? 400:
		        s == 'ultra'?  700:
		        (typeof s != 'number')? 100 :
		        s <= 0? 1 : s >= 1000? 1000 : s) / 100;
	},

	anim: function (els, prop, opt, speed) {
	//>> smoothly modifies the style of an element
		opt = utm.isset(opt)? opt : {};
		opt = typeof opt == 'number'? { end: opt } : opt;
		if (utm.isset(speed)) { opt.speed = speed; }
		
		return utm(els).each(function (el) {
			el = utm(el);
			opt.begin = utm.isset(opt.begin)? opt.begin : el.css(prop);
			if (typeof parseFloat(opt.begin) == 'number') { opt.begin = parseFloat(opt.begin); }
			var step = (opt.end - opt.begin) / 100,
			    framerate = 10 / utm.efSpeed(opt.speed),
			    animName = utm.camel('_utmAnim-'+prop+'-steps');
			
			// clean a running animation
			if (el[0][animName]) { var steps = el[0][animName].length; while(steps--) {
				clearTimeout(el[0][animName][steps]);
			}}
			for (var i = 0, steps = el[0][animName] = []; i <= 100; i += 5) (function () {
				var s = i;
				steps.push(setTimeout(function () {
					el.css(prop, Math.ceil(opt.begin + s * step));
					// executes callback
					if (s == 100) {
						if (opt.finish) { opt.finish(el); }
						if (opt.destroy) { el.remove(); }
					}
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
		return utm.index(this, item);
	},
	clean: function () {
	//>> removes duplicated items
		return utm.clean(this, true);
	},
	intersect: function () {
	//>> intersects to other collection(s)
		return utm.intersect.apply(null, arguments);
	},
	push: function () {
	//>> puts items into an utm object
		for (var i = 0, l = arguments.length; i < l; i++) {
			this[++this.length-1] = arguments[i];
		}
		return arguments[i - 1];
	},
	split: function (key) {
		return utm.split(this, key);
	},

	/*-----------------
	>> Object utilities
	--------------------*/
	ext: function () {
	//>> merge objects to this
		var i = arguments.length; while (i--) {
			utm.ext(this[0], arguments[i]);
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
		return utm(filter, this);
	},

	addClass: function (cl) { return this.each(function (el) {
	//>> adds a class
		utm(cl.split(/\s+/)).each(function (c) {
			if ((' ' + el.className + ' ').indexOf(' ' + cl + ' ') < 0) {
				el.className = utm.trim(el.className) + ' ' + c;
			}
		});
	}); },

	is: function (sel) {
	//>> checks if the element has a characteristic
		return utm(sel).index(this[0]) >= 0;
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

	appendTo: function (el) {
	//>> inserts a previously created element into another one
		return utm(el).append(this);
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
		return utm(this.parent()[0].insertBefore(utm.create(tag, text, attrs)[0], null));
	},

	remove: function () { return this.each(function (el) {
	//>> removes a child
		utm(el).parent()[0].removeChild(el);
	}); },

	empty: function () { return this.each(function (el) {
	//>> clear every content
		el.value = '';
		while (el.firstChild) { el.removeChild(el.firstChild); }
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

	val: function (val) {
	//>> gets/sets values
		if (!utm.isset(val)) {
			return this[0].value;
		} else return this.each(function (el) {
			el.value = val;
		});
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
				if (typeof _attrs[key] == 'number' &&
				' opacity z-index '.indexOf(' '+key+' ') < 0) { _attrs[key] = _attrs[key] + 'px'; }
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

	toggle: function (ef) { return this.each(function (el) {
	//>> toggles the visibility
		el = utm(el);
		el.css('display') == 'none'?
			ef? el[ef](100).css('display:block') : el.css('display:block') :
			ef? el[ef](0, function (el) { utm(el).css('display:none') }) : el.css('display:none');
	}); },
	
	// shortcuts to ajax
	get: function (url, add) {
	//>> loads a text and insert it into elements
		var els = this;
		utm.get(url, { success: function (xhr) {
			els.each(function (el) { utm(el).text(xhr.responseText, add); });
		}});
	},
	
	// events
	bind: function (type, fn) { return this.each(function (el) {
	//>> adds an event listener
		// firstly, we must have an some place to put the handlers on
		el._utmEvents = el._utmEvents || {};
		
		// separate each type of event
		type = (''+type).split(utm.selectors[1]);
		
		// and add them separately
		for (var ts = 0, t; ts < type.length; ts++) {
			t = type[ts];
			// we also must have a collection of handlers for that type of event.
			el._utmEvents[t] = el._utmEvents[t] || [];
			
			// adding the handler
			if (utm(el._utmEvents[t]).index(fn) < 0) {
				el._utmEvents[t].push(fn);
			}
			
			// and get it ready for use
			el['on' + (/drag|drop/.test(t)? ('Utm_' + t) : t)] = function (e) { for (var i = 0; i < el._utmEvents[t].length; i++) {
				// store the handler directly into the node, so we can use 'this'
				// to refer the owner element.
				this._utmTmpEventHandler = el._utmEvents[t][i];
				
				// standardize the event object for non compliant browsers
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
				});}
				
				// fire!!
				this._utmTmpEventHandler(e);
				
				// then, discard the temporary handler.
				this._utmTmpEventHandler = undefined;
			}};
		}
	});},

	unbind: function (type, fn) { return this.each(function (el) {
	//>> removes an event listener
		// check if there's that handler
		if (el._utmEvents && el._utmEvents[type]) {
			var i = utm(el._utmEvents[type]).index(fn);
			// and removes it.
			if (i >= 0) { el._utmEvents[type].splice(i, 1); }
		}
	});},

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
	// other events
	change: function (f) { return this.bind('change', f) },
	reset: function (f) { return this.bind('reset', f) },
	submit: function (f) { return this.bind('submit', f) },
	load: function (f) { return this.bind('load', f) },
	scroll: function (f) { return this.bind('scroll', f) },
	
	/* Graphic utilities - shortcuts */
	opacity: function (op) { return utm.opacity(this, op); },
	size: function (scrolls) { return utm.size(this, scrolls) },
	pos: function (where, scrolls) { return utm.pos(this, where, scrolls) },
	
	/* Basic visual effects - shortcuts */
	anim: function (prop, options, speed) { return utm.anim(this, prop, options, speed) },
	fade: function (to, opt) {
	//>> fades an element
		if (typeof to != 'number') { opt = to; }
		opt = typeof opt == 'function'? { finish: opt } :
		      typeof opt == 'boolean'? { destroy: opt } :
		      typeof opt == 'string'? { speed: opt } :
		      opt || {};
		opt.end = to;
		return this.anim('opacity', opt);
	},
	fadeIn: function (opt) {
	//>> fades in any element
		// sets the opacity to 0 if it's 100
		return this.each(function (el) {
			el = utm(el);
			if (el.css('display') == 'none') { el.css('display:block'); }
			if (utm.opacity(el) == 100) { utm.opacity(el, 0); }
		}).fade(100, opt);
	},
	fadeOut: function (opt) {
	//>> fades out any element
		return typeof opt == 'number'? this.fade(opt, {}) :
		       typeof opt == 'boolean'? this.fade(0, { destroy: true }) :
			   this.fade(0, opt);
	},
	pulsate: function (t) {
	//>> flashes any element
		if (!utm.isset(t)) { t = 3 }
		this.fade(20,  { speed: 'ultra', finish: function (el) {
		  el.fade(100, { speed: 'ultra', finish: function (el) { t--; if (t) { el.pulsate(t); } } });
		} });
	},
	move: function (x, y, opt) {
	//>> moves an element by coordinates
		var optX = opt || {}, optY = {};
		if (typeof opt == 'function') { optX = { finish: opt }; }
		else if (typeof optX == 'string' || typeof optX == 'number') { optX = { speed: optX }; }
		optX.end = x;
		optY.end = y;
		optY.speed = optX.speed;
		
		return this.anim('left', optX).anim('top', optY);
	},
	moveBy: function (x, y, opt) { return this.each(function (el) {
	//>> moves an element by distance
		el = utm(el);
		var t = parseFloat(el.css('top')), l = parseFloat(el.css('left'));
		el.move(l + (x || 0), t + (y || 0), opt);
	}); },
	shake: function (t, axis) {
	//>> shakes elements
		return (
			this.moveBy(-15, 0, { speed: 'ultra', finish: function (el) {
			  el.moveBy(30,  0, { speed: 'ultra', finish: function (el) {
			  el.moveBy(-30, 0, { speed: 'ultra', finish: function (el) {
			  el.moveBy(30,  0, { speed: 'ultra', finish: function (el) {
			  el.moveBy(-15, 0, { speed: 'faster' });
			  } }); } }); } }); } })
		);
	},
	resize: function (w, h, opt) {
	//>> resizes elements
		var optW = opt || {}, optH = {};
		if (typeof opt == 'function') { optW = { finish: opt }; }
		else if (typeof optW == 'string' || typeof optW == 'number') { optW = { speed: optW }; }
		optW.end = w;
		optH.end = h;
		optH.speed = optW.speed;
		
		return this.anim('width', optW).anim('height', optH);
	},
	resizeBy: function (p, opt) { return this.each(function (el) {
	//>> resizes elements by percentage
		utm(el)
			.resize(utm.percent(el.clientWidth, p), utm.percent(el.clientHeight, p), opt);
	})},
	puff: function (destroy) { return this.each(function (el) {
	//>> makes the element puff away
		utm(el)
			.resizeBy(200, 'faster')
			.moveBy(-el.clientWidth/2, -el.clientHeight/2, 'faster')
			.fadeOut({ speed: 'faster', destroy: destroy });
	});},
	grow: function (to) {
	//>> makes the element bigger
		return this.each(function (el) {
			el = utm(el);
			if (el[0]._utmOldOverflow) { el.css('overflow', el[0]._utmOldOverflow); }
			if (el[0]._utmOldSize) {
				el.resize(el[0]._utmOldSize.width, el[0]._utmOldSize.height, 'faster')
				  .moveBy(-el.clientWidth/2, -el.clientHeight/2, 'faster');
			} else {
				el.resizeBy(to, 'faster')
				  .moveBy(-el.clientWidth/2, -el.clientHeight/2, 'faster');
			}
		});
	},
	shrink: function (to, destroy) {
	//>> shrinks the element
		if (!to) { to = 0; }
		return this.each(function (el) {
			el = utm(el);
			el[0]._utmOldOverflow = el.css('overflow');
			el[0]._utmOldSize = {
				width: el[0].clientWidth,
				height: el[0].clientHeight
			};
			el.css('overflow: hidden')
			  .resizeBy(to, 'faster')
			  .moveBy(el.clientWidth/2, el.clientHeight/2, 'faster');
		});
	},
	slideX: function (opt) { return this.each(function (el) {
	//>> slides an element up
		el = utm(el);
		if (el[0].clientWidth) {
			el[0]._utmOldWidth = el[0].clientWidth;
			el[0]._utmOldOverflow = el.css('overflow');
		}
		el.anim('width', el.css('overflow: hidden')[0].clientWidth? 0 : el[0]._utmOldWidth, opt);
	})},
	slideY: function (opt) { return this.each(function (el) {
	//>> slides an element up
		el = utm(el);
		if (el[0].clientHeight) {
			el[0]._utmOldHeight = el[0].clientHeight;
			el[0]._utmOldOverflow = el.css('overflow');
		}
		el.anim('height', el.css('overflow: hidden')[0].clientHeight? 0 : el[0]._utmOldHeight, opt);
	})}
};

// gives all the utm methods to later grabbing
utm.start.prototype = utm.methods;

// utm cascading style sheets
if (document.styleSheets) {
	utm('head,body').add('style');
	utm.CSS = document.styleSheets[document.styleSheets.length - 1];
}

})();
