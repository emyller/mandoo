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
	if (typeof sel == 'string') {
		context = u(context || document)[0];
		this.push.apply(this, u.DOM.grab(sel, context)); }
	else
	if (sel.nodeType || sel == window)
		this.push(sel); };

u.methods = u.__init__.prototype = {
	__mandoo__: !0,

	/* Collection manager */
	length: 0,

	push: Array.prototype.push,

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

/* The Sizzle CSS Selector Engine - v1.0 (minified)
 * http://sizzlejs.com/ */
(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true;[0,0].sort(function(){baseHasDuplicate=false;return 0;});var Sizzle=function(selector,context,results,seed){results=results||[];var origContext=context=context||document;if(context.nodeType!==1&&context.nodeType!==9){return[];}
if(!selector||typeof selector!=="string"){return results;}
var parts=[],m,set,checkSet,check,mode,extra,prune=true,contextXML=isXML(context),soFar=selector;while((chunker.exec(""),m=chunker.exec(soFar))!==null){soFar=m[3];parts.push(m[1]);if(m[2]){extra=m[3];break;}}
if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context);}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);while(parts.length){selector=parts.shift();if(Expr.relative[selector])
selector+=parts.shift();set=posProcess(selector,set);}}}else{if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){var ret=Sizzle.find(parts.shift(),context,contextXML);context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0];}
if(context){var ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;if(parts.length>0){checkSet=makeArray(set);}else{prune=false;}
while(parts.length){var cur=parts.pop(),pop=cur;if(!Expr.relative[cur]){cur="";}else{pop=parts.pop();}
if(pop==null){pop=context;}
Expr.relative[cur](checkSet,pop,contextXML);}}else{checkSet=parts=[];}}
if(!checkSet){checkSet=set;}
if(!checkSet){throw"Syntax error, unrecognized expression: "+(cur||selector);}
if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet);}else if(context&&context.nodeType===1){for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&contains(context,checkSet[i]))){results.push(set[i]);}}}else{for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i]);}}}}else{makeArray(checkSet,results);}
if(extra){Sizzle(extra,origContext,results,seed);Sizzle.uniqueSort(results);}
return results;};Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;results.sort(sortOrder);if(hasDuplicate){for(var i=1;i<results.length;i++){if(results[i]===results[i-1]){results.splice(i--,1);}}}}
return results;};Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set);};Sizzle.find=function(expr,context,isXML){var set,match;if(!expr){return[];}
for(var i=0,l=Expr.order.length;i<l;i++){var type=Expr.order[i],match;if((match=Expr.leftMatch[type].exec(expr))){var left=match[1];match.splice(1,1);if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");set=Expr.find[type](match,context,isXML);if(set!=null){expr=expr.replace(Expr.match[type],"");break;}}}}
if(!set){set=context.getElementsByTagName("*");}
return{set:set,expr:expr};};Sizzle.filter=function(expr,set,inplace,not){var old=expr,result=[],curLoop=set,match,anyFound,isXMLFilter=set&&set[0]&&isXML(set[0]);while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.match[type].exec(expr))!=null){var filter=Expr.filter[type],found,item;anyFound=false;if(curLoop==result){result=[];}
if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);if(!match){anyFound=found=true;}else if(match===true){continue;}}
if(match){for(var i=0;(item=curLoop[i])!=null;i++){if(item){found=filter(item,match,i,curLoop);var pass=not^!!found;if(inplace&&found!=null){if(pass){anyFound=true;}else{curLoop[i]=false;}}else if(pass){result.push(item);anyFound=true;}}}}
if(found!==undefined){if(!inplace){curLoop=result;}
expr=expr.replace(Expr.match[type],"");if(!anyFound){return[];}
break;}}}
if(expr==old){if(anyFound==null){throw"Syntax error, unrecognized expression: "+expr;}else{break;}}
old=expr;}
return curLoop;};var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href");}},relative:{"+":function(checkSet,part,isXML){var isPartStr=typeof part==="string",isTag=isPartStr&&!/\W/.test(part),isPartStrNotTag=isPartStr&&!isTag;if(isTag&&!isXML){part=part.toUpperCase();}
for(var i=0,l=checkSet.length,elem;i<l;i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}
checkSet[i]=isPartStrNotTag||elem&&elem.nodeName===part?elem||false:elem===part;}}
if(isPartStrNotTag){Sizzle.filter(part,checkSet,true);}},">":function(checkSet,part,isXML){var isPartStr=typeof part==="string";if(isPartStr&&!/\W/.test(part)){part=isXML?part:part.toUpperCase();for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var parent=elem.parentNode;checkSet[i]=parent.nodeName===part?parent:false;}}}else{for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part;}}
if(isPartStr){Sizzle.filter(part,checkSet,true);}}},"":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if(!/\W/.test(part)){var nodeCheck=part=isXML?part:part.toUpperCase();checkFn=dirNodeCheck;}
checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML);},"~":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!/\W/.test(part)){var nodeCheck=part=isXML?part:part.toUpperCase();checkFn=dirNodeCheck;}
checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML);}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?[m]:[];}},NAME:function(match,context,isXML){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i]);}}
return ret.length===0?null:ret;}},TAG:function(match,context){return context.getElementsByTagName(match[1]);}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(/\\/g,"")+" ";if(isXML){return match;}
for(var i=0,elem;(elem=curLoop[i])!=null;i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").indexOf(match)>=0)){if(!inplace)
result.push(elem);}else if(inplace){curLoop[i]=false;}}}
return false;},ID:function(match){return match[1].replace(/\\/g,"");},TAG:function(match,curLoop){for(var i=0;curLoop[i]===false;i++){}
return curLoop[i]&&isXML(curLoop[i])?match[1]:match[1].toUpperCase();},CHILD:function(match){if(match[1]=="nth"){var test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2]=="even"&&"2n"||match[2]=="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);match[2]=(test[1]+(test[2]||1))-0;match[3]=test[3]-0;}
match[0]=done++;return match;},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1].replace(/\\/g,"");if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name];}
if(match[2]==="~="){match[4]=" "+match[4]+" ";}
return match;},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop);}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);if(!inplace){result.push.apply(result,ret);}
return false;}}else if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true;}
return match;},POS:function(match){match.unshift(true);return match;}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type!=="hidden";},disabled:function(elem){return elem.disabled===true;},checked:function(elem){return elem.checked===true;},selected:function(elem){elem.parentNode.selectedIndex;return elem.selected===true;},parent:function(elem){return!!elem.firstChild;},empty:function(elem){return!elem.firstChild;},has:function(elem,i,match){return!!Sizzle(match[3],elem).length;},header:function(elem){return/h\d/i.test(elem.nodeName);},text:function(elem){return"text"===elem.type;},radio:function(elem){return"radio"===elem.type;},checkbox:function(elem){return"checkbox"===elem.type;},file:function(elem){return"file"===elem.type;},password:function(elem){return"password"===elem.type;},submit:function(elem){return"submit"===elem.type;},image:function(elem){return"image"===elem.type;},reset:function(elem){return"reset"===elem.type;},button:function(elem){return"button"===elem.type||elem.nodeName.toUpperCase()==="BUTTON";},input:function(elem){return/input|select|textarea|button/i.test(elem.nodeName);}},setFilters:{first:function(elem,i){return i===0;},last:function(elem,i,match,array){return i===array.length-1;},even:function(elem,i){return i%2===0;},odd:function(elem,i){return i%2===1;},lt:function(elem,i,match){return i<match[3]-0;},gt:function(elem,i,match){return i>match[3]-0;},nth:function(elem,i,match){return match[3]-0==i;},eq:function(elem,i,match){return match[3]-0==i;}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];if(filter){return filter(elem,i,match,array);}else if(name==="contains"){return(elem.textContent||elem.innerText||"").indexOf(match[3])>=0;}else if(name==="not"){var not=match[3];for(var i=0,l=not.length;i<l;i++){if(not[i]===elem){return false;}}
return true;}},CHILD:function(elem,match){var type=match[1],node=elem;switch(type){case'only':case'first':while((node=node.previousSibling)){if(node.nodeType===1)return false;}
if(type=='first')return true;node=elem;case'last':while((node=node.nextSibling)){if(node.nodeType===1)return false;}
return true;case'nth':var first=match[2],last=match[3];if(first==1&&last==0){return true;}
var doneName=match[0],parent=elem.parentNode;if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count;}}
parent.sizcache=doneName;}
var diff=elem.nodeIndex-last;if(first==0){return diff==0;}else{return(diff%first==0&&diff/first>=0);}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match;},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||elem.nodeName===match;},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1;},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];return result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!=check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false;},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];if(filter){return filter(elem,i,match,array);}}}};var origPOS=Expr.match.POS;for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+/(?![^\[]*\])(?![^\(]*\))/.source);Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source);}
var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);if(results){results.push.apply(results,array);return results;}
return array;};try{Array.prototype.slice.call(document.documentElement.childNodes,0);}catch(e){makeArray=function(array,results){var ret=results||[];if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array);}else{if(typeof array.length==="number"){for(var i=0,l=array.length;i<l;i++){ret.push(array[i]);}}else{for(var i=0;array[i];i++){ret.push(array[i]);}}}
return ret;};}
var sortOrder;if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){if(!a.compareDocumentPosition||!b.compareDocumentPosition){if(a==b){hasDuplicate=true;}
return 0;}
var ret=a.compareDocumentPosition(b)&4?-1:a===b?0:1;if(ret===0){hasDuplicate=true;}
return ret;};}else if("sourceIndex"in document.documentElement){sortOrder=function(a,b){if(!a.sourceIndex||!b.sourceIndex){if(a==b){hasDuplicate=true;}
return 0;}
var ret=a.sourceIndex-b.sourceIndex;if(ret===0){hasDuplicate=true;}
return ret;};}else if(document.createRange){sortOrder=function(a,b){if(!a.ownerDocument||!b.ownerDocument){if(a==b){hasDuplicate=true;}
return 0;}
var aRange=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();aRange.setStart(a,0);aRange.setEnd(a,0);bRange.setStart(b,0);bRange.setEnd(b,0);var ret=aRange.compareBoundaryPoints(Range.START_TO_END,bRange);if(ret===0){hasDuplicate=true;}
return ret;};}
(function(){var form=document.createElement("div"),id="script"+(new Date).getTime();form.innerHTML="<a name='"+id+"'/>";var root=document.documentElement;root.insertBefore(form,root.firstChild);if(!!document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[];}};Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return elem.nodeType===1&&node&&node.nodeValue===match;};}
root.removeChild(form);root=form=null;})();(function(){var div=document.createElement("div");div.appendChild(document.createComment(""));if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);if(match[1]==="*"){var tmp=[];for(var i=0;results[i];i++){if(results[i].nodeType===1){tmp.push(results[i]);}}
results=tmp;}
return results;};}
div.innerHTML="<a href='#'></a>";if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2);};}
div=null;})();if(document.querySelectorAll)(function(){var oldSizzle=Sizzle,div=document.createElement("div");div.innerHTML="<p class='TEST'></p>";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return;}
Sizzle=function(query,context,extra,seed){context=context||document;if(!seed&&context.nodeType===9&&!isXML(context)){try{return makeArray(context.querySelectorAll(query),extra);}catch(e){}}
return oldSizzle(query,context,extra,seed);};for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop];}
div=null;})();if(document.getElementsByClassName&&document.documentElement.getElementsByClassName)(function(){var div=document.createElement("div");div.innerHTML="<div class='test e'></div><div class='test'></div>";if(div.getElementsByClassName("e").length===0)
return;div.lastChild.className="e";if(div.getElementsByClassName("e").length===1)
return;Expr.order.splice(1,0,"CLASS");Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1]);}};div=null;})();function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir=="previousSibling"&&!isXML;for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){if(sibDir&&elem.nodeType===1){elem.sizcache=doneName;elem.sizset=i;}
elem=elem[dir];var match=false;while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}
if(elem.nodeType===1&&!isXML){elem.sizcache=doneName;elem.sizset=i;}
if(elem.nodeName===cur){match=elem;break;}
elem=elem[dir];}
checkSet[i]=match;}}}
function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir=="previousSibling"&&!isXML;for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){if(sibDir&&elem.nodeType===1){elem.sizcache=doneName;elem.sizset=i;}
elem=elem[dir];var match=false;while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}
if(elem.nodeType===1){if(!isXML){elem.sizcache=doneName;elem.sizset=i;}
if(typeof cur!=="string"){if(elem===cur){match=true;break;}}else if(Sizzle.filter(cur,[elem]).length>0){match=elem;break;}}
elem=elem[dir];}
checkSet[i]=match;}}}
var contains=document.compareDocumentPosition?function(a,b){return a.compareDocumentPosition(b)&16;}:function(a,b){return a!==b&&(a.contains?a.contains(b):true);};var isXML=function(elem){return elem.nodeType===9&&elem.documentElement.nodeName!=="HTML"||!!elem.ownerDocument&&elem.ownerDocument.documentElement.nodeName!=="HTML";};var posProcess=function(selector,context){var tmpSet=[],later="",match,root=context.nodeType?[context]:context;while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];selector=selector.replace(Expr.match.PSEUDO,"");}
selector=Expr.relative[selector]?selector+"*":selector;for(var i=0,l=root.length;i<l;i++){Sizzle(selector,root[i],tmpSet);}
return Sizzle.filter(later,tmpSet);};u.__sizzle__=Sizzle;})();

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
		_obj[key] = deep && typeof obj[key] == 'object' ?
			u.__clone__(obj[key]) :
			obj[key];
	return _obj; };

