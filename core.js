/*!
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 *
 * Compiled with Google Closure Compiler at 2010-11-08
 */
(function(){function y(a,b,c,d,e,f){e=0;for(var g=d.length;e<g;e++){var h=d[e];if(h){h=h[a];for(var k=false;h;){if(h.sizcache===c){k=d[h.sizset];break}if(h.nodeType===1&&!f){h.sizcache=c;h.sizset=e}if(h.nodeName.toLowerCase()===b){k=h;break}h=h[a]}d[e]=k}}}function z(a,b,c,d,e,f){e=0;for(var g=d.length;e<g;e++){var h=d[e];if(h){h=h[a];for(var k=false;h;){if(h.sizcache===c){k=d[h.sizset];break}if(h.nodeType===1){if(!f){h.sizcache=c;h.sizset=e}if(typeof b!=="string"){if(h===b){k=true;break}}else if(i.filter(b,
[h]).length>0){k=h;break}}h=h[a]}d[e]=k}}}var w=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,x=0,A=Object.prototype.toString,t=false,B=true;[0,0].sort(function(){B=false;return 0});var i=function(a,b,c,d){c=c||[];var e=b=b||document;if(b.nodeType!==1&&b.nodeType!==9)return[];if(!a||typeof a!=="string")return c;var f=[],g,h,k,n,m=true,p=i.isXML(b),o=a,l;do{w.exec("");if(g=w.exec(o)){o=g[3];f.push(g[1]);if(g[2]){n=
g[3];break}}}while(g);if(f.length>1&&E.exec(a))if(f.length===2&&j.relative[f[0]])h=C(f[0]+f[1],b);else for(h=j.relative[f[0]]?[b]:i(f.shift(),b);f.length;){a=f.shift();if(j.relative[a])a+=f.shift();h=C(a,h)}else{if(!d&&f.length>1&&b.nodeType===9&&!p&&j.match.ID.test(f[0])&&!j.match.ID.test(f[f.length-1])){g=i.find(f.shift(),b,p);b=g.expr?i.filter(g.expr,g.set)[0]:g.set[0]}if(b){g=d?{expr:f.pop(),set:q(d)}:i.find(f.pop(),f.length===1&&(f[0]==="~"||f[0]==="+")&&b.parentNode?b.parentNode:b,p);h=g.expr?
i.filter(g.expr,g.set):g.set;if(f.length>0)k=q(h);else m=false;for(;f.length;){g=l=f.pop();if(j.relative[l])g=f.pop();else l="";if(g==null)g=b;j.relative[l](k,g,p)}}else k=[]}k||(k=h);k||i.error(l||a);if(A.call(k)==="[object Array]")if(m)if(b&&b.nodeType===1)for(a=0;k[a]!=null;a++){if(k[a]&&(k[a]===true||k[a].nodeType===1&&i.contains(b,k[a])))c.push(h[a])}else for(a=0;k[a]!=null;a++)k[a]&&k[a].nodeType===1&&c.push(h[a]);else c.push.apply(c,k);else q(k,c);if(n){i(n,e,c,d);i.uniqueSort(c)}return c};
i.uniqueSort=function(a){if(u){t=B;a.sort(u);if(t)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a};i.matches=function(a,b){return i(a,null,null,b)};i.matchesSelector=function(a,b){return i(b,null,null,[a]).length>0};i.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=j.order.length;e<f;e++){var g=j.order[e],h;if(h=j.leftMatch[g].exec(a)){var k=h[1];h.splice(1,1);if(k.substr(k.length-1)!=="\\"){h[1]=(h[1]||"").replace(/\\/g,"");d=j.find[g](h,b,c);if(d!=null){a=a.replace(j.match[g],
"");break}}}}d||(d=b.getElementsByTagName("*"));return{set:d,expr:a}};i.filter=function(a,b,c,d){for(var e=a,f=[],g=b,h,k,n=b&&b[0]&&i.isXML(b[0]);a&&b.length;){for(var m in j.filter)if((h=j.leftMatch[m].exec(a))!=null&&h[2]){var p=j.filter[m],o,l;l=h[1];k=false;h.splice(1,1);if(l.substr(l.length-1)!=="\\"){if(g===f)f=[];if(j.preFilter[m])if(h=j.preFilter[m](h,g,c,f,d,n)){if(h===true)continue}else k=o=true;if(h)for(var v=0;(l=g[v])!=null;v++)if(l){o=p(l,h,v,g);var D=d^!!o;if(c&&o!=null)if(D)k=true;
else g[v]=false;else if(D){f.push(l);k=true}}if(o!==undefined){c||(g=f);a=a.replace(j.match[m],"");if(!k)return[];break}}}if(a===e)if(k==null)i.error(a);else break;e=a}return g};i.error=function(a){throw"Syntax error, unrecognized expression: "+a;};var j=i.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")}},relative:{"+":function(a,b){var c=typeof b==="string",d=c&&!/\W/.test(b);c=c&&!d;if(d)b=b.toLowerCase();d=0;for(var e=a.length,
f;d<e;d++)if(f=a[d]){for(;(f=f.previousSibling)&&f.nodeType!==1;);a[d]=c||f&&f.nodeName.toLowerCase()===b?f||false:f===b}c&&i.filter(b,a,true)},">":function(a,b){var c=typeof b==="string",d,e=0,f=a.length;if(c&&!/\W/.test(b))for(b=b.toLowerCase();e<f;e++){if(d=a[e]){c=d.parentNode;a[e]=c.nodeName.toLowerCase()===b?c:false}}else{for(;e<f;e++)if(d=a[e])a[e]=c?d.parentNode:d.parentNode===b;c&&i.filter(b,a,true)}},"":function(a,b,c){var d=x++,e=z,f;if(typeof b==="string"&&!/\W/.test(b)){f=b=b.toLowerCase();
e=y}e("parentNode",b,d,a,f,c)},"~":function(a,b,c){var d=x++,e=z,f;if(typeof b==="string"&&!/\W/.test(b)){f=b=b.toLowerCase();e=y}e("previousSibling",b,d,a,f,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c)return(a=b.getElementById(a[1]))&&a.parentNode?[a]:[]},NAME:function(a,b){if(typeof b.getElementsByName!=="undefined"){for(var c=[],d=b.getElementsByName(a[1]),e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,
b){return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(/\\/g,"")+" ";if(f)return a;f=0;for(var g;(g=b[f])!=null;f++)if(g)if(e^(g.className&&(" "+g.className+" ").replace(/[\t\n]/g," ").indexOf(a)>=0))c||d.push(g);else if(c)b[f]=false;return false},ID:function(a){return a[1].replace(/\\/g,"")},TAG:function(a){return a[1].toLowerCase()},CHILD:function(a){if(a[1]==="nth"){var b=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&
"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0;a[3]=b[3]-0}a[0]=x++;return a},ATTR:function(a,b,c,d,e,f){b=a[1].replace(/\\/g,"");if(!f&&j.attrMap[b])a[1]=j.attrMap[b];if(a[2]==="~=")a[4]=" "+a[4]+" ";return a},PSEUDO:function(a,b,c,d,e){if(a[1]==="not")if((w.exec(a[3])||"").length>1||/^\w/.test(a[3]))a[3]=i(a[3],null,null,b);else{a=i.filter(a[3],b,c,true^e);c||d.push.apply(d,a);return false}else if(j.match.POS.test(a[0])||j.match.CHILD.test(a[0]))return true;return a},POS:function(a){a.unshift(true);return a}},
filters:{enabled:function(a){return a.disabled===false&&a.type!=="hidden"},disabled:function(a){return a.disabled===true},checked:function(a){return a.checked===true},selected:function(a){return a.selected===true},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!i(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){return"text"===a.type},radio:function(a){return"radio"===a.type},checkbox:function(a){return"checkbox"===
a.type},file:function(a){return"file"===a.type},password:function(a){return"password"===a.type},submit:function(a){return"submit"===a.type},image:function(a){return"image"===a.type},reset:function(a){return"reset"===a.type},button:function(a){return"button"===a.type||a.nodeName.toLowerCase()==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===
0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=j.filters[e];if(f)return f(a,c,b,d);else if(e==="contains")return(a.textContent||a.innerText||i.getText([a])||"").indexOf(b[3])>=0;else if(e==="not"){b=b[3];c=0;for(d=b.length;c<d;c++)if(b[c]===a)return false;return true}else i.error("Syntax error, unrecognized expression: "+
e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case "only":case "first":for(;d=d.previousSibling;)if(d.nodeType===1)return false;if(c==="first")return true;d=a;case "last":for(;d=d.nextSibling;)if(d.nodeType===1)return false;return true;case "nth":c=b[2];var e=b[3];if(c===1&&e===0)return true;var f=b[0],g=a.parentNode;if(g&&(g.sizcache!==f||!a.nodeIndex)){var h=0;for(d=g.firstChild;d;d=d.nextSibling)if(d.nodeType===1)d.nodeIndex=++h;g.sizcache=f}d=a.nodeIndex-e;return c===0?d===0:d%c===0&&d/c>=
0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1];c=j.attrHandle[c]?j.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c);var d=c+"",e=b[2],f=b[4];return c==null?e==="!=":e==="="?d===f:e==="*="?d.indexOf(f)>=0:e==="~="?(" "+d+" ").indexOf(f)>=0:!f?d&&c!==false:e==="!="?d!==f:e==="^="?
d.indexOf(f)===0:e==="$="?d.substr(d.length-f.length)===f:e==="|="?d===f||d.substr(0,f.length+1)===f+"-":false},POS:function(a,b,c,d){var e=j.setFilters[b[2]];if(e)return e(a,c,b,d)}}},E=j.match.POS,F=function(a,b){return"\\"+(b-0+1)},r;for(r in j.match){j.match[r]=RegExp(j.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source);j.leftMatch[r]=RegExp(/(^(?:.|\r|\n)*?)/.source+j.match[r].source.replace(/\\(\d+)/g,F))}var q=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};
try{Array.prototype.slice.call(document.documentElement.childNodes,0)}catch(G){q=function(a,b){var c=b||[],d=0;if(A.call(a)==="[object Array]")Array.prototype.push.apply(c,a);else if(typeof a.length==="number")for(var e=a.length;d<e;d++)c.push(a[d]);else for(;a[d];d++)c.push(a[d]);return c}}var u,s;if(document.documentElement.compareDocumentPosition)u=function(a,b){if(a===b){t=true;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&
4?-1:1};else{u=function(a,b){var c=[],d=[],e=a.parentNode,f=b.parentNode,g=e;if(a===b){t=true;return 0}else if(e===f)return s(a,b);else if(e){if(!f)return 1}else return-1;for(;g;){c.unshift(g);g=g.parentNode}for(g=f;g;){d.unshift(g);g=g.parentNode}e=c.length;f=d.length;for(g=0;g<e&&g<f;g++)if(c[g]!==d[g])return s(c[g],d[g]);return g===e?s(a,d[g],-1):s(c[g],b,1)};s=function(a,b,c){if(a===b)return c;for(a=a.nextSibling;a;){if(a===b)return-1;a=a.nextSibling}return 1}}i.getText=function(a){for(var b=
"",c,d=0;a[d];d++){c=a[d];if(c.nodeType===3||c.nodeType===4)b+=c.nodeValue;else if(c.nodeType!==8)b+=i.getText(c.childNodes)}return b};(function(){var a=document.createElement("div"),b="script"+(new Date).getTime();a.innerHTML="<a name='"+b+"'/>";var c=document.documentElement;c.insertBefore(a,c.firstChild);if(document.getElementById(b)){j.find.ID=function(d,e,f){if(typeof e.getElementById!=="undefined"&&!f)return(e=e.getElementById(d[1]))?e.id===d[1]||typeof e.getAttributeNode!=="undefined"&&e.getAttributeNode("id").nodeValue===
d[1]?[e]:undefined:[]};j.filter.ID=function(d,e){var f=typeof d.getAttributeNode!=="undefined"&&d.getAttributeNode("id");return d.nodeType===1&&f&&f.nodeValue===e}}c.removeChild(a);c=a=null})();(function(){var a=document.createElement("div");a.appendChild(document.createComment(""));if(a.getElementsByTagName("*").length>0)j.find.TAG=function(b,c){var d=c.getElementsByTagName(b[1]);if(b[1]==="*"){for(var e=[],f=0;d[f];f++)d[f].nodeType===1&&e.push(d[f]);d=e}return d};a.innerHTML="<a href='#'></a>";
if(a.firstChild&&typeof a.firstChild.getAttribute!=="undefined"&&a.firstChild.getAttribute("href")!=="#")j.attrHandle.href=function(b){return b.getAttribute("href",2)};a=null})();document.querySelectorAll&&function(){var a=i,b=document.createElement("div");b.innerHTML="<p class='TEST'></p>";if(!(b.querySelectorAll&&b.querySelectorAll(".TEST").length===0)){i=function(d,e,f,g){e=e||document;if(!g&&!i.isXML(e))if(e.nodeType===9)try{return q(e.querySelectorAll(d),f)}catch(h){}else if(e.nodeType===1&&
e.nodeName.toLowerCase()!=="object"){var k=e.getAttribute("id"),n=k||"__sizzle__";k||e.setAttribute("id",n);try{return q(e.querySelectorAll("#"+n+" "+d),f)}catch(m){}finally{k||e.removeAttribute("id")}}return a(d,e,f,g)};for(var c in a)i[c]=a[c];b=null}}();(function(){var a=document.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector,c=false;try{b.call(document.documentElement,"[test!='']:sizzle")}catch(d){c=true}if(b)i.matchesSelector=function(e,
f){if(!i.isXML(e))try{if(c||!j.match.PSEUDO.test(f)&&!/!=/.test(f))return b.call(e,f)}catch(g){}return i(f,null,null,[e]).length>0}})();(function(){var a=document.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!a.getElementsByClassName||a.getElementsByClassName("e").length===0)){a.lastChild.className="e";if(a.getElementsByClassName("e").length!==1){j.order.splice(1,0,"CLASS");j.find.CLASS=function(b,c,d){if(typeof c.getElementsByClassName!=="undefined"&&
!d)return c.getElementsByClassName(b[1])};a=null}}})();i.contains=document.documentElement.contains?function(a,b){return a!==b&&(a.contains?a.contains(b):true)}:document.documentElement.compareDocumentPosition?function(a,b){return!!(a.compareDocumentPosition(b)&16)}:function(){return false};i.isXML=function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?a.nodeName!=="HTML":false};var C=function(a,b){for(var c=[],d="",e,f=b.nodeType?[b]:b;e=j.match.PSEUDO.exec(a);){d+=e[0];a=a.replace(j.match.PSEUDO,
"")}a=j.relative[a]?a+"*":a;e=0;for(var g=f.length;e<g;e++)i(a,f[e],c);return i.filter(d,c)};window.Sizzle=i})();

