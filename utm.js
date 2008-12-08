(function () {
/*
 * UlTiMate JavaScript Library
 * version 0.4 alpha 01
 *
 * Copyright (c) 2008 E. Myller (emyller.net)
 * utm is licensed under the LGPL license.
 *
 * Visit www.utmproject.org for more information.
 *
 */

//>> the main utm namespace
var utm = window.utm = window.u = function (sel, context) {
	return new utm.start(sel, context);
};

// this running version
utm.version = .4;

window.yes = true;
window.no = false;

/*
 * Sizzle CSS Selector Engine
 *  Copyright 2008, John Resig (http://ejohn.org/)
 *  released under the MIT License
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]+\]|[^[\]]+)+\]|\\.|[^ >+~,(\[]+)+|[>+~])(\s*,\s*)?/g;

var cache = null;
var done = 0;

if ( document.addEventListener && !document.querySelectorAll ) {
	cache = {};
	function invalidate(){ cache = {}; }
	document.addEventListener("DOMAttrModified", invalidate, false);
	document.addEventListener("DOMNodeInserted", invalidate, false);
	document.addEventListener("DOMNodeRemoved", invalidate, false);
}

var Sizzle = function(selector, context, results, seed) {
	var doCache = !results;
	results = results || [];
	context = context || document;

	if ( context.nodeType !== 1 && context.nodeType !== 9 )
		return [];
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( cache && context === document && cache[ selector ] ) {
		results.push.apply( results, cache[ selector ] );
		return results;
	}
	
	var parts = [], m, set, checkSet, check, mode, extra;
	
	// Reset the position of the chunker regexp (start from head)
	chunker.lastIndex = 0;
	
	while ( (m = chunker.exec(selector)) !== null ) {
		parts.push( m[1] );
		
		if ( m[2] ) {
			extra = RegExp.rightContext;
			break;
		}
	}

	var ret = seed ?
		{ expr: parts.pop(), set: makeArray(seed) } :
		Sizzle.find( parts.pop(), context );
	set = Sizzle.filter( ret.expr, ret.set );

	if ( parts.length > 0 ) {
		checkSet = makeArray(set);
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

		var later = "", match;

		// Position selectors must be done after the filter
		if ( typeof pop === "string" ) {
			while ( (match = Expr.match.POS.exec( pop )) ) {
				later += match[0];
				pop = pop.replace( Expr.match.POS, "" );
			}
		}

		Expr.relative[ cur ]( checkSet, pop );

		if ( later ) {
			Sizzle.filter( later, checkSet, true );
		}
	}
	
	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		throw "Syntax error, unrecognized expression: " + (cur || selector);
	}
	if ( checkSet instanceof Array ) {
		if ( context.nodeType === 1 ) {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 && contains(context, checkSet[i]) ) {
					results.push( set[i] );
				}
			}
		} else {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}
	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		arguments.callee( extra, context, results );
	}

	if ( cache && doCache ) {
		cache[selector] = results.slice(0);
	}

	return results;
};

Sizzle.matches = function(expr, set){
	return Sizzle(expr, null, null, set);
};

Sizzle.find = function(expr, context){
	var set, match;

	if ( !expr ) {
		return [];
	}

	var later = "", match;

	// Pseudo-selectors could contain other selectors (like :not)
	while ( (match = Expr.match.PSEUDO.exec( expr )) ) {
		var left = RegExp.leftContext;

		if ( left.substr( left.length - 1 ) !== "\\" ) {
			later += match[0];
			expr = expr.replace( Expr.match.PSEUDO, "" );
		} else {
			// TODO: Need a better solution, fails: .class\:foo:realfoo(#id)
			break;
		}
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var type = Expr.order[i];
		
		if ( (match = Expr.match[ type ].exec( expr )) ) {
			var left = RegExp.leftContext;

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context );

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

	expr += later;

	return {set: set, expr: expr};
};

Sizzle.filter = function(expr, set, inplace){
	var old = expr, result = [], curLoop = set, match;

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.match[ type ].exec( expr )) != null ) {
				var anyFound = false, filter = Expr.filter[ type ], goodArray = null;
				match[1] = (match[1] || "").replace(/\\/g, "");

				if ( curLoop == result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop );

					if ( match[0] === true ) {
						goodArray = [];
						var last = null, elem;
						for ( var i = 0; (elem = curLoop[i]) !== undefined; i++ ) {
							if ( elem && last !== elem ) {
								goodArray.push( elem );
								last = elem;
							}
						}
					}

				}

				var goodPos = 0, found, item;

				for ( var i = 0; (item = curLoop[i]) !== undefined; i++ ) {
					if ( item ) {
						if ( goodArray && item != goodArray[goodPos] ) {
							goodPos++;
						}

						found = filter( item, match, goodPos, goodArray );
						if ( inplace && found != null ) {
							curLoop[i] = found ? curLoop[i] : false;
						} else if ( found ) {
							result.push( item );
							anyFound = true;
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


		expr = expr.replace(/\s*,\s*/, "");

		// Improper expression
		if ( expr == old ) {
			throw "Syntax error, unrecognized expression: " + expr;
		}

		old = expr;
	}

	return curLoop;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],
	match: {
		ID: /#((?:[\w\u0128-\uFFFF_-]|\\.)+)/,
		CLASS: /\.((?:[\w\u0128-\uFFFF_-]|\\.)+)/,
		NAME: /\[name=((?:[\w\u0128-\uFFFF_-]|\\.)+)\]/,
		ATTR: /\[((?:[\w\u0128-\uFFFF_-]|\\.)+)\s*(?:(\S{0,1}=)\s*(['"]*)(.*?)\3|)\]/,
		TAG: /^((?:[\w\u0128-\uFFFF\*_-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child\(?(even|odd|[\dn+-]*)\)?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)\(?(\d*)\)?(?:[^-]|$)/,
		PSEUDO: /:((?:[\w\u0128-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
	},
	attrMap: {
		"class": "className"
	},
	relative: {
		"+": function(checkSet, part){
			for ( var i = 0, l = checkSet.length; i < l; i++ ) {
				var elem = checkSet[i];
				if ( elem ) {
					var cur = elem.previousSibling;
					while ( cur && cur.nodeType !== 1 ) {
						cur = cur.previousSibling;
					}
					checkSet[i] = cur || false;
				}
			}

			Sizzle.filter( part, checkSet, true );
		},
		">": function(checkSet, part){
			if ( typeof part === "string" && !/\W/.test(part) ) {
				part = part.toUpperCase();

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
						checkSet[i] = elem.parentNode;
						if ( typeof part !== "string" ) {
							checkSet[i] = checkSet[i] == part;
						}
					}
				}

				if ( typeof part === "string" ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},
		"": function(checkSet, part){
			var doneName = "done" + (done++), checkFn = dirCheck;

			if ( !part.match(/\W/) ) {
				var nodeCheck = part = part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("parentNode", part, doneName, checkSet, nodeCheck);
		},
		"~": function(checkSet, part){
			var doneName = "done" + (done++), checkFn = dirCheck;

			if ( !part.match(/\W/) ) {
				var nodeCheck = part = part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("previousSibling", part, doneName, checkSet, nodeCheck);
		}
	},
	find: {
		ID: function(match, context){
			if ( context.getElementById ) {
				var m = context.getElementById(match[1]);
				return m ? [m] : [];
			}
		},
		NAME: function(match, context){
			return context.getElementsByName(match[1]);
		},
		TAG: function(match, context){
			return context.getElementsByTagName(match[1]);
		}
	},
	preFilter: {
		CLASS: function(match){
			return new RegExp( "(?:^|\\s)" + match[1] + "(?:\\s|$)" );
		},
		ID: function(match){
			return match[1];
		},
		TAG: function(match){
			return match[1].toUpperCase();
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
			match[0] = typeof get_length == "undefined" ? "done" + (done++) : "nodeCache";

			return match;
		},
		ATTR: function(match){
			var name = match[1];
			
			if ( Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			return match;
		},
		PSEUDO: function(match){
			if ( match[1] === "not" ) {
				match[3] = match[3].split(/\s*,\s*/);
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
		CHILD: function(elem, match){
			var type = match[1], parent = elem.parentNode;

			var doneName = match[0];
			
			if ( parent && !parent[ doneName ] ) {
				var count = 1;

				for ( var node = parent.firstChild; node; node = node.nextSibling ) {
					if ( node.nodeType == 1 ) {
						node.nodeIndex = count++;
					}
				}

				parent[ doneName ] = count - 1;
			}

			if ( type == "first" ) {
				return elem.nodeIndex == 1;
			} else if ( type == "last" ) {
				return elem.nodeIndex == parent[ doneName ];
			} else if ( type == "only" ) {
				return parent[ doneName ] == 1;
			} else if ( type == "nth" ) {
				var add = false, first = match[2], last = match[3];

				if ( first == 1 && last == 0 ) {
					return true;
				}

				if ( first == 0 ) {
					if ( elem.nodeIndex == last ) {
						add = true;
					}
				} else if ( (elem.nodeIndex - last) % first == 0 && (elem.nodeIndex - last) / first >= 0 ) {
					add = true;
				}

				return add;
			}
		},
		PSEUDO: function(elem, match, i, array){
			var name = match[1], filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array )
			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || "").indexOf(match[3]) >= 0;
			} else if ( name === "not" ) {
				var not = match[3];

				for ( var i = 0, l = not.length; i < l; i++ ) {
					if ( Sizzle.filter(not[i], [elem]).length > 0 ) {
						return false;
					}
				}

				return true;
			}
		},
		ID: function(elem, match){
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},
		TAG: function(elem, match){
			return (match === "*" && elem.nodeType === 1) || elem.nodeName === match;
		},
		CLASS: function(elem, match){
			return match.test( elem.className );
		},
		ATTR: function(elem, match){
			var result = elem[ match[1] ], value = result + "", type = match[2], check = match[4];
			return result == null ?
				false :
				type === "=" ?
				value === check :
				type === "*=" || type === "~=" ?
				value.indexOf(check) >= 0 :
				!match[4] ?
				result :
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

function makeArray(array, results) {
	array = Array.prototype.slice.call( array );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
}

// TODO: Need a proper check here
if ( document.all && !window.opera ) {
	function makeArray(array, results) {
		if ( array instanceof Array ) {
			return Array.prototype.slice.call( array );
		}

		var ret = results || [];

		for ( var i = 0; array[i]; i++ ) {
			ret.push( array[i] );
		}

		return ret;
	}

	Expr.find.ID = function(match, context){
		if ( context.getElementById ) {
			var m = context.getElementById(match[1]);
			return m ? m.id === match[1] || m.getAttributeNode && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
		}
	};

	Expr.filter.ID = function(elem, match){
		var node = elem.getAttributeNode && elem.getAttributeNode("id");
		return elem.nodeType === 1 && node && node.nodeValue === match;
	};
}

if ( document.querySelectorAll ) (function(){
	var oldSizzle = Sizzle;
	
	window.Sizzle = Sizzle = function(query, context, extra){
		context = context || document;

		if ( context.nodeType === 9 ) {
			try {
				return makeArray( context.querySelectorAll(query) );
			} catch(e){}
		}
		
		return oldSizzle(query, context, extra);
	};

	Sizzle.find = oldSizzle.find;
	Sizzle.filter = oldSizzle.filter;
	Sizzle.selectors = oldSizzle.selectors;
})();

if ( document.getElementsByClassName ) {
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function(match, context) {
		return context.getElementsByClassName(match[1]);
	};
}

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			elem = elem[dir]
			var match = false;

			while ( elem && elem.nodeType ) {
				var done = elem[doneName];
				if ( done ) {
					match = checkSet[ done ];
					break;
				}

				if ( elem.nodeType === 1 )
					elem[doneName] = i;

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

function dirCheck( dir, cur, doneName, checkSet, nodeCheck ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			elem = elem[dir]
			var match = false;

			while ( elem && elem.nodeType ) {
				if ( elem[doneName] ) {
					match = checkSet[ elem[doneName] ];
					break;
				}

				if ( elem.nodeType === 1 ) {
					elem[doneName] = i;

					if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
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

if ( document.compareDocumentPosition ) {
	function contains(a, b){
		return a.compareDocumentPosition(b) & 16;
	}
} else {
	function contains(a, b){
		return a !== b && a.contains(b);
	}
}

// EXPOSE

window.Sizzle = Sizzle;

})();


utm.start = function (sel, context) {
//>> the main utm grabber
	sel = sel !== undefined? sel : document;

	// return the object itself if it's already 'grabbed'
	if (sel._utm) { return sel; }

	// returns the results of a css selector query
	if (typeof sel == 'string') {
		return utm(Sizzle(sel, context));

	// handles an array-like object
	} else if (sel.length !== undefined && !sel.nodeType && sel != window || sel instanceof Array) {
		this.length = 0;
		Array.prototype.push.apply(this, sel.constructor == Array? sel : utm.array(sel));

	// or returns any other object inside a new utm instance
	} else {
		this[0] = sel;
		this.length = 1;
	}
};

/*----------------
>> DOM Manipulator
-------------------*/
utm.selectors = {
	grab: function (s, context) {
	//>> grabs elements by selector
		if (s.nodeType) { return [s]; }

		// grab elements from a collection
		if (s[0] && s[0].nodeType) { return s; }

		return Sizzle(s, context);
	},
	
	id: /^(#)([\w-]+)/,
	cl: /^(.)([\w-]+)/,
	tg: /^()([\w-]+|\*)/,
	pr: /^(\[)\s*@?([\w-]+)(?:\s*([!^$~*|=]{1,2})\s*(?:"([^"]*)"|'([^']*)'|([^\]]*)))?\]/,
	
	parse: function (s) {
	//>> parses a simple css selector
		var parsed = [[]], match, type, multi, group = 0;
		// avoid using of descendant selector instead of child
		s = utm.clean(s);
		
		while (s) {
			// separates when we get multiple selectors (... , ...)
			if (multi = utm.selectors.cm.exec(s)) {
				parsed.push(','); s = s.slice(multi[0].length);
				if (s.length) { parsed.push([]); group+=2; }
			// or proceeds with normal parsing
			} else {
			type = s.charAt(0);
			parsed[group].push(match = (
				type == '#'? utm.selectors.id.exec(s) :
				type == '.'? utm.selectors.cl.exec(s) :
				type == '['? utm.selectors.pr.exec(s) :
				type == ':'? utm.selectors.ps.exec(s) :
				type == ' ' || type == '>'? type :
				utm.selectors.tg.exec(s)
			));
			s = s.slice(typeof match == 'string'? 1 : match[0].length); }
		}
		return parsed;
	},

	nav: function (from, direction, crit) {
	//>> finds an element at certain position
		var el = from = utm.selectors.grab(from)[0],
			walk = 0;

		if (typeof crit == 'string') { crit = utm.selectors.grab(crit); }

		do { try {
			el =
				direction == 'first'? (el.parentNode == from? el.nextSibling : el.firstChild) :
				direction == 'last'? (el.parentNode == from? el.previousSibling : el.lastChild) :
				direction == 'prev'? el.previousSibling :
				direction == 'next'? el.nextSibling :
				direction == 'parent'? el.parentNode :
				null;
				if (el.nodeType != 3) { walk++; }
			} catch (e) { return []; }
		} while (crit? (typeof crit == 'number'? walk < crit : utm.index(crit, el) < 0) : el.nodeType != 1);
		return [el];
	},

	children: function (from, crit) {
	//>> gets the children
		var els = [];
		if (crit && crit[0][2] != '*') {
			var descendants = utm.selectors.grab(crit, from),
			el; while (el = descendants.shift()) if (el.parentNode == from)
				els.push(el);
		} else for (var el = from.firstChild; el; el = el.nextSibling)
			if (el.nodeType == 1) { els.push(el); }

		return els;
	}
};

utm.create = function (name, text, attrs) {
//>> creates a new html element
	// if we get a node
	if (name.nodeType || name[0] && name[0].nodeType) { return utm(name[0] || name); }

	// parses the name
	s = utm.clean(s);
	var parsed = [], type, match; while (s) {
		type = s.charAt(0);
		parsed.push(
		
		);
	}

	var el = utm(attrs && attrs.ns && document.createElementNS?
		document.createElementNS(attrs.ns, name.shift()[0]) :
		document.createElement(name.shift()[0])
	);

	if (attrs) { delete attrs.ns; }

	// adds other properties
	while (data = name.shift()) {
		// attributes
		if (data[1] == '[') {
			el.attr(
				utm._keys[data[2]] || data[2],
				utm.isset(data[4])? data[4] : utm.isset(data[5])? data[5] : data[6]
			);
		} else {
			data[1] == '.'? el.addClass(data[2]) :
			data[1] == '#'? el.attr('id', data[2]) : false;
		}
	}

	// we must have the right attrs container
	if (text && text.constructor == Object) {
		attrs = text; text = '';
	}
	// make sure that we have a text
	text = utm.isset(text) && text.constructor != Object? String(text) : '';

	// set the attrs and text
	el.attr(attrs || {});
	// inserts the text
	if (text) { el.text(text); }

	return el;
};

utm.append = function (name, text, attrs) {
// appends an element to the <body>
	return utm('body').append(name, text, attrs);
};

utm.Class = function (ext, data) {
//>> simulates a class structure
	// handles the given arguments
	if (!data) { data = ext; }
	else { data.__extends = ext; }

	// creates the main object
	var _class = data.__construct = data.__construct || function () {};

	// static extend method
	_class.ext = function (ext) {
		utm.ext(this.prototype, ext);
		return this;
	}

	_class.prototype = data.__extends?
		typeof data.__extends == 'function'?
			data.__extends.prototype :
			data.__extends :
		{};
	delete data.__extends;

	for (var fn in data)
	// adds static functions
	if (!fn.indexOf('__')) { _class[fn.slice(2)] = data[fn]; }

	// adds public methods
	else { _class.prototype[fn] = data[fn]; }

	_class.prototype.constructor = _class;

	return _class;
};

// let me know what language we're in...
utm.lang = (navigator.language || navigator.userLanguage || 'en-us').toLowerCase();


/*--------------------
>> Main static methods
-----------------------*/
utm.toString = function () {
//>> alias to the utm object
	return 'UlTiMate JavaScript Library [version: ' + utm.version + ']';
};

utm.isset = function (obj) {
//>> (any) is the object undefined?
	return obj !== undefined;
};

utm.trim = function (str) {
//>> (string) removes trailing spaces
	return str.replace(/^\s+|\s+$/, '');
};

utm.caps = function (str) {
//>> (string) capitalizes words
	return str.replace(/(\s|^)(\w)/g, function (all, s, l) {
		return s + l.toUpperCase();
	});
};

utm.clean = function (str) {
//>> (array,string) removes unnecessary spaces / repeated items
	// cleans a string
	if (typeof str == 'string') {
		return utm.trim(str).replace(/\s{2,}/g, ' ');

	// cleans a collection
	} else {
		for (var a = 0, al = arguments.length, arr = []; a < al; a++)
		for (var i = 0, l = arguments[a].length; i < l; i++)
		if (utm.index(arr, arguments[a][i]) < 0) {
			arr.push(arguments[a][i]);
		}
		return arr;
	}
};

utm.percent = function (num, t) {
//>> calculates percentage
	return num / 100 * t;
};

utm.array = function (obj, ut) {
//>> (any) transforms any indexable object into an array
	for (var arr = [], i = -1; obj[++i];) { arr.push(obj[i]); }
	return arr;
};

utm.index = function (arr, item) {
//>> returns the position of an item
	if (arr instanceof Array && Array.prototype.indexOf)
		return arr.indexOf(item)
	else for (var i = -1; arr[++i];) if (arr[i] === item) { return i; }
	return -1;
};

utm.each = function (arr, fn) {
//>> executes fn for each item in the array
	for (var i = -1, l = arr.length; ++i < l && fn(arr[i]) !== false;);
	return arr;
};

utm.intersect = function () {
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
};

utm.split = function (arr, key) {
//>> splits an array
	for (var _arr = [[]], pos = 0, i = 0, l = arr.length; i < l; i++) {
		if (arr[i] != key) { _arr[pos].push(arr[i]); }
		else { _arr[++pos] = []; }
	}
	return _arr;
};

utm.camel = function (str) {
//>> (string) turns a string to camel case
	return str.replace(/\W([a-z])/g, function (s, m) {
		return m.toUpperCase();
	});
};

utm.mult = function (str, n) {
//>> (string) multiplies a string
	return (new Array(n + 1)).join(str);
};

utm.nav = (function () {
//>> sometimes we really need to know what browser we're on
// TEMPORARY CODE, it'll be rewritten
	var ua = navigator.userAgent;
	return (/webkit/i).test(ua)? 'webkit' :
		   window.opera? 'opera' :
		   (/msie/i).test(ua)? 'ie' :
		   (/mozilla/i).test(ua)?'moz' : 'other';
})();

utm._keys = {
	'class': utm.nav == 'ie'? 'className' : 'class',
	'for': 'htmlFor',
	'float': utm.nav == 'ie'? 'styleFloat' : 'cssFloat'
};

utm.key = function (key) {
// escapes some specific keys
	key = utm._keys[key] || key;
	if (/\W/.test(key)) { key = utm.camel(key); }
	return key;
};

utm.css = function (sel, prop, value) {
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
};

utm.ext = function () {
//>> extends any other object
	for (var i = -1; arguments[++i];) if (i % 2) {
		for (var key in arguments[i]) if (arguments[i].hasOwnProperty(key)) {
			arguments[i - 1][key] = arguments[i][key];
		}
	}
	return arguments[0];
};

/*-----------------
>> Handling modules
--------------------*/
utm.path = (function () {
//>> just finds where are the utm modules files
	var all = document.getElementsByTagName('script'),
	i = all.length; while (i--) if (all[i].src.indexOf('utm') >= 0) {
		return all[i].src.slice(0, all[i].src.lastIndexOf('/') + 1);
	}
	return '';
})();

utm.fileName = function (str) {
//>> (string) extracts the filename from a path
	return str.slice(str.lastIndexOf('/') + 1);
};

utm.filePath = function (str) {
//>> (string) removes the filename from a path
	return str.slice(0, str.lastIndexOf('/') + 1);
};

utm.include = function () {
//>> loads an utm module
	for (var i = -1; arguments[++i];) {
		var tries = ['mod/', 'mod.', './'];
		while (!mod && (t = tries.shift())) {
			try { var mod = utm.file(utm.path + t + arguments[i] + '.js'); } catch (e) {}
		}
		if (mod) {
			// module found, execute it
			utm.append('script[type=text/javascript]', mod.text).remove();
		} else {
			// module not found, throw an error
			throw new Error('utm: module not found');
		}
	}
	return utm;
};

// collection of loaded modules
utm.module = {};

utm.mod = function (info, deps, core, methods) {
//>> utm plugins container
	if (typeof info.constructor == 'string') {
	// gets a plugin information
		return utm.module[name] || null;
	} else {
	// adds a new plugin
		utm.module[info.name] = info;

		// adds the stylesheet
		utm.useTheme(utm.theme, info.name);

		// adds the necessary dependencies
		var dep; while ((dep = deps.shift()) && !utm.module[dep] && utm.include(dep));
		utm.ext(
			utm, core,
			utm.methods, methods
		);
		return utm;
	}
};

// the global theme being used by utm
utm.theme = 'default';

utm.useTheme = function (theme, mod) {
//>> set a theme
	// sets the theme globally
	if (!mod) {
		utm.theme = theme;
		for (var mod in utm.module) {
			utm.useTheme(theme, mod);
		}

	// sets the theme only for specific modules
	} else {
		mod = mod.split(utm.selectors[1]);
		var i = mod.length; while(i--) {
			utm('link#utm_theme_'+mod[i]).remove();
			utm('head,body').add('link', '', {
				id: 'utm_theme_'+mod[i],
				rel: 'stylesheet',
				type: 'text/css',
				href: utm.path+'themes/'+utm.theme+'/'+mod[i]+'/style.css'
			});
		}
	}
};

/*--------------------------------
>> XMLHttpRequest (Ajax) utilities
-----------------------------------*/
utm.XHR = function () {
//>> initializes a new XHR object
	try {
		return new XMLHttpRequest;
	} catch(e) { try {
		return new ActiveXObject('MSXML2.XMLHTTP');
	} catch (e) {
		return false;
	}}
};

utm.Request = function (url, opt) {
// performs a new xhr
	var xhr = new utm.XHR,
	
	// default options
	opt = utm.ext({
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

	if (!opt.cache)
	// disables cache
		xhr.setRequestHeader('If-Modified-Since', 'Wed, 01 Jan 1997 00:00:00 GMT');
	// special header for POST requests
	if (opt.method == 'POST')
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(opt.method == 'POST'? opt.params : null);

	if (opt.async)
	// asynchronous requests
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) utm.handleRequest(xhr, opt);
		};
	else
	// synchronous requests
		utm.handleRequest(xhr, opt);
	
	return xhr;
};

utm.handleRequest = function (xhr, o) {
//>> simply handles the request
	(xhr.status == 200 || xhr.status == 304)? o.success(xhr) : o.failure(xhr);
	o.finish(xhr)
};

utm.get = function (url, opt) {
//>> shortcut to GET requests
	var opt = typeof opt == 'boolean'? { async: opt } :
			  typeof opt == 'function'? { finish: function (xhr) { opt(xhr.responseText) } } :
			  opt;
	opt.method = 'GET';
	return new utm.Request(url, opt)
};

utm.post = function (url, args, opt) {
//>> shortcut to POST requests
	var opt = typeof opt == 'boolean'? { async: opt } :
			  typeof opt == 'function'? { finish: function (xhr) { opt(xhr.responseText); } } :
			  opt || {};
	// handles objects as args
	if (args.constructor == Object) {
		var _args = []; for (var key in args) {
			_args.push(key + '=' + args[key]);
		}
		args = _args.join('&');
	}
	opt.params = args;
	opt.method = 'POST';
	return new utm.Request(url, opt);
};

utm.file = function (url) {
//>> loads and provide data about a file
	var req = utm.get(url, {
		async: false,
		failure: function () {
			throw new Error('utm: unable to open file');
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
};


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
			var pos = {
				left: 0, right: el.offsetWidth, top: 0, bottom: el.offsetHeight
			};
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
		// setting a preset position
			where = where.split(' ');
			if (where.length < 2) { where[1] = where[0]; }
			var size = utm.size(), _size = utm.size(el, true);
			return utm(el).css({
				top: '', left: '', // reset the positions
				left: (where[0] == 'right'? size.width - _size.width :
				       where[0] == 'center'? size.width/2 - _size.width/2 :
				      (Math.floor(where[0])? Math.floor(where[0]) : 0))
				       + (scrolls? (el.parentNode || el.ownerDocument.documentElement).scrollLeft : 0),
				top:  (where[1] == 'bottom'? size.height - _size.height :
				       where[1] == 'center'? size.height/2 - _size.height/2 :
				      (Math.floor(where[1])? Math.floor(where[1]) : 0))
				       + (scrolls? (el.parentNode || el.ownerDocument.documentElement).scrollTop : 0)
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
		        s == 'fast'?   300 :
		        s == 'faster'? 500:
		        s == 'ultra'?  700:
		        (typeof s != 'number')? 200 :
		        s <= 0? 1 : s >= 1000? 1000 : s) / 100;
	},

	anim: function (els, prop, opt, speed) {
	//>> smoothly modifies the style of an element
		opt = utm.isset(opt)? opt : {};
		opt = typeof opt == 'number'? { end: opt } : opt;
		if (utm.isset(speed)) { opt.speed = speed; }

		return utm(els).each(function (el) {
			el = utm(el);
			opt.begin = typeof opt.begin != 'undefined'? opt.begin : el.css(prop);
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
		return utm.each(this, fn);
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
		return utm.intersect(this, arguments);
	},
	push: function () {
	//>> puts items into an utm object
		Array.prototype.push.apply(this, arguments);
		return this;
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


	/*------------------------------------------------------
	>> DOM Elements custom methods (can be extended anytime)
	---------------------------------------------------------*/
	filter: function (filter) {
	//>> filters a collection of nodes
		return utm(filter, this[0]);
	},

	addClass: function (cl) {
	//>> adds a class name
		cl = cl.split(/\s+/); var cll = cl.length;
		return this.each(function (el) {
			var cli = cll; while (cli--)
			if ((' '+el.className+' ').indexOf(' '+cl[cli]+' ') < 0) {
				el.className = utm.trim(el.className) + ' ' + cl[cli];
			}
		});
	},

	rmClass: function (cl) {
	//>> removes a class name
		cl = cl.split(/\s+/); var cll = cl.length;
		return this.each(function (el) {
			var cli = cll; while (cli--) {
				el.className = utm.trim((' '+el.className+' ').replace(' '+cl[cli]+' ', ''));
			}
		});
	},

	is: function (sel) {
	//>> checks if the element has a characteristic
		return utm(sel).index(this[0]) >= 0;
	},

	children: function (crit) {
	//>> the colletion of html nodes
		return utm(utm.selectors.children(this[0], crit));
	},

	nav: function (direction, crit) {
	//>> finds an element at certain position
		return utm(utm.selectors.nav(this[0], direction, crit));
	},

	// some shortcuts to {utm}.nav()
	prev: function (crit) { return this.nav('prev', crit); },
	next: function (crit) { return this.nav('next', crit); },
	first: function (crit) { return this.nav('first', crit); },
	last: function (crit) { return this.nav('last', crit); },
	parent: function (crit) { return this.nav('parent', crit); },

	prepend: function (name, text, attrs) {
	//>> prepends a new child
		return this.first().before(name, text, attrs);
	},

	append: function (name, text, attrs) {
	//>> appends a new child
		return utm(this[0].appendChild(utm.create(name, text, attrs)[0]));
	},

	appendTo: function (el) {
	//>> inserts a previously created element into another one
		return utm(el).append(this);
	},

	add: function (name, text, attrs) {
	//>> appends a new child and returns the parent
		return this.append(name, text, attrs).parent();
	},

	before: function (name, text, attrs) {
	//>> adds a new element before
		return utm(this.parent()[0].insertBefore(utm.create(name, text, attrs)[0], this[0]));
	},

	after: function (name, text, attrs) {
	//>> adds a new element after
		return utm(this.parent()[0].insertBefore(utm.create(name, text, attrs)[0], this.next()[0] || null));
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
			return this[0].textContent || this[0].innerText || this[0].text;
		} else {
		// setter
			this.each(function (el) {
				// clear the element
				if (!add) { utm(el).empty(); }

				// or adds a new text node
				/script|link/i.test(el.tagName) && utm.nav == 'ie'?
					el.text = t :
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

	attr: function (key, value, css, ns) {
	//>> gets/sets attributes
		var attrs = {};
		// gets an attribute
		if (typeof key == 'string' && !css) {
			if (!utm.isset(value)) {
				return ns && this[0].namespaceURI && this[0].getAttributeNS?
					this[0].getAttributeNS(ns || this[i].namespaceURI, this[0].namespaceURI, utm._keys[key] || key) :
					this[0].getAttribute(utm._keys[key] || key);
			} else {
				attrs[utm._keys[key] || key] = value;
			}

		// gets style
		} else if (typeof key == 'string' && css) {
			if (key == 'opacity') { return this.opacity(value); }
			if (utm.isset(value)) { attrs[key] = value; }
			else return (key = utm.key(key)) && this[0].style[key] ||
			            (this[0].currentStyle? this[0].currentStyle[key] :
			            this[0].ownerDocument.defaultView.getComputedStyle(this[0], null)[key]);
		} else { attrs = key; }

		for (var i = -1; this[++i];)
		// setting style
		if (css) for (var key in attrs) {
			if (key == 'opacity') {
				utm.opacity(this[i], attrs[key]);
			} else if (attrs[key]-0 && !/index|zoom/i.test(key)) {
				this[i].style[utm.key(key)] = attrs[key] += 'px';
			} else {
				this[i].style[utm.key(key)] = attrs[key];
			}

		// setting attributes
		} else for (var key in attrs) {
			ns && this[i].namespaceURI && this[i].setAttributeNS?
				this[i].setAttributeNS(ns || this[i].namespaceURI, this[i].namespaceURI, utm._keys[key] || key, attrs[key]) :
				this[i].setAttribute(utm._keys[key] || key, attrs[key]);
		}

		return this;
	},

	attrNS: function (key, value, ns) {
	//>> gets/sets special attributes for other namespaces
		return this.attr(key, value, 0, ns || 1);
	},

	css: function (key, value) {
	//>> gets/sets a style value
		return this.attr(key, value, 1);
	},

	toggle: function (ef) { return this.each(function (el) {
	//>> toggles the visibility
		el = utm(el);
		el.css('display') == 'none'?
			ef? el[ef](100).css('display', 'block') : el.css('display', 'block') :
			ef? el[ef](0, function (el) { utm(el).css('display', 'none') }) : el.css('display', 'none');
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
		type = (''+type).split(/\s*,\s*/);

		// and add them separately
		for (var ts = 0; ts < type.length; ts++) {
			var t = type[ts];

			// we also must have a collection of handlers for that type of event.
			el._utmEvents[t] = el._utmEvents[t] || [];

			// adding the handler
			if (utm(el._utmEvents[t]).index(fn) < 0) {
				el._utmEvents[t].push(fn);
			}

			// and get it ready for use
			el['on' + (/drag|drop/.test(t)? ('Utm_' + t) : t)] = function (e) {
				for (var i = 0; i < el._utmEvents[t].length; i++) {
				// store the handler directly into the node, so we can use 'this'
				// to refer the owner element.
				this._utmTmpEventHandler = el._utmEvents[t][i];

				// standardize the event object for non compliant browsers
				if (!e) { e = window.event; utm.ext(e, {
					charCode: e.type == 'keypress' ? e.keycode : 0,
					eventPhase: 2,
					isChar: e.keycode > 0,
					pageX: e.clientX + document.body.scrollLeft,
					pageY: e.clientY + document.body.scrollTop,
					target: e.srcElement,
					relatedTarget: e.toElement,
					timeStamp: (new Date).getTime(),
					preventDefault: function () { this.returnValue = false; },
					stopPropagation: function () { this.cancelBubble = true; }
				});}

				// fire!!
				var callback = this._utmTmpEventHandler(e);
				callback = utm.isset(callback)? callback : true;
				if (!callback) { return false; }

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
	dblclick: function (f) { return this.bind('dblclick', f) },
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

	/*
	 * Basic visual effects - shortcuts
	 */
	anim: function (prop, options, speed) {
		return utm.anim(this, prop, options, speed);
	},

	fade: function (to, opt) {
	//>> smoothly modify the opacity of elements
		if (typeof to != 'number') { opt = to; }
		opt = typeof opt == 'function'? { finish: opt } :
		      typeof opt == 'boolean'? { destroy: opt } :
		      typeof opt == 'string'? { speed: opt } :
		      opt || {};
		opt.end = to;
		return this.anim('opacity', opt);
	},

	fadeIn: function (opt) {
	//>> fade elements in
		// sets the opacity to 0 if it's 100
		return this.each(function (el) {
			el = utm(el);
			if (el.css('display') == 'none') { el.css('display', 'block'); }
			if (utm.opacity(el) == 100) { utm.opacity(el, 0); }
		}).fade(100, opt);
	},

	fadeOut: function (opt) {
	//>> fade elements out
		return typeof opt == 'number'? this.fade(opt, {}) :
		       typeof opt == 'boolean'? this.fade(0, { destroy: true }) :
			   this.fade(0, opt);
	},

	pulsate: function (t) {
	//>> flashes any element
		if (!utm.isset(t)) { t = 3 }
		return this.fade(20,  { speed: 'ultra', finish: function (el) {
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
		utm(el).resize(utm.percent(el.clientWidth, p), utm.percent(el.clientHeight, p), opt);
	})},

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
				  .moveBy(
					-utm.percent(el[0].offsetWidth, to/4) || el[0].offsetWidth/2,
					-utm.percent(el[0].offsetHeight, to/4) || el[0].offsetHeight/2, 'faster');
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
			el.css('overflow', 'hidden')
			  .resizeBy(to, 'faster')
			  .moveBy(
				utm.percent(el[0].offsetWidth, to) || el[0].offsetWidth/2,
				utm.percent(el[0].offsetHeight, to) || el[0].offsetHeight/2, 'faster');
		});
	},

	puff: function (destroy) { return this.each(function (el) {
	//>> makes the element puff away
		utm(el).grow(200).fadeOut({ speed: 'faster', destroy: destroy });
	});},

	suck: function (destroy) { return this.each(function (el) {
	//>> makes the element puff away
		utm(el).shrink(0).fadeOut({ speed: 'faster', destroy: destroy });
	});}
};

// gives all the utm methods to later grabbing
utm.start.prototype = utm.methods;

})();