function indexOf(col, item) {
	if (col.indexOf)
		return col.indexOf(item);
	for (var i = 0, l = col.length; i < l; i++)
		if (col[i] === item)
			return i;
	return -1; }

u.__clean__ = function (col) {
	for (var i = 0, l = col.length, array = col.__mandoo__ ? u() : []; i < l; i++)
	if (indexOf(array, col[i]) == -1)
		array.push(col[i]);
	return array; };

u.__error__ = function (msg) {
	throw "Mandoo: " + msg; };

/* Modularization system */
var coreEl = u.__sizzle__("script[src$=/mandoo/core.js]")[0];
if (coreEl) u.__path__ = coreEl.src.replace(/core\.js$/, '');
else u.__error__("bad script path; the mandoo core must be in '*/mandoo/core.js'");

function addCSS() {
	u("head").add("link", null, {
		rel: "stylesheet", type: "text/css", href: this.url }); };

u.__modules__ = {};

u.require = function () {
	for (var i = -1, js; arguments[++i];) {
		js = u.get(u.__path__ + 'plugins/' + arguments[i] + '/module.js', !1);
		js.failure ?
			u.__error__("module '" + arguments[i] + "' not found.") :
			u("body").append("script[type=text/javascript]", js.text).remove();
		if (u.__modules__[arguments[i]].info.hasCSS !== false)
			u.get(u.__path__ + 'plugins/' + arguments[i] + '/css/s.css').on('success', addCSS); }};

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
	var cls = data && typeof data.__init__ == 'function' ? data.__init__ : function () {};
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
		types = types.split(','); for (var t = -1, constr; types[++t];) {
			constr = this.nodeType ? u.__init__ : this.constructor;
			if (!this.events) this.events = {};
			if (!this.events[types[t]]) this.events[types[t]] = [];
			if (indexOf(this.events[types[t]], callback) == -1)
				this.events[types[t]].push(callback);
			if (constr.__events__ && constr.__events__[types[t]])
				constr.__events__[types[t]].call(this, types[t], callback); }}
		return this; },

	$REMOVE: function (types, callback) {
		if (this.__mandoo__) for (var i = -1; this[++i];)
			u.Event.REMOVE.call(this[i], types, callback);
		else {
		types = types.split(','); for (var t = -1, id; types[++t];)
			if (this.events && this.events[types[t]]) {
				id = indexOf(this.events[types[t]], callback);
				id != -1 && this.events[types[t]].splice(id, 1); }}
		return this; },

	$FIRE: function (e, eventObject) {
		if (this.__mandoo__) for (var i = -1; this[++i];)
			u.Event.FIRE.call(this[i], e, eventObject);
		else
		if (typeof e == 'string') {
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
		if (typeof data != 'string') {
			var params = [];
			for (var k in data) if (data.hasOwnProperty(k))
				params.push(k + '=' + encodeURIComponent(data[k]));
			data = params.join('&'); }
		this.data = options.data;
		this.url = url += options.method == 'GET' ? (url.indexOf('?') > 0 ? '&' : '?') + data : '';
		var xhr = this.XMLHttpRequest = u.Request.__create__();
		options.username ?
			xhr.open(options.method, url, options.async, options.username, options.password) :
			xhr.open(options.method, url, options.async);
		!options.cache &&
			this.header('If-Modified-Since', 'Wed, 01 Jan 1997 00:00:00 GMT');
		options.method == 'POST' &&
			this.header('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(options.method == 'POST' ? data : null);
		if (options.async) {
			var this_ = this;
			xhr.onreadystatechange = function () {
				this_.__handle__(); }; }
		else
			this.__handle__(); },

	$__common__: function (method, url, options, data) {
		var fn, req;
		if (typeof options == 'function') {
			fn = options;
			options = {}; }
		else
		if (typeof options == 'boolean') {
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
		if (!this.options.async || xhr.readyState == 4) {
			this.text = xhr.responseText;
			this.xml = xhr.responseXML;
			this.json = null;
			if (this.options.json)
				try {
					this.json = this.text ? eval('(' + this.text + ')') : []; }
				catch (e) {
					u.__error__("invalid JSON data"); }
			this.failure = !(xhr.status == 200 || xhr.status == 304);
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
				type == '#' ? 'ID' :
				type == '.' ? 'CLASS' :
				type == '[' ? 'ATTR' : 'TAG'
			].exec(sel);
			sel = sel.slice(step[0].length);
			type == 'TAG' ? el = u(document.createElement(step[1])) :
			type == 'ID' ? attrs.id = step[1] :
			type == 'CLASS' ? el.addClass(step[1]) :
			attrs[step[1]] = step[4]; }
		el.attr(attrs);
		txt != null && el.text(txt);
		return el; }
}}, {
	has: function (els) {
		els = u(els);
		for (var i = -1; els[++i];) if (indexOf(this, els[i]) < 0)
			return !1;
		return !0; },

	filter: function (sel) {
		return u(u.grab.filter(sel, this)); },

	exclude: function (sel) {
		return u(u.grab.filter(sel, this, !1, !0)); },

	is: function (sel) {
		return sel && u.grab.filter(sel, this).length == this.length; },

	isChildOf: function (el) {
		el = u(el)[0];
		main:
		for (var i = -1, is = 0, node; node = this[++i];) {
			while (node = node.parentNode) if (node == el) {
				is = 1;
				continue main; }
			else if (!node) {
				is = 0;
				break main; }
			is = 0; }
		return !!is; },

	children: function (sel) {
		for (var i = -1, els = u(); this[++i];)
			els.merge(u.grab.filter(sel || "*", this[i].childNodes));
		return els; },

	neighbors: function (sel) {
		var els = u.__clean__(this.up().children(sel));
		for (var i = -1; this[++i];)
			for (var j = -1; els[++j];) if (this[i] == els[j])
				els.splice(j, 1);
		return els; },

	all: function (sel) {
		for (var i = -1, els = u(); this[++i];)
			els.merge(u(sel || "*", this[i]));
		return u.__clean__(els); },

	nav: function (direction, crit) {
		crit = crit || 1;
		for (var i = -1, els = u(); this[++i];) {
			var el = this[i], walk = 0;
			if (typeof crit == 'string')
				crit = u.DOM.grab(crit);
			do (el =
				direction == 'prev' ? el.previousSibling :
				direction == 'next' ? el.nextSibling :
				direction == 'up' ? el.parentNode :
				direction == 'first' ? (!walk ? u.DOM.grab(':first', el)[0] : el.nextSibling) :
				direction == 'last' ? (!walk ? u.DOM.grab(':last', el)[0] : el.previousSibling) :
				null) && el.nodeType != 3 && walk++;
			while (el && (crit ?
				typeof crit == 'number' ? walk < crit :
				indexOf(crit, el) < 0 :
				el.nodeType == 1));
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
		u.__support__.ua.ie && this[i].nodeName == "SCRIPT" ?
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
			this[i].className = u.__clean__((' '+this[i].className+' ').replace(' '+cls[j]+' ', ' '));
		return this; },

	attr: function (name, value, style) {
		var attrs = name;
		if (typeof name == 'string') {
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
				this[i].style[name] = typeof attrs[name] == 'number' ? ~~attrs[name] + (name.indexOf('ndex') != -1 ? 0 : 'px') : attrs[name];
		else
		if ('disabledvalue'.indexOf(name) != -1)
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
				main = this[i].parentNode.nodeName == "BODY";
				refpos = main ? u(reference || "html").pos() :
					{ left: 0, right: this[0].parentNode.clientWidth,
					  top: 0, bottom: this[0].parentNode.clientHeight };
				refsize = u(main ? reference || "html" : this[i].parentNode).size(scrolls);
				size = u(this[i]).size();
				this[i].style.left =
					main * refpos.left + (typeof coords.left == 'number' ? coords.left :
					eval(coords.left
						.replace('left', 0)
						.replace('center', (refsize.width >> 1) - (size.width >> 1))
						.replace('right', refpos.right - refpos.left - size.width)
						.replace('width', size.width))) + 'px';
				this[i].style.top =
					main * refpos.top + (typeof coords.top == 'number' ? coords.top :
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
			u(this[i])[u(this[i]).css('display') == 'none' ? 'show' : 'hide']();
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
			if (u(el).up('html')[0] && e.target != el && !u(e.target).isChildOf(el))
				u(el).fire('clickout', e); }); });
	u.Event.register(u.__init__, 'mouseenter', function () {
		u(this).on('mouseover', function (e) {
			e.relatedTarget != this && !u(e.relatedTarget).isChildOf(this) &&
				u(this).fire('mouseenter', e); }); });
	u.Event.register(u.__init__, 'mouseleave', function () {
		u(this).on('mouseout', function (e) {
			e.relatedTarget != this && !u(e.relatedTarget).isChildOf(this) &&
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
			p_.isColor = p.indexOf('olor') != -1;
			p_.from = props[p].from == undefined ? (p_.isScroll ? el[p] : p_.isColor ? u(el).css(p) : parseFloat(u(el).css(p)) || ' width height '.indexOf(' ' + p + ' ') != -1 && el[('offset-' + p).replace(CAMELCASE.R, CAMELCASE.FN)] || 0) : props[p].from;
			p_.to = props[p].to == undefined ? props[p] : props[p].to;
			p_.easing = props[p].easing || this.options.easing || u.Anim.easings.SMOOTH;
			for (var k in this.options)
				p_[k] = props[p][k] != undefined ? props[p][k] : this.options[k];
			if (p_.isColor) {
				p_.from = u.Anim.colors.parse(p_.from);
				p_.to = u.Anim.colors.parse(p_.to); }
			if (p_.reverse) {
				var aux = p_.to;
				p_.to = p_.from; p_.from = aux; }
			if (!p_.isColor) {
				if (p_.relative) p_.to += p_.from;
				if (p_.proportional) p_.to *= p_.from / 100; }
			if (''+p_.from == ''+p_.to)
				delete p_;
			else {
				from += p_.isColor ? 0 : p_.from * (p == 'opacity' ? 100 : 1);
				to += p_.isColor ? 100 : p_.to * (p == 'opacity' ? 100 : 1);
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
				if (this_.frames == frame)
					this_.stop();
				else {
				for (var p in props_)
					props_[p].isScroll ?
						el[p] = props_[p].from + props_[p].values[frame] :
						u(el).css(p, (props_[p].isColor ? '' : props_[p].from) + props_[p].values[frame]);
				frame == 1 && u(el).show();
				u(el).fire('animation', this_);
				frame++; }
			}}, this.duration / this.frames); }},

	$SPEEDS: {
		slowest: 25, slower: 50, slow: 75,
		fast: 150, faster: 200, fastest: 300 },

	$BEZIER: function (points, t) {
		for (var i = 0, n = points.length - 1, value = 0; i < points.length; i++)
			value += (i && i != n ? n : 1) * Math.pow(1 - t, n - i) * Math.pow(t, i) * points[i];
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
				if (color.length == 3) color = color.replace(/(.)/g, '$1$1');
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
		if (typeof options == 'function')
			callback = options, options = {};
		for (var i = -1, anims = [], a; this[++i];) {
			anims.push(a = new u.Anim(this[i], props, options));
			callback && a.on('finish', callback); }
		return anims; },

	hover: function (props, options) {
		for (var k in props)
			u(this).backup(k, !0);
		return this.on('mouseenter,mouseleave', function (e) {
			if (e.type == 'mouseleave') {
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
			charCode: e.type == 'keypress' ? e.keyCode : 0,
			eventPhase: 2,
			isChar: e.keyCode > 0,
			pageX: e.clientX + document.body.scrollLeft,
			pageY: e.clientY + document.body.scrollTop,
			target: e.srcElement,
			relatedTarget: e.type == 'mouseover' ? e.fromElement : e.toElement,
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
		if (value == undefined)
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
		if (value == undefined)
			return parseInt(v.split(' ')[0]);
		else
			el.style.backgroundPosition = value + 'px ' + v.split(' ')[1]; },

	backgroundPositionY: function (el, value) {
		var v = u(el).css('backgroundPosition') || '0 0';
		if (value == undefined)
			return parseInt(v.split(' ')[1]);
		else
			el.style.backgroundPosition = v.split(' ')[0] + ' ' + value + 'px'; }
};

window.u = u;
})(Mandoo);