/* Mandoo JavaScript Library
 * Copyright (c) 2010 Evandro Myller (emyller.net)
 * Mandoo is licensed under the MIT license.

 * Version 3.0 dev

 * Visit http://mandoojs.com/.
*/

(function () {

// internal use

function _extend(main, ext)
{
	for (var k in ext)
	if (ext.hasOwnProperty(k))
		main[k] = ext[k];
}

function _index(item)
{
	for (var i = 0, _i = col.length; ++i < _i;)
	if (col[i] === item)
		return i;
	return -1;
}

function _class(parent, members)
{
	var a, constructor, k;

	a = parent;
	parent = typeof parent === 'function' ? parent : null;
	members = members || a || {};

	constructor = members.__init__ || function () {};
	delete members.__init__;

	if (parent) {
		constructor.prototype = new parent;
		constructor.__parent__ = parent;
		(parent.__subclasses__ = parent.__subclasses__ || []).push(constructor);
	}

	if (members)
		for (k in members)
		if (members.hasOwnProperty(k))
			if (k.indexOf('$'))
				constructor.prototype[k] = members[k];
			else
				constructor[k.slice(1)] = members[k];

	constructor.prototype['constructor'] = constructor;

	return constructor
}

function _computedStyle(el, attr) {
	return el.currentStyle
		? el.currentStyle[attr]
		: document.defaultView.getComputedStyle(el, null)[attr]
}

// magic starts here

// Sizzle extensions
_extend(Sizzle.selectors.filters,
{
	visible:
	function (el) {
		return el.offsetHeight !== 0 || el.offsetWidth !== 0
	},

	animated:
	function (el) {
		return el.animations && el.animations.length
	}
})

Mandoo = _class(
{
	$VERSION: 3,

	__init__:
	function (selector, context)
	{
		if (selector.__mandoo__)
			return selector
		if (!selector)
			return this

		if (typeof selector === 'string')
			this.push.apply(this, Mandoo.dom.grab(selector,
				context ? new Mandoo(context)[0] : document))
		else
		if (selector.nodeType || selector === window)
			this.push(selector)
		else
		if (selector.length)
			this.push.apply(this, selector)
	},

	$__extend__:
	function (members)
	{
		_extend(Mandoo.prototype, members)
	}
});

_extend(Mandoo.prototype = [],
{
	__mandoo__: true,

	index: Array.prototype.indexOf ||
	function (el) {
		return _index(this, el)
	},

	slice:
	function ()
	{
		return new Mandoo(Array.prototype.slice.apply(this, arguments))
	},

	merge:
	function ()
	{
		for (var i = 0, _i = arguments.length; i < _i; i++)
			for (var j = 0, _j = arguments[i].length; j < _j; j++)
			if (this.index(arguments[i][j]) !== -1)
				this.push(arguments[i][j]);
		return this
	}
});


// Make the helper functions usable outside
_extend(Mandoo, {
	Class: _class,
	_priv: { extend: _extend, index: _index }
});

/* CORE MODULES
 * the Mandoo core has a small set of built-in modules: dom, xhr and animation.
*/

Mandoo.dom = {
	grab:
	function (selector, context) {
		return Sizzle(selector, context)
	}
};
Mandoo.__extend__({
	attr:
	function (attr) {
		if (typeof attr === 'string')
			return this[0].getAttribute(attr);

		var k, i;
		for (k in attr)
			for (i = -1; this[++i];)
			if (k === 'value' || k === 'disabled')
				this[i][k] = attr[k];
			else
				this[i].setAttribute(k, attr[k]);
		return this
	},

	collect:
	function (attr_name) {
		for (var i = -1, result = []; this[++i];)
			result.push(new Mandoo(this[i]).attr(attr_name));
		return result
	},

	empty:
	function () {
		for (var i = -1; this[++i];)
		if (this[i].nodeName === 'INPUT')
			this[i].value = '';
		else
			while (this[i].firstChild)
				this[i].removeChild(this[i].firstChild);
		return this
	},

	rm:
	function ()
	{
		for (var i = -1; this[++i];)
			this[i].parentNode.removeChild(this[i]);
		return this
	},

	style:
	function (attr)
	{
		var value;
		if (typeof attr === 'string') {
			value = this[0].style[attr];
			if (typeof value !== 'undefined')
				return value
			return _computedStyle(this[0], attr)
		}

		var k, i;
		for (k in attr)
			for (i = -1; this[++i];)
				this.style[k] = attr[k];
		return this
	},

	text:
	function (value) {
		if (typeof value === 'undefined') {
			if (this[0].nodeName === 'INPUT')
				return this[0].value;
			return this[0].textContent || this[0].innerText || this[0].value
		}

		var i;
		this.empty()
		for (i = -1; this[++i];)
			if (this[i].nodeName === 'INPUT')
				this[i].value = value;
			else
				this[i].appendChild(this[i].ownerDocument
					.createTextNode(value));
		return this
	}
})

Mandoo.xhr = {

}

Mandoo.animation = {

}

})();

m = function (s, c) { return new Mandoo(s, c) };
