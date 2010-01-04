/* Mandoo JavaScript Library
 * Copyright (c) 2009 Evandro Myller (emyller.net)
 * Mandoo is licensed under the LGPL license.

 * Visit http://mandoojs.com/ for more information. */

Mandoo = function (s, c) {
	return new u.__init__(s, c); };

(function (u) {
u.__version__ = 2;

u.__init__ = function (sel, context) {
	if (sel && sel.__mandoo__)
		return sel;
	if (!sel)
		return;
	if (typeof sel === 'string') {
		context = u(context || document)[0];
		this.push.apply(this, u.DOM.grab(sel, context)); }
	else
	if (sel.length)
		this.merge.call(this, sel);
	else
	if (sel.nodeType || sel === window)
		this.push(sel); };

u.methods = u.__init__.prototype = {
	__mandoo__: !0,

	/* Collection manager */
	length: 0,

	push: Array.prototype.push,

	indexOf: function (el) {
		return indexOf(this, el); },

	merge: function () {
		for (var i = -1; arguments[++i];)
			for (var j = -1; arguments[i][++j];)
				this.push(arguments[i][j]);
		return u.__clean__(this); },

	splice: function (index, n) {
		var
		l = this.length,
		s = u(Array.prototype.splice.apply(this, Array.prototype.slice.call(arguments)));
		// the applied .splice doesn't really remove items from the custom object
		for (var i = l; i > l - n + (arguments.length - 3); i--)
			delete this[i];
		return s; }};

/*!
 * Sizzle CSS Selector Engine - v1.0
 * (compressed with Google Closure Compiler)
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){function y(a){for(var b="",c,d=0;a[d];d++){c=a[d];if(c.nodeType===3||c.nodeType===4)b+=c.nodeValue;else if(c.nodeType!==8)b+=y(c.childNodes)}return b}function z(a,b,c,d,f,e){f=0;for(var h=d.length;f<h;f++){var g=d[f];if(g){g=g[a];for(var j=false;g;){if(g.sizcache===c){j=d[g.sizset];break}if(g.nodeType===1&&!e){g.sizcache=c;g.sizset=f}if(g.nodeName.toLowerCase()===b){j=g;break}g=g[a]}d[f]=j}}}function A(a,b,c,d,f,e){f=0;for(var h=d.length;f<h;f++){var g=d[f];if(g){g=g[a];for(var j=false;g;){if(g.sizcache===
c){j=d[g.sizset];break}if(g.nodeType===1){if(!e){g.sizcache=c;g.sizset=f}if(typeof b!=="string"){if(g===b){j=true;break}}else if(k.filter(b,[g]).length>0){j=g;break}}g=g[a]}d[f]=j}}}var v=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,w=0,B=Object.prototype.toString,m=false,C=true;[0,0].sort(function(){C=false;return 0});var k=function(a,b,c,d){c=c||[];var f=b=b||document;if(b.nodeType!==1&&b.nodeType!==9)return[];
if(!a||typeof a!=="string")return c;for(var e=[],h,g,j,q,n=true,p=x(b),o=a;(v.exec(""),h=v.exec(o))!==null;){o=h[3];e.push(h[1]);if(h[2]){q=h[3];break}}if(e.length>1&&F.exec(a))if(e.length===2&&i.relative[e[0]])g=D(e[0]+e[1],b);else for(g=i.relative[e[0]]?[b]:k(e.shift(),b);e.length;){a=e.shift();if(i.relative[a])a+=e.shift();g=D(a,g)}else{if(!d&&e.length>1&&b.nodeType===9&&!p&&i.match.ID.test(e[0])&&!i.match.ID.test(e[e.length-1])){h=k.find(e.shift(),b,p);b=h.expr?k.filter(h.expr,h.set)[0]:h.set[0]}if(b){h=
d?{expr:e.pop(),set:r(d)}:k.find(e.pop(),e.length===1&&(e[0]==="~"||e[0]==="+")&&b.parentNode?b.parentNode:b,p);g=h.expr?k.filter(h.expr,h.set):h.set;if(e.length>0)j=r(g);else n=false;for(;e.length;){var l=e.pop();h=l;if(i.relative[l])h=e.pop();else l="";if(h==null)h=b;i.relative[l](j,h,p)}}else j=[]}j||(j=g);if(!j)throw"Syntax error, unrecognized expression: "+(l||a);if(B.call(j)==="[object Array]")if(n)if(b&&b.nodeType===1)for(a=0;j[a]!=null;a++){if(j[a]&&(j[a]===true||j[a].nodeType===1&&G(b,j[a])))c.push(g[a])}else for(a=
0;j[a]!=null;a++)j[a]&&j[a].nodeType===1&&c.push(g[a]);else c.push.apply(c,j);else r(j,c);if(q){k(q,f,c,d);k.uniqueSort(c)}return c};k.uniqueSort=function(a){if(s){m=C;a.sort(s);if(m)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a};k.matches=function(a,b){return k(a,null,null,b)};k.find=function(a,b,c){var d,f;if(!a)return[];for(var e=0,h=i.order.length;e<h;e++){var g=i.order[e];if(f=i.leftMatch[g].exec(a)){var j=f[1];f.splice(1,1);if(j.substr(j.length-1)!=="\\"){f[1]=(f[1]||"").replace(/\\/g,
"");d=i.find[g](f,b,c);if(d!=null){a=a.replace(i.match[g],"");break}}}}d||(d=b.getElementsByTagName("*"));return{set:d,expr:a}};k.filter=function(a,b,c,d){for(var f=a,e=[],h=b,g,j,q=b&&b[0]&&x(b[0]);a&&b.length;){for(var n in i.filter)if((g=i.match[n].exec(a))!=null){var p=i.filter[n],o,l;j=false;if(h===e)e=[];if(i.preFilter[n])if(g=i.preFilter[n](g,h,c,e,d,q)){if(g===true)continue}else j=o=true;if(g)for(var t=0;(l=h[t])!=null;t++)if(l){o=p(l,g,t,h);var E=d^!!o;if(c&&o!=null)if(E)j=true;else h[t]=
false;else if(E){e.push(l);j=true}}if(o!==undefined){c||(h=e);a=a.replace(i.match[n],"");if(!j)return[];break}}if(a===f)if(j==null)throw"Syntax error, unrecognized expression: "+a;else break;f=a}return h};var i=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")}},relative:{"+":function(a,b){var c=typeof b==="string",d=c&&!/\W/.test(b);c=c&&!d;if(d)b=b.toLowerCase();d=0;for(var f=a.length,e;d<f;d++)if(e=a[d]){for(;(e=e.previousSibling)&&
e.nodeType!==1;);a[d]=c||e&&e.nodeName.toLowerCase()===b?e||false:e===b}c&&k.filter(b,a,true)},">":function(a,b){var c=typeof b==="string";if(c&&!/\W/.test(b)){b=b.toLowerCase();for(var d=0,f=a.length;d<f;d++){var e=a[d];if(e){c=e.parentNode;a[d]=c.nodeName.toLowerCase()===b?c:false}}}else{d=0;for(f=a.length;d<f;d++)if(e=a[d])a[d]=c?e.parentNode:e.parentNode===b;c&&k.filter(b,a,true)}},"":function(a,b,c){var d=w++,f=A;if(typeof b==="string"&&!/\W/.test(b)){var e=b=b.toLowerCase();f=z}f("parentNode",
b,d,a,e,c)},"~":function(a,b,c){var d=w++,f=A;if(typeof b==="string"&&!/\W/.test(b)){var e=b=b.toLowerCase();f=z}f("previousSibling",b,d,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c)return(a=b.getElementById(a[1]))?[a]:[]},NAME:function(a,b){if(typeof b.getElementsByName!=="undefined"){var c=[];b=b.getElementsByName(a[1]);for(var d=0,f=b.length;d<f;d++)b[d].getAttribute("name")===a[1]&&c.push(b[d]);return c.length===0?null:c}},TAG:function(a,b){return b.getElementsByTagName(a[1])}},
preFilter:{CLASS:function(a,b,c,d,f,e){a=" "+a[1].replace(/\\/g,"")+" ";if(e)return a;e=0;for(var h;(h=b[e])!=null;e++)if(h)if(f^(h.className&&(" "+h.className+" ").replace(/[\t\n]/g," ").indexOf(a)>=0))c||d.push(h);else if(c)b[e]=false;return false},ID:function(a){return a[1].replace(/\\/g,"")},TAG:function(a){return a[1].toLowerCase()},CHILD:function(a){if(a[1]==="nth"){var b=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+
(b[2]||1)-0;a[3]=b[3]-0}a[0]=w++;return a},ATTR:function(a,b,c,d,f,e){b=a[1].replace(/\\/g,"");if(!e&&i.attrMap[b])a[1]=i.attrMap[b];if(a[2]==="~=")a[4]=" "+a[4]+" ";return a},PSEUDO:function(a,b,c,d,f){if(a[1]==="not")if((v.exec(a[3])||"").length>1||/^\w/.test(a[3]))a[3]=k(a[3],null,null,b);else{a=k.filter(a[3],b,c,true^f);c||d.push.apply(d,a);return false}else if(i.match.POS.test(a[0])||i.match.CHILD.test(a[0]))return true;return a},POS:function(a){a.unshift(true);return a}},filters:{enabled:function(a){return a.disabled===
false&&a.type!=="hidden"},disabled:function(a){return a.disabled===true},checked:function(a){return a.checked===true},selected:function(a){return a.selected===true},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){return"text"===a.type},radio:function(a){return"radio"===a.type},checkbox:function(a){return"checkbox"===a.type},file:function(a){return"file"===
a.type},password:function(a){return"password"===a.type},submit:function(a){return"submit"===a.type},image:function(a){return"image"===a.type},reset:function(a){return"reset"===a.type},button:function(a){return"button"===a.type||a.nodeName.toLowerCase()==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},
lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var f=b[1],e=i.filters[f];if(e)return e(a,c,b,d);else if(f==="contains")return(a.textContent||a.innerText||y([a])||"").indexOf(b[3])>=0;else if(f==="not"){b=b[3];c=0;for(d=b.length;c<d;c++)if(b[c]===a)return false;return true}else throw"Syntax error, unrecognized expression: "+f;},CHILD:function(a,b){var c=b[1],d=a;switch(c){case "only":case "first":for(;d=
d.previousSibling;)if(d.nodeType===1)return false;if(c==="first")return true;d=a;case "last":for(;d=d.nextSibling;)if(d.nodeType===1)return false;return true;case "nth":c=b[2];var f=b[3];if(c===1&&f===0)return true;b=b[0];var e=a.parentNode;if(e&&(e.sizcache!==b||!a.nodeIndex)){var h=0;for(d=e.firstChild;d;d=d.nextSibling)if(d.nodeType===1)d.nodeIndex=++h;e.sizcache=b}a=a.nodeIndex-f;return c===0?a===0:a%c===0&&a/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,
b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1];a=i.attrHandle[c]?i.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c);c=a+"";var d=b[2];b=b[4];return a==null?d==="!=":d==="="?c===b:d==="*="?c.indexOf(b)>=0:d==="~="?(" "+c+" ").indexOf(b)>=0:!b?c&&a!==false:d==="!="?c!==b:d==="^="?c.indexOf(b)===0:d==="$="?c.substr(c.length-b.length)===b:d==="|="?c===b||c.substr(0,
b.length+1)===b+"-":false},POS:function(a,b,c,d){var f=i.setFilters[b[2]];if(f)return f(a,c,b,d)}}},F=i.match.POS;for(var u in i.match){i.match[u]=new RegExp(i.match[u].source+/(?![^\[]*\])(?![^\(]*\))/.source);i.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+i.match[u].source)}var r=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(document.documentElement.childNodes,0)}catch(H){r=function(a,b){b=b||[];if(B.call(a)==="[object Array]")Array.prototype.push.apply(b,
a);else if(typeof a.length==="number")for(var c=0,d=a.length;c<d;c++)b.push(a[c]);else for(c=0;a[c];c++)b.push(a[c]);return b}}var s;if(document.documentElement.compareDocumentPosition)s=function(a,b){if(!a.compareDocumentPosition||!b.compareDocumentPosition){if(a==b)m=true;return a.compareDocumentPosition?-1:1}a=a.compareDocumentPosition(b)&4?-1:a===b?0:1;if(a===0)m=true;return a};else if("sourceIndex"in document.documentElement)s=function(a,b){if(!a.sourceIndex||!b.sourceIndex){if(a==b)m=true;return a.sourceIndex?
-1:1}a=a.sourceIndex-b.sourceIndex;if(a===0)m=true;return a};else if(document.createRange)s=function(a,b){if(!a.ownerDocument||!b.ownerDocument){if(a==b)m=true;return a.ownerDocument?-1:1}var c=a.ownerDocument.createRange(),d=b.ownerDocument.createRange();c.setStart(a,0);c.setEnd(a,0);d.setStart(b,0);d.setEnd(b,0);a=c.compareBoundaryPoints(Range.START_TO_END,d);if(a===0)m=true;return a};(function(){var a=document.createElement("div"),b="script"+(new Date).getTime();a.innerHTML="<a name='"+b+"'/>";
var c=document.documentElement;c.insertBefore(a,c.firstChild);if(document.getElementById(b)){i.find.ID=function(d,f,e){if(typeof f.getElementById!=="undefined"&&!e)return(f=f.getElementById(d[1]))?f.id===d[1]||typeof f.getAttributeNode!=="undefined"&&f.getAttributeNode("id").nodeValue===d[1]?[f]:undefined:[]};i.filter.ID=function(d,f){var e=typeof d.getAttributeNode!=="undefined"&&d.getAttributeNode("id");return d.nodeType===1&&e&&e.nodeValue===f}}c.removeChild(a);c=a=null})();(function(){var a=document.createElement("div");
a.appendChild(document.createComment(""));if(a.getElementsByTagName("*").length>0)i.find.TAG=function(b,c){c=c.getElementsByTagName(b[1]);if(b[1]==="*"){b=[];for(var d=0;c[d];d++)c[d].nodeType===1&&b.push(c[d]);c=b}return c};a.innerHTML="<a href='#'></a>";if(a.firstChild&&typeof a.firstChild.getAttribute!=="undefined"&&a.firstChild.getAttribute("href")!=="#")i.attrHandle.href=function(b){return b.getAttribute("href",2)};a=null})();document.querySelectorAll&&function(){var a=k,b=document.createElement("div");
b.innerHTML="<p class='TEST'></p>";if(!(b.querySelectorAll&&b.querySelectorAll(".TEST").length===0)){k=function(d,f,e,h){f=f||document;if(!h&&f.nodeType===9&&!x(f))try{return r(f.querySelectorAll(d),e)}catch(g){}return a(d,f,e,h)};for(var c in a)k[c]=a[c];b=null}}();(function(){var a=document.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!a.getElementsByClassName||a.getElementsByClassName("e").length===0)){a.lastChild.className="e";if(a.getElementsByClassName("e").length!==
1){i.order.splice(1,0,"CLASS");i.find.CLASS=function(b,c,d){if(typeof c.getElementsByClassName!=="undefined"&&!d)return c.getElementsByClassName(b[1])};a=null}}})();var G=document.compareDocumentPosition?function(a,b){return a.compareDocumentPosition(b)&16}:function(a,b){return a!==b&&(a.contains?a.contains(b):true)},x=function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?a.nodeName!=="HTML":false},D=function(a,b){var c=[],d="",f;for(b=b.nodeType?[b]:b;f=i.match.PSEUDO.exec(a);){d+=f[0];
a=a.replace(i.match.PSEUDO,"")}a=i.relative[a]?a+"*":a;f=0;for(var e=b.length;f<e;f++)k(a,b[f],c);return k.filter(d,c)};Mandoo.__sizzle__=k})();

/* Core's internal use functions */
u.__extend__ = function (obj, ext) {
	for (var k in ext) if (ext.hasOwnProperty(k))
		obj[k] = ext[k];
	return obj; };

u.__clone__ = function (obj, deep) {
	if (obj instanceof Array)
		return obj.slice();
	if (obj.nodeType)
		return obj.cloneNode(!!deep);
	var _obj = {};
	for (var key in obj) if (obj.hasOwnProperty && obj.hasOwnProperty(key))
		_obj[key] = deep && typeof obj[key] === 'object' ?
			u.__clone__(obj[key]) :
			obj[key];
	return _obj; };

function indexOf(col, item) {
	for (var i = 0, l = col.length; i < l; i++)
		if (col[i] === item)
			return i;
	return -1; }

u.__clean__ = function (col) {
	for (var i = 0, l = col.length, array = col.__mandoo__ ? u() : []; i < l; i++)
	if (indexOf(array, col[i]) === -1)
		array.push(col[i]);
	return array; };

u.__error__ = function (msg) {
	throw "Mandoo: " + msg; };

/* Modularization system */
var coreEl = u.__sizzle__("script[src$=/mandoo/core.js]")[0];
if (coreEl) u.__path__ = coreEl.src.replace(/core\.js$/, '');
else u.__error__("bad script path; the mandoo core must be in '*/mandoo/core.js'");

u.__modules__ = {};

u.require = function () {
	for (var i = -1, js; arguments[++i];) if (!u.__modules__[arguments[i]]) {
		js = u.get(u.__path__ + 'plugins/' + arguments[i] + '/module.js', !1);
		js.failure ?
			u.__error__("module '" + arguments[i] + "' not found.") :
			u("body").append("script[type=text/javascript]", js.text).remove();
		u.__modules__[arguments[i]].info.hasCSS &&
			u("head").add("link", null, { rel: "stylesheet", type: "text/css",
				href: u.__path__ + 'plugins/' + arguments[i] + '/media/s.css' }); }};

u.Module = function (name, info, core, methods, init) {
	u.__modules__[name] = this;
	this.info = info;
	this.core = core;
	this.methods = methods;
	u.__extend__(u, core);
	u.__extend__(u.methods, methods);
	if (init)
		init.call(this); };

/* Class abstraction */
new u.Module('class', { version: u.__version__ },
{ Class: function (constr, data) {
	if (!data) {
		data = constr;
		constr = undefined; }
	var cls = data && typeof data.__init__ === 'function' ? data.__init__ : function () {};
	delete data.__init__;
	if (constr) {
		cls.prototype = new constr;
		cls.__super__ = constr; }
	for (var k in data)
		if (!k.indexOf('$'))
			cls[k.slice(1)] = data[k];
		else
			cls.prototype[k] = data[k];
	return cls; }});

/* Events */
new u.Module('event', { version: u.__version__ },
{ Event: u.Class({
	$register: function (constr, type, init) {
		if (!constr.__events__) constr.__events__ = {};
		constr.__events__[type] = init;
		constr.prototype.on = u.Event.ADD;
		constr.prototype.un = u.Event.REMOVE;
		constr.prototype.fire = u.Event.FIRE; },

	$ADD: function (types, callback) {
		if (this.__mandoo__) for (var i = -1; this[++i];)
			u.Event.ADD.call(this[i], types, callback);
		else {
			var i = (types = types.replace(/\s/g, '').split(',')).length, constr;
			this.events = this.events || {};
			while (i--) if (types[i]) {
				constr = this.nodeType ? u.__init__ : this.constructor;
				this.events[types[i]] = this.events[types[i]] || [];
				indexOf(this.events[types[i]], callback) === -1 &&
					this.events[types[i]].push(callback);
				constr.__events__ && constr.__events__[types[i]] &&
					constr.__events__[types[i]].call(this, types[i], callback); }}
		return this; },

	$REMOVE: function (types, callback) {
		if (this.__mandoo__) for (var i = -1; this[++i];)
			u.Event.REMOVE.call(this[i], types, callback);
		else {
		types = types.split(','); for (var t = -1, id; types[++t];)
			if (this.events && this.events[types[t]]) {
				id = indexOf(this.events[types[t]], callback);
				id !== -1 && this.events[types[t]].splice(id, 1); }}
		return this; },

	$FIRE: function (e, eventObject) {
		if (this.__mandoo__) for (var i = -1; this[++i];)
			u.Event.FIRE.call(this[i], e, eventObject);
		else
		if (typeof e === 'string') {
			for (var t = -1, types = e.split(','); types[++t];) {
				e = eventObject ? u.__clone__(eventObject) : {};
				if (eventObject && !e.preventDefault) {
					e.preventDefault = eventObject.preventDefault;
					e.stopPropagation = eventObject.stopPropagation; }
				e.type = types[t];
				u.Event.FIRE.call(this, e); }}
		else
		if (this.events && this.events[e.type]) for (var i = -1; this.events[e.type][++i];) {
			this.events[e.type][i].call(this, e); }
		return this; }
})});

/* XMLHttpRequests */
new u.Module('xmlhttprequest', { version: u.__version__ },
{ Request: u.Class({
	$__create__: function () {
		return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest; },

	__init__: function (url, options) {
		this.options = options = u.__extend__({
			async: !0,
			cache: !1,
			method: 'GET',
			json: !1 }, options || {});
		options.method = options.method.toUpperCase();
		var data = options.data;
		if (typeof data !== 'string') {
			var params = [];
			for (var k in data) if (data.hasOwnProperty(k))
				params.push(k + '=' + encodeURIComponent(data[k]));
			data = params.join('&'); }
		this.data = options.data;
		this.url = url += options.method === 'GET' ? (url.indexOf('?') > 0 ? '&' : '?') + data : '';
		var xhr = this.XMLHttpRequest = u.Request.__create__();
		options.username ?
			xhr.open(options.method, url, options.async, options.username, options.password) :
			xhr.open(options.method, url, options.async);
		!options.cache &&
			this.header('If-Modified-Since', 'Wed, 01 Jan 1997 00:00:00 GMT');
		options.method === 'POST' &&
			this.header('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(options.method === 'POST' ? data : null);
		if (options.async) {
			var this_ = this;
			xhr.onreadystatechange = function () {
				this_.__handle__(); }; }
		else
			this.__handle__(); },

	$__common__: function (method, url, options, data) {
		var fn, req;
		if (typeof options === 'function') {
			fn = options;
			options = {}; }
		else
		if (typeof options === 'boolean') {
			options = { async: options }; }
		options = options || {};
		options.method = method;
		req = new u.Request(url, options, data);
		fn && req.onfinish(fn);
		return req; },

	header: function (name, value) {
		var xhr = this.XMLHttpRequest;
		if (value) {
			xhr.setRequestHeader(name, value);
			return this; }
		else
			return xhr.getResponseHeader(name); },

	__handle__: function () {
		var xhr = this.XMLHttpRequest;
		this.options.async && this.fire('readystatechange');
		if (!this.options.async || xhr.readyState === 4) {
			this.text = xhr.responseText;
			this.xml = xhr.responseXML;
			this.json = null;
			if (this.options.json)
				try {
					this.json = this.text ? eval('(' + this.text + ')') : []; }
				catch (e) {
					u.__error__("invalid JSON data"); }
			this.failure = !(xhr.status === 200 || xhr.status === 304);
			this.fire('finish,'+(this.failure ? 'failure' : 'success')); }},

	abort: function () {
		delete this.XMLHttpRequest.onreadystatechange;
		this.XMLHttpRequest.abort();
		return this; }}),

	get: function (url, options, data) {
		return u.Request.__common__('get', url, options, data); },

	post: function (url, data, options) {
		return u.Request.__common__('post', url, options, data); }},
{},
function () {
	var t = 'failure,finish,readystatechange,success'.split(',');
	for (var i = -1; t[++i];)
		u.Event.register(this.core.Request, t[i]); });

/* DOM API */
new u.Module('dom', { version: u.__version__ },
{ DOM: {
	grab: u.__sizzle__,

	create: function (sel, txt, attrs) {
		if (sel.__mandoo__ || sel.nodeType)
			return u(sel);
		if (!sel)
			return u(document.createTextNode(txt || ''));
		attrs = attrs || {};
		var el, type, step;
		while (sel) {
			type = sel.charAt(0);
			step = u.DOM.grab.selectors.match[type =
				type === '#' ? 'ID' :
				type === '.' ? 'CLASS' :
				type === '[' ? 'ATTR' : 'TAG'
			].exec(sel);
			sel = sel.slice(step[0].length);
			type === 'TAG' ? el = u(document.createElement(step[1])) :
			type === 'ID' ? attrs.id = step[1] :
			type === 'CLASS' ? el.addClass(step[1]) :
			attrs[step[1]] = step[4]; }
		el.attr(attrs);
		txt !== null && el.text(txt);
		return el; }
}}, {
	has: function (els) {
		els = u(els);
		for (var i = -1; els[++i];) if (indexOf(this, els[i]) < 0)
			return !1;
		return !0; },

	filter: function (sel) {
		return u(u.DOM.grab.filter(sel, this)); },

	exclude: function (sel) {
		return u(u.DOM.grab.filter(sel, this, !1, !0)); },

	is: function (sel) {
		return sel && u.DOM.grab.filter(sel, this).length === this.length; },

	isChildOf: function (el) {
		el = u(el)[0];
		main:
		for (var i = -1, is = 0, node; node = this[++i];) {
			while (node = node.parentNode) if (node === el) {
				is = 1;
				continue main; }
			else if (!node) {
				is = 0;
				break main; }
			is = 0; }
		return !!is; },

	children: function (sel) {
		for (var i = -1, els = u(); this[++i];)
			els.merge(u.DOM.grab.filter(sel || "*", this[i].childNodes));
		return els; },

	neighbors: function (sel) {
		for (var i = -1, els = this.up().children(sel); this[++i];)
			els.splice(indexOf(els, this[i]), 1);
		return els; },

	all: function (sel) {
		for (var i = -1, els = u(); this[++i];)
			els.merge(u(sel || "*", this[i]));
		return u.__clean__(els); },

	nav: function (direction, crit) {
		crit = crit || 1;
		for (var i = -1, els = u(); this[++i];) {
			var el = this[i], walk = 0;
			if (typeof crit === 'string')
				crit = u.DOM.grab(crit);
			do (el =
				direction === 'prev' ? el.previousSibling :
				direction === 'next' ? el.nextSibling :
				direction === 'up' ? el.parentNode :
				direction === 'first' ? (!walk ? u.DOM.grab(':first', el)[0] : el.nextSibling) :
				direction === 'last' ? (!walk ? u.DOM.grab(':last', el)[0] : el.previousSibling) :
				null) && el.nodeType !== 3 && walk++;
			while (el && (crit ?
				typeof crit === 'number' ? walk < crit :
				indexOf(crit, el) < 0 :
				el.nodeType === 1));
			el && els.push(el); }
		return u.__clean__(els); },

	prev: function (crit) {
		return this.nav('prev', crit); },

	next: function (crit) {
		return this.nav('next', crit); },

	up: function (crit) {
		return this.nav('up', crit); },

	first: function (crit) {
		return this.nav('first', crit); },

	last: function (crit) {
		return this.nav('last', crit); },

	append: function (sel, txt, attrs) {
		for (var i = -1, all = u(), els; this[++i];) {
			all.merge(els = u.DOM.create(sel, txt, attrs).remove());
			for (var j = -1; els[++j];)
				this[i].appendChild(els[j]);
			if (sel.__mandoo__)
				break; }
		return all; },

	prepend: function (sel, txt, attrs) {
		for (var i = -1, all = u(), els; this[++i];) {
			all.merge(els = u.DOM.create(sel, txt, attrs).remove());
			for (var j = -1; els[++j];) this[i].firstChild ?
				this[i].insertBefore(els[j], this[i].firstChild) :
				this[i].appendChild(els[j]); }
		return all; },

	add: function (sel, txt, attrs) {
		this.append(sel, txt, attrs);
		return this; },

	appendTo: function (obj) {
		u(obj).append(this);
		return this; },

	before: function (sel, text, attrs) {
		for (var i = -1, all = u(), els; this[++i];) {
			all.merge(els = u.DOM.create(sel, text, attrs).remove());
			for (var j = -1; els[++j];)
				this[i].parentNode.insertBefore(els[j], this[i]); }
		return all; },

	after: function (sel, text, attrs) {
		for (var i = -1, all = u(), els; this[++i];) {
			all.merge(els = u.DOM.create(sel, text, attrs).remove());
			for (var j = -1; els[++j];) this[i].nextSibling ?
				this[i].parentNode.insertBefore(els[j], this[i].nextSibling) :
				this[i].parentNode.appendChild(els[j]); }
		return all; },

	empty: function () {
		for (var i = -1; this[++i];)
			while (this[i].firstChild)
				this[i].removeChild(this[i].firstChild);
		return this; },

	remove: function (perm) {
		for (var i = -1; this[++i];) {
			this[i].parentNode && this[i].parentNode.removeChild(this[i]);
			if (perm) {
				delete this[i];
				this.splice(i, 1); }}
		return this; },

	text: function (txt, add) {
		if (txt === undefined && this[0])
			return this[0].textContent || this[0].innerText || this[0].text;
		if (!add)
			this.empty();
		for (var i = -1; this[++i];)
		u.__support__.ua.ie && this[i].nodeName === "SCRIPT" ?
			this[i].text = txt :
			this[i].appendChild(this[i].ownerDocument.createTextNode('' + txt));
		return this; },

	addClass: function (cls, overwrite) {
		cls = cls.split(/\s+/);
		for (var i = -1; this[++i];) {
			if (overwrite) {
				this[i].className = cls.join(' ');
				continue; }
			for (var j = -1; cls[++j];)
			if ((' '+this[i].className+' ').indexOf(' '+cls[j]+' ') < 0)
				this[i].className += (this[i].className ? ' ' : '') + cls[j]; }
		return this; },

	rmClass: function (cls) {
		cls = cls.split(/\s+/);
		for (var i = -1; this[++i];) for (var j = -1; cls[++j];)
			this[i].className = (' '+this[i].className+' ').replace(' '+cls[j]+' ', ' ').replace(/^ | $/g, '');
		return this; },

	attr: function (name, value, style) {
		var attrs = name;
		if (typeof name === 'string') {
			name = u.__support__.attr(name);
			if (value === undefined && this[0]) {
				if (style)
					return u.__support__.specialStyles[name] ?
						u.__support__.specialStyles[name](this[0]) :
						this[0].currentStyle ?
							this[0].currentStyle[name] :
							document.defaultView.getComputedStyle(this[0], null)[name];
				else
					return this[0].getAttribute(name) || this[0][name]; }
			else {
				attrs = {};
				attrs[name] = value; }}
		var attrs_ = {}; for (name in attrs)
			attrs_[u.__support__.attr(name)] = attrs[name]; attrs = attrs_;
		for (var i = -1; this[++i];) for (name in attrs)
		if (style)
			u.__support__.specialStyles[name] ?
				u.__support__.specialStyles[name](this[i], attrs[name]) :
				this[i].style[name] = typeof attrs[name] === 'number' ? ~~attrs[name] + (name.indexOf('ndex') !== -1 ? 0 : 'px') : attrs[name];
		else
		if ('disabledvalue'.indexOf(name) !== -1)
			this[i][name] = attrs[name];
		else
			this[i].setAttribute(name, attrs[name]);
		return this; },

	css: function (name, value) {
		return this.attr(name, value, !0); },

	backup: function (name, style) {
		name = u.__support__.attr(name);
		for (var i = -1; this[++i];) {
			this[i].style_ = this[i].style_ || {};
			this[i].attrs_ = this[i].attrs_ || {};
			this[i][style ? 'style_' : 'attrs_'][name] = u(this[i]).attr(name, undefined, style); }
		return this; },

	restore: function (name, style) {
		name = u.__support__.attr(name);
		for (var i = -1; this[++i];) {
			u(this[i]).attr(name, this[i][style ? 'style_' : 'attrs_'][name], style);
			delete this[i][style ? 'style_' : 'attrs_'][name]; }
		return this; },

	clone: function (deep) {
		for (var i = -1, els = u(); this[++i];)
			els.push(u.__clone__(this[i], deep));
		return els; },

	serialize: function () {
		var data = {};
		for (var i = -1; this[++i];)
			for (var j = -1, inputs = u(":input", this[i]), name; inputs[++j];) {
				name = input.id || input.name;
				if (name)
					data[name] = input[0].value; }
		return data; },

	pos: function (coords, reference, scrolls) {
		if (coords === undefined) {
			var
			el = this[0],
			pos = {
				left: 0, right: el.offsetWidth,
				top: 0, bottom: el.offsetHeight };
			while (el.offsetParent) {
				pos.left += el.offsetLeft;
				pos.right += el.offsetLeft;
				pos.top += el.offsetTop;
				pos.bottom += el.offsetTop;
				el = el.offsetParent; }
			return pos; }
		else {
			if (coords instanceof Array)
				coords = { left: coords[0] || 0, top: coords[1] || 0 };
			if (reference === true) {
				scrolls = reference;
				reference = undefined;}
			for (var i = -1, refpos, refsize, size, main; this[++i];) {
				main = this[i].parentNode.nodeName === "BODY";
				refpos = main ? u(reference || "html").pos() :
					{ left: 0, right: this[0].parentNode.clientWidth,
					  top: 0, bottom: this[0].parentNode.clientHeight };
				refsize = u(main ? reference || "html" : this[i].parentNode).size(scrolls);
				size = u(this[i]).size();
				this[i].style.left =
					main * refpos.left + (typeof coords.left === 'number' ? coords.left :
					eval(coords.left
						.replace('left', 0)
						.replace('center', (refsize.width >> 1) - (size.width >> 1))
						.replace('right', refpos.right - refpos.left - size.width)
						.replace('width', size.width))) + 'px';
				this[i].style.top =
					main * refpos.top + (typeof coords.top === 'number' ? coords.top :
					eval(coords.top
						.replace('top', 0)
						.replace('middle', (refsize.height >> 1) - (size.height >> 1))
						.replace('bottom', refpos.bottom - refpos.top - size.height)
						.replace('height', size.height))) + 'px'; }}
		return this; },

	size: function (scrolls) {
		if (scrolls && (scrolls.width !== undefined || scrolls.height !== undefined)) {
			for (var i = -1; this[++i];) {
				this[i].style.width = scrolls.width + 'px';
				this[i].style.top = scrolls.height + 'px'; }
			return this; }
		if (this[0]) return {
			width: Math.max(!!scrolls * this[0].scrollWidth, this[0].clientWidth),
			height: Math.max(!!scrolls * this[0].scrollHeight, this[0].clientHeight) }; },

	show: function (force) {
		return this.css('display', force ? 'block' : ''); },

	hide: function () {
		return this.css('display', 'none'); },

	toggle: function () {
		for (var i = -1; this[++i];)
			u(this[i])[u(this[i]).css('display') === 'none' ? 'show' : 'hide']();
		return this; }
},
function () {
	function addEvent(type) {
		if (this.addEventListener)
			this.addEventListener(type, u.Event.FIRE, !1);
		else {
			var el = this;
			this.attachEvent('on' + type, function () {
				u.Event.FIRE.call(el, u.__support__.event(window.event)); }); }}
	for (var i = -1, t = 'blur,change,click,dblclick,focus,keydown,keypress,keyup,load,mousedown,mousemove,mouseout,mouseover,mouseup,reset,scroll,submit'.split(','); t[++i];)
		u.Event.register(u.__init__, t[i], addEvent);
	// some custom events
	u.Event.register(u.__init__, 'clickout', function () {
		var el = this;
		u(document).on('click', function (e) {
			if (u(el).up('html')[0] && e.target !== el && !u(e.target).isChildOf(el))
				u(el).fire('clickout', e); }); });
	u.Event.register(u.__init__, 'mouseenter', function () {
		u(this).on('mouseover', function (e) {
			e.relatedTarget !== this && !u(e.relatedTarget).isChildOf(this) &&
				u(this).fire('mouseenter', e); }); });
	u.Event.register(u.__init__, 'mouseleave', function () {
		u(this).on('mouseout', function (e) {
			e.relatedTarget !== this && !u(e.relatedTarget).isChildOf(this) &&
				u(this).fire('mouseleave', e); }); });
});

function makeBezier() {
	var arguments_ = Array.prototype.slice.call(arguments);
	return function (d, f) {
		for (var i = 1, values = []; i <= f; i++)
			values.push(d * u.Anim.BEZIER(arguments_, i / f));
		return values; }}

new u.Module('animation', { version: u.__version__ },
{ Anim: u.Class({
	__init__: function (el, props, options) {
		this.options = u.__extend__({
			reverse: !1,
			queue: !1,
			relative: !1,
			proportional: !1,
			hide: !1,
			restore: !1,
			destroy: !1
		}, options || {});
		this.element = el;
		el.animations = el.animations || [];
		for (var i = el.animations.length; el.animations[--i];) {
			if (this.options.queue) {
				this.properties = props;
				return (this.element.animations.queued = this.element.animations.queued || []).push(this); }
			for (var p in props) {
				p = u.__support__.attr(p);
				if (el.animations[i].properties[p])
					delete el.animations[i].properties[p]; }}
		var props_ = this.properties = {}, from = 0, to = 0, l = 0, p, p_;
		for (p in props) { p_ = props_[u.__support__.attr(p)] = {};
			p_.isScroll = !p.indexOf('scroll');
			p_.isColor = p.indexOf('olor') !== -1;
			p_.from = props[p].from === undefined ? (p_.isScroll ? el[p] : p_.isColor ? u(el).css(p) : parseFloat(u(el).css(p)) || ' width height '.indexOf(' ' + p + ' ') !== -1 && el[('offset-' + p).replace(CAMELCASE.R, CAMELCASE.FN)] || 0) : props[p].from;
			p_.to = props[p].to === undefined ? props[p] : props[p].to;
			p_.easing = props[p].easing || this.options.easing || u.Anim.easings.SMOOTH;
			for (var k in this.options)
				p_[k] = props[p][k] !== undefined ? props[p][k] : this.options[k];
			if (p_.isColor) {
				p_.from = u.Anim.colors.parse(p_.from);
				p_.to = u.Anim.colors.parse(p_.to); }
			if (p_.reverse) {
				var aux = p_.to;
				p_.to = p_.from; p_.from = aux; }
			if (!p_.isColor) {
				if (p_.relative) p_.to += p_.from;
				if (p_.proportional) p_.to *= p_.from / 100; }
			if (''+p_.from === ''+p_.to)
				delete p_;
			else {
				from += p_.isColor ? 0 : p_.from * (p === 'opacity' ? 100 : 1);
				to += p_.isColor ? 100 : p_.to * (p === 'opacity' ? 100 : 1);
				l++; }}
		this.duration = this.options.duration || ~~(Math.abs((to - from) / l) / (u.Anim.SPEEDS[this.options.speed] || this.options.speed || 100) * 1e3);
		this.frames = Math.ceil(this.duration / 1000 * (this.options.framerate || 24));
		if (!this.frames)
			this.stop();
		else {
			for (p in props_) {
				props_[p].values = props_[p].isColor ?
					u.Anim.colors.GRADIENT(props_[p].from, props_[p].to, this.frames) :
					props_[p].easing(props_[p].to - props_[p].from, this.frames); }
			el.animations.push(this);
			this.startTime = +new Date;
			u(el).fire('animationstart', this);
			var frame = 1, this_ = this;
			this.id = setInterval(function () { if (!this_.paused) {
				if (this_.frames === frame)
					this_.stop();
				else {
				for (var p in props_)
					props_[p].isScroll ?
						el[p] = props_[p].from + props_[p].values[frame] :
						u(el).css(p, (props_[p].isColor ? '' : props_[p].from) + props_[p].values[frame]);
				frame === 1 && u(el).show();
				u(el).fire('animation', this_);
				frame++; }
			}}, this.duration / this.frames); }},

	$SPEEDS: {
		slowest: 25, slower: 50, slow: 75,
		fast: 150, faster: 200, fastest: 300 },

	$BEZIER: function (points, t) {
		for (var i = 0, n = points.length - 1, value = 0; i < points.length; i++)
			value += (i && i !== n ? n : 1) * Math.pow(1 - t, n - i) * Math.pow(t, i) * points[i];
		return value; },

	$easings: {
		LINEAR: function (d, frames) {
			for (var i = 1, values = []; i <= frames; i++)
				values.push(Math.ceil(d / frames * i));
			return values; },
		SMOOTH: makeBezier(0, 0, 1, 1),
		ACCELERATED: makeBezier(0, 0, 1),
		IMPULSE: makeBezier(0, -.5, 1),
		SPLASH: makeBezier(0, 1.5, 1)},

	$makeBezier: makeBezier,

	$makeBounce: function (bounces) {
	return function (d, f) {
		for (var i = 1, values = []; i <= f; i++)
			values.push(d * u.Anim.BEZIER([0, 0, 1], 1 - Math.abs(Math.cos((~~bounces - .5) * i / f * Math.PI)) * Math.pow(1 - i / f, 2)));
		return values; }},

	$makeCycle: function (times) {
	return function (d, f) {
		for (var i = 1, values = []; i <= f; i++)
			values.push(d * u.Anim.BEZIER([0, 1, 1], 1 - Math.abs(Math.cos(~~times * i / f * Math.PI))))
		return values; }},

	$colors: {
		WEBSAFE: {
			aqua: [0,255,255], azure: [240,255,255], beige: [245,245,220],
			black: [0,0,0], blue: [0,0,255], brown: [165,42,42],
			cyan: [0,255,255], darkblue: [0,0,139], darkcyan: [0,139,139],
			darkgrey: [169,169,169], darkgreen: [0,100,0], darkkhaki: [189,183,107],
			darkmagenta: [139,0,139], darkolivegreen: [85,107,47], darkorange: [255,140,0],
			darkorchid: [153,50,204], darkred: [139,0,0], darksalmon: [233,150,122],
			darkviolet: [148,0,211], fuchsia: [255,0,255], gold: [255,215,0],
			green: [0,128,0], indigo: [75,0,130], khaki: [240,230,140],
			lightblue: [173,216,230], lightcyan: [224,255,255], lightgreen: [144,238,144],
			lightgrey: [211,211,211], lightpink: [255,182,193], lightyellow: [255,255,224],
			lime: [0,255,0], magenta: [255,0,255], maroon: [128,0,0],
			navy: [0,0,128], olive: [128,128,0], orange: [255,165,0],
			pink: [255,192,203], purple: [128,0,128], violet: [128,0,128],
			red: [255,0,0], silver: [192,192,192], white: [255,255,255], yellow: [255,255,0] },

		parse: function (color) {
			if (u.Anim.colors.WEBSAFE[color])
				return color = u.Anim.colors.WEBSAFE[color];
			if (hex = +!color.indexOf('#')) {
				color = color.slice(1);
				if (color.length === 3) color = color.replace(/(.)/g, '$1$1');
				color = +('0x' + color);
				return [color >> 16, color >> 8 & 0xff, color & 0xff]; }
			if (!color.indexOf('rgb')) {
				for (var c = 0, color = color.match(/(\d+)/g); c < 3; c++)
					color[c] >>= 0;
				return color; }
			u.__error__("invalid color."); },

		GRADIENT: function (from, to, frames) {
			for (var i = 1, values = [], color, c, step; i <= frames; i++) {
				for (c = 0, color = []; c < 3; c++)
					color.push(from[c] + ~~((to[c] - from[c]) / frames * i));
				values.push('rgb(' + color + ')'); }
			return values; }},

	pause: function () {
		this.paused = !0;
		this.fire('pause', this);
		return this; },

	play: function () {
		this.paused = !1;
		this.fire('resume', this);
		return this; },

	stop: function () {
		clearInterval(this.id);
		this.endTime = +new Date;
		this.element.animations.splice(indexOf(this.element.animations, this), 1);
		this.fire('finish', this);
		u(this.element).fire('animationfinish', this);
		this.options.hide && u(this.element).hide();
		for (var k in this.properties) if (this.properties[k].restore)
			u(this.element).css(k, this.properties[k].from);
		this.options.destroy && u(this.element).remove();
		if (this.element.animations.queued && this.element.animations.queued.length) {
			var anim = this.element.animations.queued.shift();
			new u.Anim(this.element, anim.properties, anim.options).events = anim.events; }
		return this; }
})}, {
	anim: function (props, options, callback) {
		if (typeof options === 'function')
			callback = options, options = u.__clone__(callback);
		for (var i = -1, anims = [], a; this[++i];) {
			anims.push(a = new u.Anim(this[i], props, options));
			callback && a.on('finish', callback); }
		return anims; },

	hover: function (props, options) {
		for (var k in props)
			u(this).backup(k, !0);
		return this.on('mouseenter,mouseleave', function (e) {
			if (e.type === 'mouseleave') {
				var props_ = {}; for (var k in props)
					props_[k] = this.style_[u.__support__.attr(k)]; }
			u(this).anim(props_ || props, options); }); }
},
function () {
	for (var i = -1, t = 'pause,resume,finish'.split(','); t[++i];)
		u.Event.register(u.Anim, t[i]);
});

/* Some workaround code */
var CAMELCASE = {
	R: /\W([a-z])/g,
	FN: function (a, l) {
		return l.toUpperCase(); }};

u.__support__ = {
	ua: {
		ie: window.attachEvent && !window.opera,
		iphone: navigator.userAgent.indexOf('iPhone') > -1,
		opera: window.opera },

	attr: function (name) {
		return (u.__support__.attrs[name] || name).replace(CAMELCASE.R, CAMELCASE.FN); },

	event: function (e) {
		return u.__extend__(e, {
			charCode: e.type === 'keypress' ? e.keyCode : 0,
			eventPhase: 2,
			isChar: e.keyCode > 0,
			pageX: e.clientX + document.body.scrollLeft,
			pageY: e.clientY + document.body.scrollTop,
			target: e.srcElement,
			relatedTarget: e.type === 'mouseover' ? e.fromElement : e.toElement,
			timeStamp: +new Date,
			preventDefault: function () { this.returnValue = !1; },
			stopPropagation: function () { this.cancelBubble = !0; }}); }};

u.__support__.attrs = {
	'cellspacing': 'cellSpacing',
	'class': u.__support__.ua.ie? 'className' : 'class',
	'float': u.__support__.ua.ie? 'styleFloat' : 'cssFloat',
	'for': 'htmlFor',
	'maxlength': 'maxLength',
	'readonly': 'readOnly',
	'rowspan': 'rowSpan' };

u.__support__.specialStyles = {
	opacity: function (el, value) {
		if (value === undefined)
			return el.filters ?
				el.filters.alpha ?
					el.filters.alpha.opacity / 100 : 1 :
				+document.defaultView.getComputedStyle(el, null).opacity;
		if (el.filters) {
			el.style.zoom = 1;
			el.filters.alpha ?
				el.filters.alpha.opacity = value * 100 :
				el.style.filter += ' alpha(opacity=' + value * 100 + ')'; }
		else
			el.style.opacity = value; },

	backgroundPositionX: function (el, value) {
		var v = u(el).css('backgroundPosition') || '0 0';
		if (value === undefined)
			return parseInt(v.split(' ')[0]);
		else
			el.style.backgroundPosition = value + 'px ' + v.split(' ')[1]; },

	backgroundPositionY: function (el, value) {
		var v = u(el).css('backgroundPosition') || '0 0';
		if (value === undefined)
			return parseInt(v.split(' ')[1]);
		else
			el.style.backgroundPosition = v.split(' ')[0] + ' ' + value + 'px'; }
};

window.u = u;
})(Mandoo);
